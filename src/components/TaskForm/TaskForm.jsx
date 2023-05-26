import "./TaskForm.css";
import { RiCloseFill } from "react-icons/ri";
import useAddTask from "../../hooks/useAddTask";
import removeBlanks from "../../utilities/removeBlanks";

const TaskForm = ({ handleModal }) => {
    
	const {
		saveTask,
		setTitle,
		setDescrip,
		setPriority,
		setDate
	} = useAddTask();


	const handleForm = (e) => {
		e.preventDefault();
		saveTask().then(() => {
			handleModal(false);
		})
	};

	const cancelSubmit = () => {
		handleModal(false);
	};

	return (
		<form className="tasks__form" onSubmit={(e) => handleForm(e)}>
			<button className="form__close" onClick={() => cancelSubmit()} type="button">
				<RiCloseFill />
			</button>

			<label className="form__label">
				Title
				<input
					type="text"
					name="userID"
					className="form__input form__input--task"
					onChange={(e) => setTitle(removeBlanks(e.target.value))}
				/>
			</label>
			<label className="form__label">
				Date
				<input
					type="date"
					name="date"
					className="form__input form__input--task"
					onChange={(e) => setDate(e.target.value)}
				/>
			</label>
			<label className="form__label">
				Description
				<textarea
					name="descrip"
					cols="30"
					rows="10"
					className="form__textarea"
					onChange={(e) => setDescrip(removeBlanks(e.target.value))}
				></textarea>
			</label>
			<label className="form__label">
				Priority
				<select
					name="priority"
					className="form__input form__input--task"
					onChange={(e) => setPriority(e.target.value)}
					defaultValue={"High"}
				>
					<option value={"High"}>High</option>
					<option value={"Medium"}>Medium</option>
					<option value={"Low"}>Low</option>
				</select>
			</label>
			<input type="submit" className="form__submit form__submit--task" />
		</form>
	);
};

export default TaskForm;
