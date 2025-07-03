import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterModal from "./Register";

// 
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("userManagement");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);

  const [searchUser, setSearchUser] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchPayment, setSearchPayment] = useState("");
  const [searchWaterRequest, setSearchWaterRequest] = useState("");
  const [searchReport, setSearchReport] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);

  // User Management
  const [selectedUser, setSelectedUser] = useState(null);

  // Supplier Management
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSupplierViewModal, setShowSupplierViewModal] = useState(false);
  const [showSupplierEditModal, setShowSupplierEditModal] = useState(false);

  // Request Management
  const [showRequestEdit, setShowRequestEdit] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewRequestModal, setShowViewRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);

  // Report Management
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportView, setShowReportView] = useState(false);
  const [viewReport, setViewReport] = useState(null);
  const [editReport, setEditReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  // Authentication
  const token = localStorage.getItem("auth_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  // Slidebar Toggle
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (activeTab === "userManagement") {
      axios.get("/api/users", config).then((res) => setUsers(res.data)).catch(console.error);
    }

    if (activeTab === "supplierManagement") {
      axios.get("/api/suppliers", config).then((res) => setSuppliers(res.data)).catch(console.error);
    }

    if (activeTab === "paymentManagement") {
      axios.get("/api/payments", config).then((res) => setPayments(res.data)).catch(console.error);
    }

    if (activeTab === "waterRequest") {
      axios.get("/api/requests", config).then((res) => setRequests(res.data)).catch(console.error);
    }

    if (activeTab === "reportManagement") {
      axios.get("/api/reports", config).then((res) => setReports(res.data)).catch(console.error);
    }
  }, [activeTab]);


  // User Management

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/users/${userId}`, config);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user");
    }
  };

  // Edit User
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(`/api/users/${selectedUser._id}`, selectedUser, config);
      alert("User updated successfully");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user");
    }
  };

  // Supplier Management

  // Fetch Suppliers
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (activeTab === "supplierManagement") {
      axios.get("/api/users", config)
        .then((res) => {
          const supplierUsers = res.data.filter(user => user.role === "supplier");
          setSuppliers(supplierUsers);
        })
        .catch((err) => console.error("Failed to fetch suppliers", err));
    }
  }, [activeTab]);


  // Delete Supplier
  const deleteSupplier = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Supplier deleted successfully");
      setSuppliers(suppliers.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete supplier");
    }
  };

  // Edit Supplier
  const handleSupplierEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(`/api/users/${selectedSupplier._id}`, selectedSupplier, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Supplier updated successfully");
      setShowSupplierEditModal(false);

      // Refresh supplier list
      const res = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const supplierUsers = res.data.filter(user => user.role === "supplier");
      setSuppliers(supplierUsers);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update supplier");
    }
  };

  // Water Request Management

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/requests", config);
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await axios.delete(`/api/requests/${id}`, config);
      alert("Request deleted successfully");
      fetchRequests();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete request");
    }
  };

  // Update Request
  const handleRequestUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/requests/${selectedRequest._id}`, selectedRequest, config);
      alert("Request updated successfully");
      setShowRequestEdit(false);
      fetchRequests();
    } catch (err) {
      console.error("Failed to update request:", err);
      alert("Failed to update request");
    }
  };

  useEffect(() => {
    if (activeTab === "waterRequest") {
      fetchRequests();
    }
  }, [activeTab]);

  // Report Management

  // Fetch Reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await axios.get("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };

    if (activeTab === "reportManagement") {
      fetchReports();
    }
  }, [activeTab]);

  // Report Delete
  const handleDeleteReport = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("auth_token");

    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReports((prev) => prev.filter((r) => r._id !== id));
      alert("Report deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete report.");
    }
  };

  // Update Report
  const handleUpdateReport = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    try {
      const res = await axios.put(`http://localhost:5000/api/reports/${editReport._id}`, editReport, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setReports((prev) =>
        prev.map((r) => (r._id === editReport._id ? res.data.report : r))
      );
      setShowEditModal(false);
      alert("Report updated successfully.");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update report.");
    }
  };

