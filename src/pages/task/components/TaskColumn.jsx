import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { setShowTaskDetails } from "../../../store";
import {
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import { TaskStatusColumn } from "./ColumnElement/TaskStatusColumn";

export const TaskColumn = ({ taskLst }) => {
	const dispatch = useDispatch();
	const { data, membersData, isLoading, handleClickOpen } = taskLst;
	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (membersData) {
			setUsers([...membersData]);
		}
		if (data) {
			const taskConfig = data.map((task, index) => {
				return {
					id: task.id,
					taskName: task.taskName,
					priority: task.priority,
					category: task.category,
					dueDate: task.dueDate,
					assignee: task?.user?.username,
					pic: task?.user?.pic,
					status: task.status,
				};
			});
			setTasks(taskConfig);
			console.log("config", tasks);
		}
	}, [data, membersData]);

	const handleRowClick = (taskId) => {
		const taskRow = data.find((dataRow) => dataRow.id === taskId);
		const assignee = users.find(
			(user) => user.username === taskRow.assignee
		);
		const taskDetails = {
			...taskRow,
			assignee: assignee,
		};
		dispatch(setShowTaskDetails(taskDetails));
		handleClickOpen(true);
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination || destination.index === source.index) {
			return;
		}
		const movedTask = tasks.find((task) => task.id === draggableId);
		const newTasks = [...tasks];
		newTasks.splice(source.index, 1);
		newTasks.splice(destination.index, 0, movedTask);
		setTasks(newTasks);
	};

	return (
		<div className="mt-[15px] overflow-x-scroll h-fit scrollbar-hide">
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="grid grid-cols-4 gap-[10rem] my-5">
					{Object.values(TaskStatus).map((statusValue) => (
						<TaskStatusColumn
							key={statusValue}
							statusValue={statusValue}
							tasks={tasks}
							handleRowClick={handleRowClick}
						/>
					))}
				</div>
			</DragDropContext>
		</div>
	);
};
