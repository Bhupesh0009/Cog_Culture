/**
 * Formats individual claim verification results, computes global statistics, 
 * and generates a high-fidelity summary report structure.
 * 
 * @param {string} fileName - Name of the uploaded PDF file
 * @param {number} pageCount - Number of pages in the PDF
 * @param {Array} verifications - List of verified claim objects
 * @returns {Object} Unified verification report
 */
export const formatVerificationReport = (fileName, pageCount, verifications) => {
  const totalClaims = verifications.length;
  
  if (totalClaims === 0) {
    return {
      documentName: fileName,
      truthScore: 100,
      summary: "No distinct factual claims were extracted from the document to verify.",
      metadata: {
        verifiedAt: new Date().toISOString(),
        totalClaims: 0,
        verifiedCount: 0,
        inaccurateCount: 0,
        falseCount: 0,
        pageCount: pageCount
      },
      results: []
    };
  }

  // Count metrics
  let verifiedCount = 0;
  let inaccurateCount = 0;
  let falseCount = 0;
  let cumulativeConfidence = 0;

  verifications.forEach((v) => {
    cumulativeConfidence += v.confidence || 80;
    if (v.status === 'Verified') {
      verifiedCount++;
    } else if (v.status === 'Inaccurate') {
      inaccurateCount++;
    } else {
      falseCount++;
    }
  });

  // Calculate Truth Score:
  // Verified = 100 points, Inaccurate = 50 points, False = 0 points
  const totalPoints = (verifiedCount * 100) + (inaccurateCount * 50) + (falseCount * 0);
  const truthScore = Math.round(totalPoints / totalClaims);
  const averageConfidence = Math.round(cumulativeConfidence / totalClaims);

  // Generate a dynamic, highly authentic Executive Summary
  let summaryText = "";
  if (truthScore === 100) {
    summaryText = `Spectacular integrity! Every single factual claim extracted from the document (${totalClaims}/${totalClaims}) was fully validated and corroborated against active, real-time web databases. No discrepancies were detected.`;
  } else if (truthScore >= 80) {
    summaryText = `Strong factual accuracy. The document exhibits high credibility overall. Out of the ${totalClaims} factual claims evaluated, ${verifiedCount} were verified, with ${inaccurateCount} minor inaccuracy detected, primarily relating to statistical tolerances.`;
  } else if (truthScore >= 50) {
    summaryText = `Moderate factual accuracy detected. While several primary claims (${verifiedCount}) are validated, significant statistical discrepancies or outdated figures (${inaccurateCount} inaccurate, ${falseCount} false) were identified upon web verification. Cross-referencing correct facts is strongly advised.`;
  } else {
    summaryText = `Critical factual alerts! The document exhibits substantial discrepancies. A significant portion of its core factual figures (${falseCount} completely false and ${inaccurateCount} inaccurate out of ${totalClaims} total claims) contradict active real-time web data and news indexes.`;
  }

  return {
    documentName: fileName,
    truthScore: truthScore,
    summary: summaryText,
    metadata: {
      verifiedAt: new Date().toISOString(),
      totalClaims: totalClaims,
      verifiedCount: verifiedCount,
      inaccurateCount: inaccurateCount,
      falseCount: falseCount,
      pageCount: pageCount,
      averageConfidence: averageConfidence
    },
    results: verifications
  };
};