// Fetch Admin Info

  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setAdminName(res.data.username || "Admin");
      })
      .catch(err => {
        console.error("Failed to fetch admin info", err);
        setAdminName("Admin");
      });
    }
  }, []);


  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div
        className={`sidebar bg-primary text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}
        style={{ width: "250px" }}
      >
        <h4 className="mb-5 text-center mt-3">JalaSpeedy</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "userManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("userManagement")}
            >
              Users
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "supplierManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("supplierManagement")}
            >
              Suppliers
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "paymentManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("paymentManagement")}
            >
              Payments
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className={`btn w-100 text-start ${activeTab === "waterRequest" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("waterRequest")}>Water Request</button>
          </li>
          <li className="nav-item mb-5">
            <button
              className={`btn w-100 text-start ${activeTab === "reportManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("reportManagement")}
            >
              User Reports
            </button>
          </li>
        </ul>

        {/* Logout at Bottom */}
        <div className="mt-auto">
          <button className="btn btn-outline-light w-100" onClick={handleLogout}>
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
              ☰
            </button>
          </div>
          <div className="ms-auto p-3 bg-white p-3 rounded shadow-sm w-100">
          <h5 className="fw-bold">
            {adminName ? `Welcome, Admin ${adminName}!` : "Admin Dashboard"}
          </h5>
        </div>
        </div>

        {/* User Management Tab */}
        {activeTab === "userManagement" && (
          <div>
            <h3>User Management (Users Only)</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search User by name or email"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) && users
                    .filter(user =>
                      user.role === "user" &&
                      (user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchUser.toLowerCase()))
                    )
                    .map((user, i) => (
                      <tr key={user._id}>
                        <td>{i + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><span className="badge bg-secondary">{user.role}</span></td>
                        <td>
                          <button className="btn btn-sm btn-info me-2" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                            <i className="bi bi-eye"></i> View
                          </button>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                            <i className="bi bi-pencil"></i> Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user._id)}>
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>



        )}


        {/* View user Modal */}
        {showViewModal && selectedUser && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>ID:</strong> {selectedUser._id}</p>
                  <p><strong>Name:</strong> {selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)} type="button"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Supplier Management Tab */}
        {activeTab === "supplierManagement" && (
          <div>
            <h3>Supplier Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Supplier"
              value={searchSupplier}
              onChange={(e) => setSearchSupplier(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Supplier ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers
                    .filter(s =>
                      s.username?.toLowerCase().includes(searchSupplier.toLowerCase()) ||
                      s.email?.toLowerCase().includes(searchSupplier.toLowerCase())
                    )
                    .map((supplier, i) => (
                      <tr key={supplier._id}>
                        <td>{i + 1}</td>
                        <td>{supplier._id}</td>
                        <td>{supplier.username}</td>
                        <td>{supplier.email}</td>
                        <td><span className="badge bg-success">{supplier.role}</span></td>
                        <td>
                          <button className="btn btn-sm btn-info me-2" onClick={() => { setSelectedSupplier(supplier); setShowSupplierViewModal(true); }}>
                            <i className="bi bi-eye"></i> View
                          </button>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => { setSelectedSupplier(supplier); setShowSupplierEditModal(true); }}>
                            <i className="bi bi-pencil"></i> Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteSupplier(supplier._id)}>
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* View Supplier Model */}
        {showSupplierViewModal && selectedSupplier && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Supplier Details</h5>
                  <button className="btn-close" onClick={() => setShowSupplierViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>ID:</strong> {selectedSupplier._id}</p>
                  <p><strong>Name:</strong> {selectedSupplier.username}</p>
                  <p><strong>Email:</strong> {selectedSupplier.email}</p>
                  <p><strong>Role:</strong> {selectedSupplier.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Supplier Model */}

        {showSupplierEditModal && selectedSupplier && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleSupplierEditSubmit}>
                <div className="modal-header">
                  <h5>Edit Supplier</h5>
                  <button className="btn-close" onClick={() => setShowSupplierEditModal(false)} type="button"></button>
                </div>
                <div className="modal-body">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={selectedSupplier.username}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, username: e.target.value })}
                    required
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    value={selectedSupplier.email}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, email: e.target.value })}
                    required
                  />
                  <label>Role</label>
                  <select
                    className="form-select"
                    value={selectedSupplier.role}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="supplier">Supplier</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowSupplierEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Payment Management Tab */}
        {activeTab === "paymentManagement" && (
          <div>
            <h3>Payment Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Payment"
              value={searchPayment}
              onChange={(e) => setSearchPayment(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Payment ID</th>
                    <th>Amount</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(payments) && payments
                    .filter(payment =>
                      payment.userName.toLowerCase().includes(searchPayment.toLowerCase()) ||
                      payment.paymentId.toLowerCase().includes(searchPayment.toLowerCase())
                    )
                    .map(payment => (
                      <tr key={payment._id}>
                        <td>{payment.userId}</td>
                        <td>{payment.userName}</td>
                        <td>{payment.paymentId}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.role}</td>
                        <td>{payment.date}</td>
                        <td>
                          <button className="btn btn-sm btn-info me-2"><i className="bi bi-eye"></i></button>
                          <button className="btn btn-sm btn-warning me-2"><i className="bi bi-pencil"></i></button>
                          <button className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Water Request Management */}
        {activeTab === "waterRequest" && (
          <div>
            <h3>Water Request Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Water Request..."
              value={searchWaterRequest}
              onChange={(e) => setSearchWaterRequest(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Purpose</th>
                    <th>Amount (L)</th>
                    <th>Location</th>
                    <th>Date Needed</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(requests) &&
                    requests
                      .filter(req =>
                        req.purpose?.toLowerCase().includes(searchWaterRequest.toLowerCase()) ||
                        req.location?.toLowerCase().includes(searchWaterRequest.toLowerCase()) ||
                        req.user?.email?.toLowerCase().includes(searchWaterRequest.toLowerCase())
                      )
                      .map((req, i) => (
                        <tr key={req._id}>
                          <td>{i + 1}</td>
                          <td>{req.user?._id || "N/A"}</td>
                          <td>{req.user?.email || "N/A"}</td>
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
                            <button className="btn btn-sm btn-info me-2" onClick={() => { setSelectedRequest(req); setShowRequestEdit(true); }}>
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => { setSelectedRequest(req); setShowRequestEdit(true); }}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteRequest(req._id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center text-muted">No water requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* View Modal */}
            {showRequestEdit && selectedRequest && (
              <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleRequestUpdate}>
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Water Request</h5>
                      <button type="button" className="btn-close" onClick={() => setShowRequestEdit(false)}></button>
                    </div>
                    <div className="modal-body">
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {showRequestEdit && selectedRequest && (
              <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleRequestUpdate}>
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Water Request</h5>
                      <button className="btn-close" type="button" onClick={() => setShowRequestEdit(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>Purpose</label>
                        <input className="form-control" value={selectedRequest.purpose} onChange={(e) => setSelectedRequest({ ...selectedRequest, purpose: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Amount (L)</label>
                        <input className="form-control" type="number" value={selectedRequest.amount} onChange={(e) => setSelectedRequest({ ...selectedRequest, amount: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Location</label>
                        <input className="form-control" value={selectedRequest.location} onChange={(e) => setSelectedRequest({ ...selectedRequest, location: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Date Needed</label>
                        <input className="form-control" type="date" value={selectedRequest.dateNeeded} onChange={(e) => setSelectedRequest({ ...selectedRequest, dateNeeded: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Status</label>
                        <select className="form-select" value={selectedRequest.status} onChange={(e) => setSelectedRequest({ ...selectedRequest, status: e.target.value })}>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Update</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowRequestEdit(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}


        {/* Reports Tab */}
        {activeTab === "reportManagement" && (
          <div>
            <h3>Reports Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Report"
              value={searchReport}
              onChange={(e) => setSearchReport(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>Report ID</th>
                    <th>Report Type</th>
                    <th>Description</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reports) && reports
                    .filter((report) =>
                      (report.userName?.toLowerCase() || "").includes(searchReport.toLowerCase()) ||
                      (report.reportType?.toLowerCase() || "").includes(searchReport.toLowerCase())
                    )
                    .map((report) => (
                      <tr key={report._id} className="text-center">
                        <td>{report._id}</td>
                        <td>{report.type || "Not specified"}</td>
                        <td>{report.description || "Unknown"}</td>
                        <td>{report.role || "User"}</td>
                        <td>{report.dateOfIssue || "N/A"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => {
                              setViewReport(report);
                              setShowViewModal(true);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => {
                              setEditReport({ ...report });
                              setShowEditModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteReport(report._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Report View Modal */}
        {showViewModal && viewReport && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Report</h5>
                  <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>Report ID</th><td>{viewReport._id}</td></tr>
                      <tr><th>Type</th><td>{viewReport.type}</td></tr>
                      <tr><th>Descripion</th><td>{viewReport.description}</td></tr>
                      <tr><th>Date</th><td>{viewReport.dateOfIssue}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Report Edit Modal */}
        {showEditModal && editReport && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User Report</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateReport}>
                    <input type="hidden" value={editReport._id} />
                    <div className="mb-3">
                      <label className="form-label">User Name</label>
                      <input className="form-control" value={editReport.userName} onChange={(e) => setEditReport({ ...editReport, userName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Report Type</label>
                      <input className="form-control" value={editReport.reportType} onChange={(e) => setEditReport({ ...editReport, reportType: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-control" value={editReport.date?.split("T")[0]} onChange={(e) => setEditReport({ ...editReport, date: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" value={editReport.description} onChange={(e) => setEditReport({ ...editReport, description: e.target.value })}></textarea>
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Update Report</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Internal CSS */}
      <style>{`

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
        }
        .sidebar .nav-link {
            color: #fff;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
