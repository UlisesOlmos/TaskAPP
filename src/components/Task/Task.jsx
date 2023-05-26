import "./Task.css";
import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiFillDelete,
	AiFillEdit,
} from "react-icons/ai";
import { useState } from "react";
import useDeleteTask from "../../hooks/useDeleteTask";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";
import transformDate from "../../utilities/transfromDate";

const Task = ({ data }) => {
	const { title, descrip, priority, taskID, date } = data;
	const [showMore, setShowMore] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { deleteTask } = useDeleteTask();

	const handleDelete = (taskID) => {
		deleteTask(taskID);
	};

	const handleModal = (bool) => {
		setIsEditing(bool);
		setShowMore(false);
		document.querySelector("body").classList.toggle("no-scroll");
	};

	return (
		<>
			<div className="tasks__item">
				<div className="item__main-content">
					<p className={`item__title item__title--${priority.toLowerCase()}`}>{title}</p>
					<button className="item__drop" onClick={() => setShowMore(!showMore)}>
						{!showMore ? <AiFillCaretDown /> : <AiFillCaretUp />}
					</button>

					{!showMore ? <p className="item__descrip">{descrip}</p> : null}
				</div>
				{!showMore ? null : (
					<>
						<div className="item__more">
							<p className="item__descrip item__describe--more">
								<span className="info__title">Description</span>
								{descrip}
							</p>
							<ul className="more__info">
								<li className="info__item">
									<span className="info__title">Date</span> {transformDate(date)}
								</li>
								<li className="info__item">
									<span className="info__title">Priority</span> {priority}
								</li>
							</ul>
						</div>
						<div className="more__options">
							<button
								className="options__btn options__btn--delete"
								onClick={() => handleDelete(taskID)}
							>
								Delete <AiFillDelete />
							</button>
							<button
								className="options__btn options__btn--edit"
								onClick={() => handleModal(true)}
							>
								Edit <AiFillEdit />
							</button>
						</div>
					</>
				)}
			</div>
			{!isEditing ? null : (
				<div className="tasks__modal">
					<UpdateTaskForm data={data} handleModal={handleModal} />
				</div>
			)}
		</>
	);
};

export default Task;
