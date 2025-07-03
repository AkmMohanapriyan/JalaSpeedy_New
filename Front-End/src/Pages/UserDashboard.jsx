import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const UserDashboard = () => {

  const navigate = useNavigate();

  // Logout 
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [myRequests, setMyRequests] = useState([]);



// Fetch All their Request As User
useEffect(() => {
  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("auth_token"); 

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/requests/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error.response?.data || error.message);
    }
  };

  fetchMyRequests();
}, []);


  // Water Request
  const [purpose, setPurpose] = useState("Drinking");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");

  // View Requests
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // View Reports
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);


// Water Request Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    await axios.post("http://localhost:5000/api/requests", {
      purpose,
      amount,
      location,
      dateNeeded,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    alert("Request submitted!");
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("Submission failed: " + error?.response?.data?.message || "Unknown error");
  }
};


  // Repot Submiion
  const [report, setReport] = useState({
    type: '',
    location: '',
    dateOfIssue: '',
    description: '',
  });

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };


  // User Report Submit
const handleReportSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return alert("User not authenticated");

    const res = await axios.post("http://localhost:5000/api/reports", report, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    alert("Report submitted successfully!");
    setReport({ type: '', location: '', dateOfIssue: '', description: '' });
  } catch (error) {
    console.error("Report submission error:", error.response?.data || error.message);
    alert("Failed to submit report.");
  }
};


  // Fetch User Reports
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);


    const fetchReports = async () => {
    try {
      const token = localStorage.getItem("auth_token"); 
      if (!token) return alert("User not logged in");

      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/reports/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err.response?.data || err.message);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (activeTab === "myreports") {
    fetchReports();
  }
}, [activeTab]);



