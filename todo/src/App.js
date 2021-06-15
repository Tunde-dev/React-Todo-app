import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./components/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  
  useEffect(() => {
    document.title = "ToDo List"
  })

  const [dashboards, setDashboards] = useState([{
    id: "dash-1", name: "Untilted"
  }]);

  const [cards, setCards] = useState([]);

  const addDashboardHandler = (e) => {
    e.preventDefault();
    setDashboards([...dashboards, {id: `dash-${dashboards.length + 1}`, name: "Untilted"}]);
  };

  return (<div className="d-flex coloumn align-center">
      <h1>ToDo App</h1>
      <div className="dashboard-list">
        <DndProvider backend={HTML5Backend}>
          {dashboards.map(dashboard => (
            <Dashboard key={dashboard.id} name={dashboard.name} dashboard={dashboard} dashboards={dashboards} setDashboards={setDashboards} cards={cards} setCards={setCards} />
          ))}
        </DndProvider>
        <button onClick={addDashboardHandler} className="add-dashboard">
          <FontAwesomeIcon icon={faPlus} /> Újabb lista hozzáadása
        </button>
      </div>
    </div>
  );
}

export default App;

