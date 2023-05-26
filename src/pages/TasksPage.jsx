import { Tasks, TaskForm } from "../components";
import { useState } from "react";
import { useTasks } from "../contexts/TasksContext";

const TasksPage = () => {
	const { showFormMessage, formMessage }= useTasks();

	const [showTaskForm, setShowTaskForm] = useState(false);

	const handleModal = (bool) => {
		setShowTaskForm(bool);
		document.querySelector("body").classList.toggle("no-scroll");
	};

	return (
		<div className="tasks">
			<Tasks />
			<button className="tasks__add" onClick={() => handleModal(true)}>
				Add Tasks
			</button>
			{!showFormMessage ? null : (
				<div className={`tasks__form-message tasks__form-message--${formMessage.type}`}>
					<p>{formMessage.msg}</p>
				</div>
			)}
			{!showTaskForm ? null : (
				<div className="tasks__modal">
					<TaskForm handleModal={handleModal}/>
				</div>
			)}
		</div>
	);
};

export default TasksPage;
