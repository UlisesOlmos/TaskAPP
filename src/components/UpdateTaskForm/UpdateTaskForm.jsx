import "./UpdateTaskForm.css";
import { RiCloseFill } from "react-icons/ri";
import removeBlanks from "../../utilities/removeBlanks";
import useUpdateTask from "../../hooks/useUpdateTask";

const UpdateTaskForm = ({ handleModal, data }) => {
	const { title, descrip, date, priority, taskID } = data;

	const { updateTask, setTitle, setDescrip, setDate, setPriority } =
		useUpdateTask();

	const handleForm = (e) => {
		e.preventDefault();
		updateTask(taskID).then(() => {
			handleModal(false);
		});
	};

	const cancelSubmit = () => {
		handleModal(false);
	};

	if (!data) return null;

	return (
		<form className="tasks__form" onSubmit={(e) => handleForm(e)}>
			<button className="form__close" onClick={() => cancelSubmit()} type="button">
				<RiCloseFill />
			</button>

			<label className="form__label">
				Title
				<input
					type="text"
					name="title"
					className="form__input form__input--task"
					onChange={(e) => setTitle(removeBlanks(e.target.value))}
					defaultValue={title}
				/>
			</label>
			<label className="form__label">
				Start
				<input
					type="date"
					name="date"
					className="form__input form__input--task"
					onChange={(e) => setDate(e.target.value)}
					defaultValue={date}
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
					defaultValue={descrip}
				></textarea>
			</label>
			<label className="form__label">
				Priority
				<select
					name="priority"
					className="form__input form__input--task"
					onChange={(e) => setPriority(e.target.value)}
					defaultValue={priority}
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

export default UpdateTaskForm;
