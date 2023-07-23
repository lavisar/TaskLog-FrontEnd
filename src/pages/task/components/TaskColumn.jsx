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
import { useUpdateTaskMutation } from "../../../store";

export const TaskColumn = ({ taskLst }) => {
	const dispatch = useDispatch();
	const { data, membersData, isLoading, handleClickOpen } = taskLst;
	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [updateTask] = useUpdateTaskMutation();
	const [foundObject, setFoundObject] = useState({});
	const [draggedItemId, setDraggedItemId] = useState(null);

	// found obj task with ID
	const handleFindObject = async (id) => {
		const found = data.find((obj) => obj.id === id);
		if (found) {
			await setFoundObject(found);
		}
	};

	const onDragStart = (result) => {
		setDraggedItemId(result.draggableId);
		handleFindObject(result.draggableId);
	};

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

	const handleUpdateTask = async (id, newStatus) => {
		const taskModel = {
			id: id,
			taskName: foundObject.taskName,
			brief: foundObject.brief,
			priority: foundObject.priority,
			category: foundObject.category,
			estimated: foundObject.estimated,
			actualHours: foundObject.actualHours,
			startDate: foundObject.startDate,
			dueDate: foundObject.dueDate,
			endDate: foundObject.endDate,
			status: newStatus,
			project: foundObject.project,
			user: foundObject.user,
		};
		try {
			await updateTask(taskModel);
		} catch (error) {
			console.log(error);
		}
	};
	const onDragEnd = async (result) => {
		// console.log("result", result);
		const { destination, source, draggableId } = result;

		if (destination.droppableId === source.droppableId) {
			// console.log("vi tri khong thay doi");
			return;
		}

		// console.log("task in dragend", tasks);
		const newTasks = [...tasks];
		const movedTaskIndex = newTasks.findIndex(
			(task) => task.id === draggableId
		);
		const movedTask = newTasks.splice(movedTaskIndex, 1)[0]; // Xóa task được kéo khỏi vị trí cũ
		newTasks.splice(destination.droppableId, 0, movedTask); // Chèn task vào vị trí mới

		newTasks[movedTaskIndex].status = result.destination.droppableId;

		// console.log("newTasks: ", JSON.stringify(newTasks, null, 2));
		// console.log("movedTaskIndex", movedTaskIndex);
		// console.log("movedTask: " + JSON.stringify(movedTask, null, 2));
		setTasks(newTasks);

		await handleUpdateTask(draggableId, destination.droppableId);
	};

	return (
		<div className="mt-[15px] overflow-x-scroll h-[calc(100vh-150px)]">
			<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<div className="grid grid-cols-4 gap-[10rem] my-5 ">
					{Object.values(TaskStatus).map((statusValue) => (
						<TaskStatusColumn
							key={statusValue}
							statusValue={statusValue}
							tasks={tasks}
							handleRowClick={handleRowClick}
							draggedItemId={draggedItemId}
						/>
					))}
				</div>
			</DragDropContext>
		</div>
	);
};
