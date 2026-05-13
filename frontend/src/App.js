import { useState, useEffect } from "react";

const statusColors = {
  OPEN: { background: "#fff3cd", color: "#856404" },
  IN_PROGRESS: { background: "#cce5ff", color: "#004085" },
  CLOSED: { background: "#d4edda", color: "#155724" },
};

const priorityColors = {
  HIGH: { background: "#f8d7da", color: "#721c24" },
  MEDIUM: { background: "#fff3cd", color: "#856404" },
  LOW: { background: "#d4edda", color: "#155724" },
};

function Badge({ text, colors }) {
  const style = colors[text] || { background: "#eee", color: "#333" };
  return (
    <span style={{
      ...style,
      padding: "3px 10px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "12px"
    }}>
      {text}
    </span>
  );
}

const emptyForm = {
  title: "",
  description: "",
  status: "OPEN",
  priority: "MEDIUM",
  assignedTo: "",
};

function App() {
  const [workOrders, setWorkOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const fetchOrders = () => {
    fetch("http://localhost:8080/api/workorders")
      .then((res) => res.json())
      .then((data) => setWorkOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = () => {
    if (!form.title || !form.assignedTo) {
      alert("Please fill in Title and Assigned To fields.");
      return;
    }
    fetch("http://localhost:8080/api/workorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        fetchOrders();
        setForm(emptyForm);
        setShowForm(false);
      });
  };

  const filtered = filterStatus === "ALL"
    ? workOrders
    : workOrders.filter((o) => o.status === filterStatus);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ color: "#004f90" }}>🔧 Work Order Management</h1>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          {["ALL", "OPEN", "IN_PROGRESS", "CLOSED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                marginRight: "8px",
                padding: "6px 16px",
                backgroundColor: filterStatus === s ? "#004f90" : "#eee",
                color: filterStatus === s ? "white" : "#333",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {s}
            </button>
          ))}
          <span style={{ marginLeft: "1rem", color: "#666" }}>
            Showing {filtered.length} of {workOrders.length} orders
          </span>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "8px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          {showForm ? "Cancel" : "+ New Work Order"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div style={{
          backgroundColor: "#f0f4ff",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          border: "1px solid #c0d0f0"
        }}>
          <h3 style={{ marginTop: 0, color: "#004f90" }}>New Work Order</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Fiber line down on King St"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Assigned To *</label>
              <input
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                placeholder="Technician name"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option>OPEN</option>
                <option>IN_PROGRESS</option>
                <option>CLOSED</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue..."
                rows={3}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "1rem",
              padding: "10px 24px",
              backgroundColor: "#004f90",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            Submit Work Order
          </button>
        </div>
      )}

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#004f90", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Priority</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Assigned To</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order, index) => (
            <tr key={order.id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
              <td style={{ padding: "12px" }}>{order.id}</td>
              <td style={{ padding: "12px" }}>{order.title}</td>
              <td style={{ padding: "12px" }}>
                <Badge text={order.status} colors={statusColors} />
              </td>
              <td style={{ padding: "12px" }}>
                <Badge text={order.priority} colors={priorityColors} />
              </td>
              <td style={{ padding: "12px" }}>{order.assignedTo}</td>
              <td style={{ padding: "12px" }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;