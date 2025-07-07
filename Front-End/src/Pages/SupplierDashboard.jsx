import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);

    const [supplierInfo, setSupplierInfo] = useState(null);

    useEffect(() => {
        const fetchSupplierInfo = async () => {
            try {
                const token = localStorage.getItem("auth_token");

                const res = await axios.get("http://localhost:5000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSupplierInfo(res.data);
            } catch (err) {
                console.error("Failed to fetch supplier info", err);
            }
        };

        fetchSupplierInfo();
    }, []);


    // Logout
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate("/");
    };

    // View / Edit Reports
    const [viewRequest, setViewRequest] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Fetch Data
    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (activeTab === "requests") {
            axios.get("http://localhost:5000/api/requests", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setRequests(res.data))
                .catch((err) => console.error("Failed to fetch requests", err));
        }

        if (activeTab === "users") {
            axios.get("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setUsers(res.data))
                .catch((err) => console.error("Failed to fetch users", err));
        }

        if (activeTab === "reports") {
            axios.get("http://localhost:5000/api/reports", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setReports(res.data))
                .catch((err) => console.error("Failed to fetch reports", err));
        }
    }, [activeTab]);


    // Delete Request
    const handleDeleteRequest = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("auth_token");

            await axios.delete(`http://localhost:5000/api/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh request list
            setRequests((prev) => prev.filter((r) => r._id !== id));
            alert("Request deleted successfully!");
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
            alert("Failed to delete request.");
        }
    };

    // update Requests
    const handleUpdateRequest = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("auth_token");

            const res = await axios.put(
                `http://localhost:5000/api/requests/${viewRequest._id}`,
                viewRequest,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Request updated successfully!");
            setShowViewModal(false);

            // Refresh requests table
            setRequests((prev) =>
                prev.map((r) => (r._id === viewRequest._id ? res.data.request : r))
            );
        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            alert("Failed to update request.");
        }
    };

    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <div className={`sidebar text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`} style={{ width: "250px" }}>
                <h4 className="mb-4 text-center  fw-bold mt-3 mb-5"><span>Jala</span><span>Speedy</span></h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-start ${activeTab === "dashboard" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
                    </li>
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-start ${activeTab === "requests" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("requests")}>Requests</button>
                    </li>
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-start ${activeTab === "users" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("users")}>Users</button>
                    </li>
                    <li className="nav-item mb-5">
                        <button className={`btn w-100 text-start ${activeTab === "reports" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("reports")}>Reports</button>
                    </li>
                </ul>

                {/* Logout at Bottom */}
                <div className="mt-auto">
                    <button className="btn btn-outline-light w-100 d-block" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                </div>

                {/* Close Button for Mobile */}
                <div className="d-md-none mt-3">
                    <button className="btn btn-outline-light w-100" onClick={() => setSidebarOpen(false)}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f6f6f6" }}>
                {/* Mobile Menu Toggle */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-md-none">
                        <button className="btn btn-outline-primary" onClick={() => setSidebarOpen(true)}>
                            <i className="bi bi-arrow-right-square"></i>
                        </button>
                    </div>
                    <div className="d-flex align-items-center bg-white p-3 rounded shadow-sm w-100">
                        <h5 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#000" }}>
                            {supplierInfo ? `Welcome ${supplierInfo.username}! to JalaSpeedy Supplier Dashboard` : "Welcome to JalaSpeedy Supplier Dashboard"}
                        </h5>
                    </div>
                </div>

                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                    <div className="intro-text">
                        <h2>Welcome to JalaSpeedy Supplier Dashboard</h2>

                        <p className="fw-bold">Your central hub for managing water requests, user data, and monitoring submitted reports.</p>
                        <p className="">
                            Manage incoming water requests, monitor user activity, and review submitted reports. Keep the water flowing!
                        </p>

                        <br />

                        <hr />

                        <br />

                        <p className="">
                            🚚 As a supplier, you play a crucial role in ensuring water delivery is fast, efficient, and accurate. Welcome to your Supplier Dashboard, where you can manage requests, review user data, and handle submitted reports with ease.
                        </p>

                        <p>
                            📊 The <strong>Requests</strong> tab allows you to track all active water requests that need your attention. Easily see the purpose, amount, and location of each request.
                        </p>

                        <p>
                            👥 In the <strong>Users</strong> section, you can review all registered users, keeping track of their details and ensuring smooth interactions with your service.
                        </p>

                        <p>
                            🛠️ The <strong>Reports</strong> tab lets you view all the reports users have submitted regarding any water-related issues. These reports help us maintain high standards for water safety and delivery.
                        </p>

                        <p className="fst-italic fw-bold">
                            Every drop counts, and with your active participation, we can make sure that no one is left without clean and safe water!
                        </p>

                    </div>
                )}

                {/* Requests Tab */}
                {activeTab === "requests" && (
                    <div>
                        <h3>Water Requests</h3>
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped align-middle">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>No</th>
                                        <th>User ID</th>
                                        <th>Purpose</th>
                                        <th>Amount (L)</th>
                                        <th>Location</th>
                                        <th>Date Needed</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(requests) && requests.map((req, i) => (
                                        <tr key={req._id || i} className="text-center">
                                            <td>{i + 1}</td>
                                            <td>{req._id}</td>
                                            <td>{req.purpose}</td>
                                            <td>{req.amount}</td>
                                            <td>{req.location}</td>
                                            <td>{req.dateNeeded}</td>
                                            <td>
                                                <span className={`badge bg-${req.status === "Completed" ? "success" : req.status === "Cancelled" ? "danger" : "warning"} text-dark`}>
                                                    {req.status || "Pending"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn-sm btn-info me-2" title="View" onClick={() => { setViewRequest(req); setShowViewModal(true); }}>
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="btn-sm btn-warning" title="Edit" onClick={() => { setViewRequest(req); setShowViewModal(true); }}>
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!Array.isArray(requests) && (
                                        <tr>
                                            <td colSpan="8" className="text-center text-danger">Error loading requests data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* View Modal */}

                        {showViewModal && viewRequest && (
                            <div
                                className="modal show fade d-block"
                                tabIndex="-1"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content shadow-lg rounded-3">
                                        <div className="modal-header">
                                            <h5 className="modal-title">View & Edit Water Request</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowViewModal(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleUpdateRequest}>
                                                <div className="mb-3">
                                                    <label className="form-label">Purpose</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={viewRequest.purpose}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, purpose: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Amount (Liters)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={viewRequest.amount}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, amount: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Location</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={viewRequest.location}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, location: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Date Needed</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={viewRequest.dateNeeded?.split("T")[0] || ""}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, dateNeeded: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={viewRequest.status || "Pending"}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, status: e.target.value })
                                                        }
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>

                                                <button type="submit" className="btn w-100" style={{ backgroundColor: "#000", color: "#fff", "button:hover": { backgroundColor: "#fff" } }}>
                                                    Save Changes
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div>
                        <h3>All Registered Users</h3>
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(users) && users.map((user) => (
                                        <tr key={user._id} className="text-center">
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role || "N/A"}</td>
                                        </tr>
                                    ))}
                                    {!Array.isArray(users) && (
                                        <tr>
                                            <td colSpan="4" className="text-center text-danger">Failed to load user data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === "reports" && (
                    <div>
                        <h3>Users Reports</h3>
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>No</th>
                                        <th>User ID</th>
                                        <th>Report Type</th>
                                        <th>Location</th>
                                        <th>Date of Issue</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(reports) && reports.map((rep, i) => (
                                        <tr key={rep._id || i} className="text-center">
                                            <td>{i + 1}</td>
                                            <td>{rep._id}</td>
                                            <td>{rep.type}</td>
                                            <td>{rep.location}</td>
                                            <td>{rep.dateOfIssue}</td>
                                            <td>{rep.description}</td>
                                        </tr>
                                    ))}
                                    {!Array.isArray(reports) && (
                                        <tr>
                                            <td colSpan="6" className="text-center text-danger">Unable to load reports.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Internal CSS */}
            <style>{`

        .intro-text {
            background-color : #ffffff;
            color : black;
            border-radius : 10px;
            padding : 50px;
        }

        .sidebar {
            background: linear-gradient(to bottom,rgb(96, 112, 131),rgb(0, 0, 0));
            min-height: 100vh;
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
            }

            .intro-text {
                text-align : center;
            }

            .intro-text p{
                text-align : justify;
            }
        }

        @media (max-width: 576px) {
            
            .intro-text {
                text-align : center;
            }

            .intro-text p{
                text-align : justify;
            }
        
        }

      `}</style>

        </div>


    );
};

export default SupplierDashboard;