// Fetch User Info
useEffect(() => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsername(res.data.username || "User");
    })
    .catch(err => {
      console.error("Failed to fetch user info", err);
      setUsername("User");
    });
  }
}, []);

  return (
    <div className="d-flex min-vh-100 userDashboard">
      {/* Sidebar */}
      <div
        className={`sidebar bg-primary text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"
          }`}
        style={{ width: "250px" }}
      >
        <h4 className="mb-4 text-center">Jalaspeedy</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "dashboard"
                ? "btn-light text-primary"
                : "btn-outline-light"
                }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "request"
                ? "btn-light text-primary"
                : "btn-outline-light"
                }`}
              onClick={() => setActiveTab("request")}
            >
              Water Request
            </button>
          </li>

          <li className="nav-item mb-2">
            <button className={`btn w-100 text-start ${activeTab === "myWaterRequest" ? "btn-light text-primary" : "btn-outline-light"}`} onClick={() => setActiveTab("myWaterRequest")}>My Water Request</button>
          </li>

          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "report"
                ? "btn-light text-primary"
                : "btn-outline-light"
                }`}
              onClick={() => setActiveTab("report")}
            >
              Report
            </button>
          </li>
          <li className="nav-item mb-5">
            <button
              className={`btn w-100 text-start ${activeTab === "myreports"
                ? "btn-light text-primary"
                : "btn-outline-light"
                }`}
              onClick={() => setActiveTab("myreports")}
            >
              My Reports
            </button>
          </li>
        </ul>

        {/* Close Button (Mobile only) */}
        <div className="d-md-none mb-3">
          <button
            className="btn btn-outline-light w-100 close"
            onClick={() => setSidebarOpen(false)}
            style={{ marginTop: "400px" }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Logout Button (Fixed Bottom) */}
        <div className="mt-auto">
          <button className="btn btn-outline-light w-100 d-block logout" style={{ marginTop: "4px" }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f6f6f6" }}>
        {/* Top bar (Toggle & Username) */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-md-none">
            <button
              className="btn btn-outline-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="bi bi-arrow-right-square"></i>
            </button>
          </div>
          <div className="ms-auto p-3 bg-white p-3 rounded shadow-sm w-100"> <h5 className="fw-bold">Welcome, {username}! to JalaSpeedy User Dashboard</h5></div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="intro-text">
            <h3>Welcome to Jalaspeedy</h3>
            <p className="fw-bold">Pure Water Delivery Your Door Step</p>
            <p className="">
              Our water supply service ensures that you never run out of clean drinking water. Schedule a delivery today and experience hassle-free service.
              <br></br>
              This is your central dashboard to request water supply, report
              water issues, and view your past reports. Stay hydrated, stay
              safe!
            </p>

            <br></br>

            <hr />

            <br></br>

            <p className="">
              🚀 Whether you're requesting clean water for drinking, irrigation, or industrial use, Jalaspeedy is here to serve you quickly and efficiently.
            </p>

            <p>
              💧 Use the <strong>Water Request</strong> tab to place your request in just a few clicks. Provide your purpose, required amount, and location—our team will do the rest.
            </p>

            <p>
              🛠️ Noticed a leakage, contamination, or any other issue? Submit it through the <strong>Report</strong> tab and help us ensure water quality for everyone.
            </p>

            <p>
              📋 You can track all your past submissions in the <strong>My Reports</strong> tab. Stay informed, stay empowered!
            </p>

            <p className="fst-italic fw-bold">
              Thank you for helping us build a safer, cleaner water future.
            </p>
          </div>
        )}


        {/* Water Request */}
        {activeTab === "request" && (
          <div>
            <h3>Water Request Form</h3>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Purpose</label>
                <select className="form-select" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  <option value="Drinking">Drinking</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (Liters)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date Needed</label>
                <input type="date" className="form-control" value={dateNeeded} onChange={(e) => setDateNeeded(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        )}


        {/* My Water Request */}
        {activeTab === "myWaterRequest" && (
          <div>
            <h3>My Water Request Summary</h3>
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Purpose</th>
                    <th>Amount (L)</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(myRequests) && myRequests.map((req, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{req.purpose}</td>
                      <td>{req.amount}</td>
                      <td>{req.dateNeeded}</td>
                      <td>{req.status || "Pending"}</td>
                      <td>
                        <button className="btn btn-sm btn-info" onClick={() => { setSelectedRequest(req); setShowModal(true); }}>
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            {/* View Popup Model */}

            {showModal && selectedRequest && (
              <div
                className="modal show fade d-block"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content shadow-lg rounded-3">
                    <div className="modal-header">
                      <h5 className="modal-title">Water Request Details</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
                      <p><strong>Amount:</strong> {selectedRequest.amount} Liters</p>
                      <p><strong>Date Needed:</strong> {selectedRequest.dateNeeded}</p>
                      <p><strong>Status:</strong> {selectedRequest.status || 'Pending'}</p>
                      <p><strong>Location:</strong> {selectedRequest.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        )}


        {/* Report */}
        {activeTab === "report" && (
          <div>
            <h3>Report Water Issue</h3>
            <form className="mt-4" onSubmit={handleReportSubmit}>
              <div className="mb-3">
                <label className="form-label">Report Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Leakage, Contamination"
                  name="type"
                  value={report.type}
                  onChange={handleReportChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter location"
                  onChange={handleReportChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Issue</label>
                <input type="date" className="form-control" name="dateOfIssue" value={report.dateOfIssue} onChange={handleReportChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Describe the issue..."
                  name="description"
                  value={report.description}
                  onChange={handleReportChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-danger">
                Submit Report
              </button>
            </form>
          </div>
        )}

        {/* My Reports */}
        {activeTab === "myreports" && (
          <div>
            <h3>My Reports</h3>
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Issue Type</th>
                    <th>Description</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((rep, i) => (
                    <tr key={i}>
                      <td>{new Date(rep.dateOfIssue).toLocaleDateString()}</td>
                      <td>{rep.type}</td>
                      <td>{rep.description}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-info me-2" onClick={() => { setSelectedReport(rep); setShowReportModal(true); }}>
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reports.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No reports submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* View Reports Popup */}
            {showReportModal && selectedReport && (
              <div
                className="modal show fade d-block"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content shadow-lg rounded-3">
                    <div className="modal-header">
                      <h5 className="modal-title">Report Details</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowReportModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p><strong>Report Type:</strong> {selectedReport.type}</p>
                      <p><strong>Location:</strong> {selectedReport.location || 'N/A'}</p>
                      <p><strong>Date of Issue:</strong> {new Date(selectedReport.dateOfIssue).toLocaleDateString()}</p>
                      <p><strong>Description:</strong> {selectedReport.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        )}
      </div>

      {/* Internal CSS */}
      <style>{`
        .sidebar {
          min-height: 100vh;
        }

        .intro-text {
          background-color : #ffffff;
          color : black;
          border-radius : 10px;
          padding : 50px;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            height: 100%;
            width: 250px;
            transition: all 0.3s ease-in-out;
            text-align : justify;
          }

        }
        
      `}</style>
    </div>
  );
};

export default UserDashboard;