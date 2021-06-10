import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const Dashboard = ({
  dashboard,
  dashboards,
  setDashboards,
  name,
  cards,
  setCards,
}) => {
  const [isEditable, setEditable] = useState(false);

  const [newName, setNewName] = useState(name);

  const addCardHandler = () => {
    setCards([
      ...cards,
      {
        id: `card-${cards.length + 1}`,
        dashboard: dashboard.id,
        name: "Task",
        description: "Description",
      },
    ]);
  };
  // Get cards for specific dashboard
  const returnCardsForDashboard = (dashboard) => {
    return cards
      .filter((card) => card.dashboard === dashboard)
      .map((card) => (
        <Card key={card.id} card={card} cards={cards} setCards={setCards} />
      ));
  };
  const updateDashboardTitle = (e) => {
    setNewName(e.target.value);
  };

  const viewTemplate = <h2 className="dashTitleView">{newName}</h2>;

  const editTemplate = (
    <input
      className="dashTitle"
      type="text"
      autoFocus
      value={newName}
      onChange={updateDashboardTitle}
      onBlur={(e) => setEditable(false)}
      onFocus={(e) => e.target.select()}
    />
  );

  const deleteHandlerDash = () => {
    setDashboards(dashboards.filter((element) => element.id !== dashboard.id));
  };

  return (
    <div className="dashboard d-flex coloumn">
      <div className="dashboard-title-wrapper d-flex">
        <div onClick={(e) => setEditable(true)} className="editable-area">
          {isEditable ? editTemplate : viewTemplate}
        </div>
        <button className="action-button">
          <FontAwesomeIcon
            className="new-card plusDashIcon"
            icon={faPlus}
            onClick={addCardHandler}
          />
        </button>
        <button className="action-button">
          <FontAwesomeIcon
            className="deleteDashIcon"
            icon={faTrash}
            onClick={deleteHandlerDash}
          />
        </button>
      </div>
      {returnCardsForDashboard(dashboard.id)}
    </div>
  );
};

export default Dashboard;
