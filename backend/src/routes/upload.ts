import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { verifyToken } from '../middleware/auth';

const router = Router();

// POST /api/upload/images
router.post('/images', verifyToken, upload.array('images', 10), (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) || [];
  const urls = files.map((file) => `/uploads/${file.filename}`);
  res.json({ success: true, count: urls.length, urls });
});

// POST /api/upload/documents
router.post('/documents', verifyToken, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, url, fileName: req.file.originalname });
});

export default router;
