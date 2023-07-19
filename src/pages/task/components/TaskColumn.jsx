import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Autocomplete,
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import {
	TaskPriority,
	TaskCategory,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import { setShowTaskDetails } from "../../../store";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDownward, ArrowForward, ArrowUpward } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const TaskColumn = ({ taskLst }) => {
	const dispatch = useDispatch();
	const { data, membersData, isLoading, handleClickOpen } = taskLst;
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");

	const [tasks, setTasks] = useState([]);
	const [options, setOptions] = useState([""]);

	useEffect(() => {
		if (membersData) {
			setOptions([...membersData?.map((member) => member.username)]);
		}
		if (data) {
			console.log(data);
			const taskConfig = data.map((task, index) => {
				return {
					id: task.id,
					taskName: task.taskName,
					priority: task.priority,
					category: task.category,
					dueDate: task.dueDate,
					assignee: task?.user?.username,
					status: task.status,
				};
			});
			setTasks(taskConfig);
		}
	}, [data, membersData]);

	const setStatusColor = (status) => {};

	const handleRowClick = (taskId) => {
		const taskRow = data.find((dataRow) => dataRow.id === taskId);
		dispatch(setShowTaskDetails(taskRow));
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
		<>
			<div className="mt-6">
				{/* Kanban Board */}
				<DragDropContext onDragEnd={onDragEnd}>
					<div style={{ display: "flex" }}>
						{Object.values(TaskStatus).map((statusValue) => (
							<div key={statusValue} className="flex-1 mx-4">
								<h3>{statusValue}</h3>
								<Droppable droppableId={statusValue.toString()}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{tasks
												.filter(
													(task) =>
														task.status ===
														statusValue
												)
												.map((task, index) => (
													<Draggable
														key={task.id}
														draggableId={task.id}
														index={index}
													>
														{(provided) => (
															<div
																ref={
																	provided.innerRef
																}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className="kanban-task"
															>
																<p>
																	{
																		task.taskName
																	}
																</p>
																<p>
																	Category:{" "}
																	{
																		task.category
																	}
																</p>
																<p>
																	Due Date:{" "}
																	{
																		task.dueDate
																	}
																</p>
																<p>
																	Assignee:{" "}
																	{
																		task.assignee
																	}
																</p>
																<p>
																	Priority:{" "}
																	{
																		task.priority
																	}
																</p>
															</div>
														)}
													</Draggable>
												))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
						))}
					</div>
				</DragDropContext>
			</div>
		</>
	);
};
