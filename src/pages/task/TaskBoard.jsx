import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, useGetTasksQuery, useCreateTaskMutation } from "../../store";
import { Box, Button, Card, Dialog, TextField } from "@mui/material";
import { CustomTextArea } from "../../components/CustomTextArea";
import { LoadingButton } from "@mui/lab";
import { createSelector } from "reselect";

function TaskBoard() {
	const dispatch = useDispatch();
	const { data, isLoading, err } = useGetTasksQuery();
	const [createTask, { isLoading: creating, isSuccess: created }] =
		useCreateTaskMutation();

	const [open, setOpen] = useState(false);

	const [id, setId] = useState("");
	const [taskName, setTaskName] = useState("");
	const [desc, setDesc] = useState("");
	const [brief, setBrief] = useState("");
	const [priority, setPriority] = useState("HIGH");
	const [category, setCategory] = useState("TASK");
	const [estimated, setEstimated] = useState(8);
	const [actual, setActual] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [dueDate, setDueDate] = useState("2023-07-14");
	const [status, setStatus] = useState("OPEN");
	const [milestone, setMilestone] = useState("001");
	const [position, setPosition] = useState("");
	const [assignee, setAssignee] = useState("1687973415130");
	const [version, setVersion] = useState("");
	const [parentTask, setParentTask] = useState("");

	const taskModel = {
		id,
		taskName,
		description: desc,
		brief,
		priority,
		category,
		estimated,
		actualHours: actual,
		startDate,
		endDate,
		dueDate,
		status,
		milestone: { id: milestone },
		position,
		users: { id: assignee },
		version,
		parentTask,
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const task = new FormData();
		const taskJson = JSON.stringify(taskModel);
		const taskBlob = new Blob([taskJson], { type: "application/json" });
		task.append("task", taskBlob);
		try {
			await createTask(task);
			setOpen(false);
		} catch (err) {
			console.log("ERR ", err);
		}
	};
	const toolbarHeight = 45;

	return (
		<>
			<div className="flex">
				<div>
					<Button variant="contained" onClick={handleClickOpen}>
						+ NEW TASK
					</Button>
					<Dialog
						open={open}
						onClose={handleClose}
						sx={{
							overflow: "auto",
						}}
					>
						<Box
							sx={{
								minHeight: `calc(100vh - ${toolbarHeight}px)`,
								display: "grid",
								placeItems: "center",
								alignItems: "center",
							}}
						>
							<Card
								className="p-2"
								sx={{
									width: 450,
									position: "relative",
									top: toolbarHeight / 2,
									overflow: "unset",
								}}
							>
								<h1 className="text-center font-extrabold text-2xl">
									Create a new task
								</h1>

								<p
									// ref={errRef}
									// className={errMsg ? "errmsg" : "offscreen"}
									aria-live="assertive"
								>
									{/* {errMsg} */}
								</p>

								<form onSubmit={handleSubmit}>
									<div className="p-4">
										<TextField
											required
											id="id"
											type="text"
											label="Task ID"
											// ref={emailRef}
											value={id}
											onChange={(e) =>
												setId(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="taskName"
											type="text"
											label="Task Name"
											// ref={emailRef}
											value={taskName}
											onChange={(e) =>
												setTaskName(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="description"
											label="Description"
											value={desc}
											onChange={(e) =>
												setDesc(e.target.target)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="priority"
											label="Priority"
											type="text"
											value={priority}
											onChange={(e) =>
												setPriority(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="category"
											label="Category"
											value={category}
											onChange={(e) =>
												setCategory(e.target.target)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="estimated"
											label="Estimated Hours"
											type="text"
											value={estimated}
											onChange={(e) =>
												setEstimated(e.target.target)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="actual"
											label="Actual Hours"
											type="text"
											value={actual}
											onChange={(e) =>
												setActual(e.target.target)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="startDate"
											label="Start Date"
											type="text"
											value={startDate}
											onChange={(e) =>
												setStartDate(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="endDate"
											label="End Date"
											type="text"
											value={endDate}
											onChange={(e) =>
												setEndDate(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="dueDate"
											label="Due Date"
											type="text"
											value={dueDate}
											onChange={(e) =>
												setDueDate(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="status"
											label="Status"
											type="text"
											value={status}
											onChange={(e) =>
												setStatus(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="milestone"
											label="Milestone"
											type="text"
											value={milestone}
											onChange={(e) =>
												setMilestone(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="position"
											label="Position"
											type="number"
											value={position}
											onChange={(e) =>
												setPosition(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											required
											id="assignee"
											label="Assignee"
											type="text"
											value={assignee}
											onChange={(e) =>
												setAssignee(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="version"
											label="Version"
											type="text"
											value={version}
											onChange={(e) =>
												setVersion(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="p-4">
										<TextField
											id="parentTask"
											label="Children of task"
											type="text"
											value={parentTask}
											onChange={(e) =>
												setParentTask(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>

									<div className="p-4">
										<CustomTextArea
											id="brief"
											placeholder="Type in task briefings..."
											value={brief}
											onChange={(e) =>
												setBrief(e.target.value)
											}
											className="w-full"
										/>
									</div>

									<div className="p-4">
										<label className="block">
											<span className="sr-only">
												Choose profile photo
											</span>
											<input
												type="file"
												className="block w-full text-sm text-slate-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-500
                  hover:file:bg-green-100"
												id="pic"
												// onChange={handleUploadFile}
											/>
										</label>
									</div>

									<div className="text-center">
										<LoadingButton
											type="submit"
											size="small"
											// loading={isLoading}
											loadingIndicator="Creating account..."
											// loadingPosition='end'
											variant="contained"
											className="!bg-green-400 !hover:bg-green-600 !rounded-full"
										>
											<span className="px-5">
												Sign Up
											</span>
										</LoadingButton>
									</div>
								</form>
							</Card>
						</Box>
					</Dialog>
				</div>
			</div>
			<div className="mt-6">
				{isLoading ? (
					<div>Loading...</div>
				) : err ? (
					<div>{err}</div>
				) : (
					<ul>
						{data?.map((task, index) => (
							<div key={index}>
								{index + 1} - {task.taskName}
							</div>
						))}
					</ul>
				)}
			</div>
		</>
	);
}

export default TaskBoard;
