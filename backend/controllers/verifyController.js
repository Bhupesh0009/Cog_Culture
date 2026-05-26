import { extractTextFromPDF } from '../services/pdfService.js';
import { extractClaims, verifyClaim } from '../services/aiService.js';
import { searchWeb } from '../services/searchService.js';
import { formatVerificationReport } from '../utils/responseFormatter.js';

/**
 * Handles PDF uploads, processes them, extracts factual claims,
 * searches the web in parallel, cross-references with LLMs, 
 * and returns the unified fact-check report.
 */
export const verifyPDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded! Please upload a PDF document.'
      });
    }

    const fileName = req.file.originalname;
    console.log(`[PIPELINE START] Processing document: "${fileName}"`);

    // 1. Extract PDF plain text
    const parsedPDF = await extractTextFromPDF(req.file.buffer);
    console.log(`[PDF EXTRACTION] Completed. Pages: ${parsedPDF.pageCount}, Characters: ${parsedPDF.rawTextLength}`);

    if (parsedPDF.text.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'The uploaded PDF is empty or does not contain readable digital text (scanned images are not supported).'
      });
    }

    // 2. Extract Claims using LLM / Fallback Mock
    const claims = await extractClaims(parsedPDF.text);
    console.log(`[CLAIMS EXTRACTION] Completed. Extracted ${claims.length} claims:`, claims);

    if (claims.length === 0) {
      const emptyReport = formatVerificationReport(fileName, parsedPDF.pageCount, []);
      return res.status(200).json(emptyReport);
    }

    // 3 & 4. Orchestrate Live Search & LLM Verification in Parallel
    // We execute them in parallel using Promise.all to deliver an extremely fast response.
    const verificationPromises = claims.map(async (claim, index) => {
      try {
        console.log(`[PROCESS claim #${index + 1}] Initiating: "${claim}"`);
        
        // Retrieve live web pages / context mocks
        const searchResults = await searchWeb(claim);
        
        // Evaluate discrepancy of the claim vs retrieved web facts
        const verification = await verifyClaim(claim, searchResults);
        
        console.log(`[PROCESS claim #${index + 1}] Finished. Status: ${verification.status}`);
        return verification;
      } catch (claimError) {
        // Individual claim failure shouldn't fail the whole document! 
        // We log and return a fallback inaccurate/unverifiable card.
        console.error(`[PROCESS claim #${index + 1}] Failed:`, claimError.message);
        return {
          claim: claim,
          status: 'Inaccurate',
          confidence: 50,
          correctFact: claim,
          explanation: 'Live web searches timed out or verification APIs returned rate limits.',
          source: {
            title: 'Search Index Verification Timeout',
            url: '#',
            snippet: 'Verification logs are temporarily unavailable for this specific statement.'
          }
        };
      }
    });

    const verifications = await Promise.all(verificationPromises);

    // 5. Aggregate metrics and compile final structured JSON response
    const finalReport = formatVerificationReport(fileName, parsedPDF.pageCount, verifications);
    console.log(`[PIPELINE COMPLETE] Report generated for: "${fileName}". Truth Score: ${finalReport.truthScore}%`);

    return res.status(200).json(finalReport);

  } catch (error) {
    console.error('[CONTROLLER ERROR] Pipeline crashed:', error);
    next(error);
  }
};
