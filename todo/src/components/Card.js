import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTrash, faClone } from '@fortawesome/free-solid-svg-icons';
import { useDrag } from "react-dnd";

const Card = ({card, cards, setCards}) => {

    const changeCardDashboard = (currentItemId, dashboardId) => {
        setCards(
            cards.map(card => {
                return {
                    ...card,
                    dashboard: card.id === currentItemId ? dashboardId : card.dashboard
                }
            })
        );
    }

    const [{isDragging}, drag] = useDrag({
        type: 'Our first type',
        item: {name: card.id, type: 'Our first type'},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                changeCardDashboard(item.name, dropResult.name)
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0.4 : 1;

    const [isEditableTask, setEditableTask] = useState(false);

    const updateTaskTitle = (e) => {
        setCards(
            cards.map(el => {
                return {
                    ...el,
                    name: el.id === card.id ? e.target.value : el.name
                }
            })
        );
    }

    const viewTemplateTask = (
        <h3>{card.name}</h3>
    );

    const editTemplateTask = (
        <input type="text" autoFocus value={card.name} onChange={updateTaskTitle} onBlur={e => setEditableTask(false)} onFocus={e => e.target.select()} />
    );

    // Descripson -------------------------------------------------------------------------------------------------------
    const [isEditableDescripson, setEditableDescripson] = useState(false);

    const updateTaskDescripson = (e) => {
        setCards(
            cards.map(elem => {
                return {
                    ...elem,
                    description: elem.id === card.id ? e.target.value : elem.description
                }
            })
        );
    }


    const editTemplateDescripson = (
        <textarea rows="6" autoFocus value={card.description} onChange={updateTaskDescripson} onBlur={e => setEditableDescripson(false)} onFocus={e => e.target.select()}></textarea>
    );

    //------Descripson--Lathatosag--------------------------------------------------------------------
    const [isActive, setActive] = useState(false);

    const handlerToggle = () => {
        setActive(!isActive);
    }

    //-------------Delete--------------------------------------------------------------------------------

    const deleteHandler = () => {
        setCards(cards.filter((element) => element.id !== card.id));
    }
    //----------------------------------------------------------------------------------------------------

    //-------------Clone--------------------------------------------------------------------------------

    const cloneHandler = () => {
        setCards([
            ...cards, 
            {
                ...card,
                id: cards.length + 1
            }
        ]);
    }
    //----------------------------------------------------------------------------------------------------

    return (
        <div className="card" ref={drag} style={{opacity}}>
            <div className="d-flex space-between align-center" >
                <div className="card-title-wrapper" onClick={e => setEditableTask(true)}>
                    {isEditableTask ? editTemplateTask : viewTemplateTask}
                </div>
                <button className="action-button" onClick={cloneHandler}>
                    <FontAwesomeIcon  icon={faClone} />
                </button>
                <button className="action-button" onClick={deleteHandler}>
                    <FontAwesomeIcon  icon={faTrash} />
                </button>
            </div>     
            <FontAwesomeIcon icon={faCaretDown} onClick={handlerToggle} className="toggleIcon" />                
            <p className={isActive ? "visible" : "hidden"} onClick={e => setEditableDescripson(true)}> {isEditableDescripson ? editTemplateDescripson : card.description}</p>
        </div>
    )
}

export default Card;