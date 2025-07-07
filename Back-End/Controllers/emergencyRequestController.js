import EmergencyRequest from "../Models/EmergencyRequest.js";

// Create request
export const createRequest = async (req, res) => {
  try {
    const { purpose, amount, date, location } = req.body;

    const newRequest = await EmergencyRequest.create({
      user: req.user._id,
      purpose,
      amount,
      date,
      location,
    });

    res.status(201).json({ message: "Request created", data: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Error creating request", error: err.message });
  }
};

// Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().populate("user", "name email role");
    res.status(200).json({ data: requests });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};

// Update request
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { purpose, amount, date, location, status } = req.body;

    const request = await EmergencyRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.purpose = purpose || request.purpose;
    request.amount = amount || request.amount;
    request.date = date || request.date;
    request.location = location || request.location;
    request.status = status || request.status;

    const updated = await request.save();
    res.status(200).json({ message: "Request updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating request", error: err.message });
  }
};

// Delete request (admin only)
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await EmergencyRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.remove();
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err.message });
  }
};
