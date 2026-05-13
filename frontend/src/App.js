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

function App() {
  const [workOrders, setWorkOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetch("http://localhost:8080/api/workorders")
      .then((res) => res.json())
      .then((data) => setWorkOrders(data));
  }, []);

  const filtered = filterStatus === "ALL"
    ? workOrders
    : workOrders.filter((o) => o.status === filterStatus);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ color: "#004f90" }}>🔧 Work Order Management</h1>

      {/* Filter buttons */}
      <div style={{ marginBottom: "1rem" }}>
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