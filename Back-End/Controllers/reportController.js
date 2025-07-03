import asyncHandler from 'express-async-handler';
import Report from '../Models/reportModel.js';

export const submitReport = asyncHandler(async (req, res) => {
  const { type, location, dateOfIssue, description } = req.body;

  if (!type || !location || !dateOfIssue || !description) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const report = await Report.create({
    user: req.user._id,
    type,
    location,
    dateOfIssue,
    description,
  });

  res.status(201).json({ message: 'Report submitted successfully', report });
});

export const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(reports);
});

export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().populate('user', 'name email');
  res.json(reports);
});

export const updateReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, {
      new: true,
    });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report updated successfully', report: updatedReport });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};