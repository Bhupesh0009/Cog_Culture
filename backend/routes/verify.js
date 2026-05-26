import express from 'express';
import upload from '../middleware/upload.js';
import { verifyPDF } from '../controllers/verifyController.js';

const router = express.Router();

// PDF Claim Extraction & Verification Endpoint
// Field name: "pdf"
router.post('/upload', upload.single('pdf'), verifyPDF);

export default router;
