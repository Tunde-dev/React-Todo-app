import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./components/Dashboard";

function App() {
  useEffect(() => {
    document.title = "ToDo List";
  });

  const [dashboards, setDashboards] = useState([
    {
      id: "dash-1",
      name: "Untilted",
    },
  ]);

  const addDashboardHandler = (e) => {
    e.preventDefault();
    setDashboards([
      ...dashboards,
      { id: `dash-${dashboards.length + 1}`, name: "Untilted" },
    ]);
  };

  return (
    <div className="d-flex coloumn align-center">
      <h1>ToDo App</h1>
      <div className="dashboard-list">
        {dashboards.map((dashboard) => (
          <Dashboard
            key={dashboard.id}
            name={dashboard.name}
            dashboard={dashboard}
            dashboards={dashboards}
            setDashboards={setDashboards}
          />
        ))}

        <button onClick={addDashboardHandler} className="add-dashboard">
          <FontAwesomeIcon icon={faPlus} /> New dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
