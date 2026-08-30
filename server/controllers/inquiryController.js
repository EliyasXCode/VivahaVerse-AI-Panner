const Inquiry = require('../models/Inquiry');

// POST /api/inquiries
exports.createInquiry = async (req, res) => {
  try {
    const inquiryData = req.body;
    if (!inquiryData.partner1Name || !inquiryData.phone || !inquiryData.email || !inquiryData.preferredDestination) {
      return res.status(400).json({ success: false, message: 'Please complete all required contact and destination fields.' });
    }

    const inquiry = await Inquiry.create(inquiryData);
    res.status(201).json({
      success: true,
      message: 'Your wedding inquiry has been successfully submitted! A VivahaVerse senior planner will connect with you within 24 hours.',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/inquiries (Admin)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/inquiries/:id (Admin)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
