import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setTasks,
	useGetTasksQuery,
	useCreateTaskMutation,
	useGetAllMembersDetailsQuery,
} from "../../store";
import {
	Autocomplete,
	Box,
	Button,
	Card,
	Dialog,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { CustomTextArea } from "../../components/CustomTextArea";
import { LoadingButton } from "@mui/lab";
import {
	TaskPriority,
	TaskCategory,
	TaskStatus,
} from "../../store/constants/TaskConstant";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { borderRadius } from "@mui/system";

function TaskBoard() {
	const dispatch = useDispatch();
	const teamSelect = useSelector((state) => state.team.id);
	const { data, isLoading, err } = useGetTasksQuery();
	const [createTask] = useCreateTaskMutation();
	const { data: membersData } = useGetAllMembersDetailsQuery(teamSelect);
	useEffect(() => {
		if (membersData) {
			setOptions([
				...options,
				...membersData?.map((member) => member.username),
			]);
		}
	}, [membersData]);

	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([""]);

	const [taskName, setTaskName] = useState("");
	const [desc, setDesc] = useState("");
	const [brief, setBrief] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [estimated, setEstimated] = useState("");
	const [actual, setActual] = useState();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState();
	const [dueDate, setDueDate] = useState(null);
	const [status, setStatus] = useState("");
	const [project, setProject] = useState("001");
	const [position, setPosition] = useState(0);
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [version, setVersion] = useState("");
	const [parentTask, setParentTask] = useState("");
	const [files, setFiles] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUploadFile = (e) => {
		setFiles(e.target.files);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = membersData.find((x) => x.username === assignee);
		const taskModel = {
			taskName,
			description: desc,
			brief,
			priority,
			category,
			estimated: estimated,
			actualHours: actual,
			startDate: dayjs(startDate).format("YYYY-MM-DD"),
			endDate,
			dueDate: dayjs(dueDate).format("YYYY-MM-DD"),
			status,
			project: { id: project },
			position,
			user: user.userId,
			version,
			parentTask,
		};
		const task = new FormData();
		for (let i = 0; i < files.length; i++) {
			task.append("files", files[i]);
		}
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

	return (
		<>
			<div className="flex">
				<div>
					<Button variant="contained" onClick={handleClickOpen}>
						+ NEW TASK
					</Button>
					<Dialog
						className="w-screen"
						fullWidth={true}
						maxWidth={"md"}
						open={open}
						onClose={handleClose}
						sx={{
							overflow: "auto",
						}}
					>
						<div className="p-2">
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
								<div className="flex">
									<div className="flex flex-row p-4 items-center w-1/3">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Task Name
										</FormLabel>
										<TextField
											required
											id="taskName"
											type="text"
											// ref={emailRef}
											value={taskName}
											onChange={(e) =>
												setTaskName(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
									<div className="flex flex-row p-4 items-center w-2/3">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Description
										</FormLabel>
										<TextField
											id="description"
											value={desc}
											onChange={(e) =>
												setDesc(e.target.value)
											}
											autoComplete="off"
											className="w-full"
										/>
									</div>
								</div>
								<div className="flex">
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Priority
										</FormLabel>
										<Select
											required
											className="w-full"
											id="priority"
											value={priority}
											onChange={(e) =>
												setPriority(e.target.value)
											}
										>
											<MenuItem disabled value="">
												Set task priority
											</MenuItem>
											<MenuItem value={TaskPriority.HIGH}>
												HIGH
											</MenuItem>
											<MenuItem
												value={TaskPriority.NORMAL}
											>
												NORMAL
											</MenuItem>
											<MenuItem value={TaskPriority.LOW}>
												LOW
											</MenuItem>
										</Select>
									</div>
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Category
										</FormLabel>
										<Select
											required
											className="w-full"
											id="category"
											value={category}
											onChange={(e) =>
												setCategory(e.target.value)
											}
										>
											<MenuItem disabled value="">
												Select task category
											</MenuItem>
											<MenuItem value={TaskCategory.TASK}>
												TASK
											</MenuItem>
											<MenuItem value={TaskCategory.BUG}>
												BUG
											</MenuItem>
											<MenuItem value={TaskCategory.CR}>
												CHANGE REQUEST
											</MenuItem>
										</Select>
									</div>
								</div>
								<div className="flex">
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Estimated Hours
										</FormLabel>
										<TextField
											required
											id="estimated"
											type="number"
											value={estimated}
											onChange={(e) =>
												setEstimated(e.target.value)
											}
											autoComplete="off"
											fullWidth
										/>
									</div>
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Assignee
										</FormLabel>
										<Autocomplete
											fullWidth
											disablePortal
											id="assignee"
											value={assignee}
											onChange={(e, newValue) => {
												setAssignee(newValue);
											}}
											inputValue={inputValue}
											onInputChange={(
												event,
												newInputValue
											) => {
												setInputValue(newInputValue);
											}}
											options={options}
											renderInput={(params) => (
												<TextField {...params} />
											)}
										/>
										{/* <TextField
											required
											id="assignee"
											type="text"
											value={assignee}
											onChange={(e) =>
												setAssignee(e.target.value)
											}
											autoComplete="off"
											fullWidth
										/> */}
									</div>
									{/* <div className="p-4">
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
								</div> */}
								</div>
								<div className="flex">
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Start Date
										</FormLabel>
										<LocalizationProvider
											dateAdapter={AdapterDayjs}
										>
											<DatePicker
												id="startDate"
												value={startDate}
												onChange={(newValue) =>
													setStartDate(newValue)
												}
												format="DD/MM/YYYY"
												views={["day"]}
												className="w-full"
											/>
										</LocalizationProvider>
									</div>
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Due Date
										</FormLabel>
										<LocalizationProvider
											dateAdapter={AdapterDayjs}
										>
											<DatePicker
												id="dueDate"
												value={dueDate}
												onChange={(newValue) =>
													setDueDate(newValue)
												}
												format="DD/MM/YYYY"
												views={["day"]}
												className="w-full"
											/>
										</LocalizationProvider>
									</div>
									{/* <div className="p-4">
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
									</div> */}
								</div>
								<div className="flex">
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Status
										</FormLabel>
										<Select
											className="w-full"
											id="status"
											value={status}
											onChange={(e) =>
												setStatus(e.target.value)
											}
										>
											<MenuItem disabled value="">
												Select task status
											</MenuItem>
											<MenuItem value={TaskStatus.OPEN}>
												OPEN
											</MenuItem>
											<MenuItem
												value={TaskStatus.INPROGRESS}
											>
												INPROGRESS
											</MenuItem>
											<MenuItem
												value={TaskStatus.RESOLVED}
											>
												RESOLVED
											</MenuItem>
											<MenuItem value={TaskStatus.CLOSED}>
												CLOSED
											</MenuItem>
										</Select>
									</div>
									<div className="flex flex-row p-4 items-center w-1/2">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mr-2"
										>
											Add parent task
										</FormLabel>
										<Select
											className="w-full"
											id="parentTask"
											value={parentTask ? parentTask : ""}
											onChange={(e) =>
												setParentTask(e.target.value)
											}
										>
											{/* <div className="max-h-40"> */}
												<MenuItem disabled value="">
													Select parent task
												</MenuItem>
												{data?.map((task) => (
													<MenuItem
														key={task.id}
														value={task.id}
													>
														{task.taskName}
													</MenuItem>
												))}
											{/* </div> */}
										</Select>
									</div>
								</div>
								<div className="flex">
									<div className="flex flex-col p-4 items-start w-full">
										<FormLabel
											component="legend"
											className="whitespace-nowrap mb-2"
										>
											Task Brief
										</FormLabel>
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
								</div>
								<div className="p-4">
									<label className="block">
										<span className="sr-only">
											Choose profile photo
										</span>
										<input
											type="file"
											multiple
											className="block w-full text-sm text-slate-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-500
                  hover:file:bg-green-100"
											id="files"
											onChange={handleUploadFile}
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
										<span className="px-5">Create</span>
									</LoadingButton>
								</div>
							</form>
						</div>
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
