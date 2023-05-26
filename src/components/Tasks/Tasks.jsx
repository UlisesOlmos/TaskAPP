import { useEffect, useState } from "react";
import useGetTasks from "../../hooks/useGetTasks";
import Task from "../Task/Task";
import "./Tasks.css";
import transformDate from "../../utilities/transfromDate";

const arrangePriority = (a, b) => {
	const priorityOrder = { High: 1, Medium: 2, Low: 3 };
	return priorityOrder[a.priority] - priorityOrder[b.priority];
};
const arrangeByDate = (a, b) =>
	Number(new Date(Object.keys(a)[0])) - Number(new Date(Object.keys(b)[0]));

const Tasks = () => {
	const { tasks } = useGetTasks();
	const [data, setData] = useState();

	useEffect(() => {
		let finished = [];
		const groupedData = tasks.sort(arrangePriority).reduce((result, item) => {
			const { date } = item;
			const currentDate = new Date();

			const itemDate = new Date(
				date.slice(0, -1) + `${Number(date.slice(-1)) + 1}`
			);

			if (itemDate.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0)) {
				if (!result[date]) result[date] = [];
				result[date].push(item);
			} else {
				finished.push(item);
			}
			return result;
		}, {});
		
		if (finished.length > 0) groupedData["finished"] = finished;

		setData(
			Object.entries(groupedData)
				.map(([date, items]) => {
					return { [date]: items };
				})
				.sort(arrangeByDate)
		);
	}, [tasks]);

	if (!data) return null;

	return (
		<ul className="tasks__list">
			{data.map((el, index) => {
				return (
					<li key={index} className="date__list">
						<p className="date__text">{transformDate(Object.keys(el)[0])}</p>
						{Object.values(el)[0].map((item, i) => (
							<Task data={item} key={i} />
						))}
					</li>
				);
			})}
		</ul>
	);
};

export default Tasks;
