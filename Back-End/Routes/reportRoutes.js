
import express from 'express';
import { submitReport , getMyReports , getAllReports , updateReportById} from '../Controllers/reportController.js';
import { protect , supplierOrAdmin , authMiddleware} from '../Middlewares/authMiddleware.js';

const router = express.Router();

// POST: Submit a report
router.post('/', protect, submitReport);

router.get('/', protect, supplierOrAdmin, getAllReports);

// GET: View own reports
router.get('/my', protect, getMyReports);

router.put('/reports/:id', authMiddleware, updateReportById);


export default router;