import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import {
	Autocomplete,
	IconButton,
	MenuItem,
	Popover,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import {
	ArrowDownward,
	ArrowForward,
	ArrowUpward,
	CalendarToday,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const handleUpdateTask = () => {};

function TaskDetailForm({ props }) {
	const taskToShowDetails = useSelector(
		(state) => state.tasks.taskToShowDetails
	);
	const { data, membersData, handleClose } = props;

	useEffect(() => {
		if (membersData) {
			setOptions([...membersData?.map((member) => member.username)]);
		}
		if (Object.keys(taskToShowDetails).length > 0) {
			setTaskName(taskToShowDetails.taskName);
			setDesc(taskToShowDetails.description);
			setBrief(taskToShowDetails.brief);
			setCategory(taskToShowDetails.category);
			setPriority(taskToShowDetails.priority);
			setStatus(taskToShowDetails.status);
			setEstimated(taskToShowDetails.estimated);
			setStartDate(dayjs(taskToShowDetails.startDate));
			setDueDate(dayjs(taskToShowDetails.dueDate));
			setAssignee(taskToShowDetails.user.username);
			setParentTask(taskToShowDetails.parentTask);
		}
	}, []);

	const [options, setOptions] = useState([""]);
	const [taskName, setTaskName] = useState("");
	const [desc, setDesc] = useState("");
	const [brief, setBrief] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [estimated, setEstimated] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [dueDate, setDueDate] = useState(null);
	const [status, setStatus] = useState("");
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [parentTask, setParentTask] = useState("");
	const [files, setFiles] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenCalendar = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseCalendar = () => {
		setAnchorEl(null);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		handleCloseCalendar();
	};
	return (
		<div className="min-h-full">
			<form className="h-full" onSubmit={handleUpdateTask}>
				<div className="p-5 flex border-b-2">
					<div className="flex flex-col justify-between  gap-2 w-2/3 pr-2 border-r-2">
						<div className="flex justify-between items-center gap-4">
							<TextField
								required
								size="small"
								id="taskName"
								type="text"
								value={taskName}
								onChange={(e) => setTaskName(e.target.value)}
								autoComplete="off"
								className="w-full"
							/>
							<div className="flex justify-center items-center">
								{priority === TaskPriority.HIGH ? (
									<ArrowUpward sx={{ color: "#f42858" }} />
								) : priority === TaskPriority.NORMAL ? (
									<ArrowForward sx={{ color: "#4488c5" }} />
								) : (
									<ArrowDownward sx={{ color: "#5eb5a6" }} />
								)}
								<Select
									required
									size="small"
									// className="w-full h-8"
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
									<MenuItem value={TaskPriority.NORMAL}>
										NORMAL
									</MenuItem>
									<MenuItem value={TaskPriority.LOW}>
										LOW
									</MenuItem>
								</Select>
							</div>
						</div>
						<div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
							<p>Category: </p>
							<Select
								size="small"
								required
								// className="w-full"
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
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
							<div className="flex justify-end items-center gap-2">
								<p>Due on:</p>
								<span className="w-1/2">
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DatePicker
											size="small"
											// sx={{ height: "100%"}}
											slotProps={{
												textField: {
													size: "small",
													fullWidth: false,
												},
											}}
											id="dueDate"
											value={dueDate}
											onChange={(newValue) =>
												setDueDate(newValue)
											}
											format="DD/MM/YYYY"
											views={["day"]}
										/>
									</LocalizationProvider>
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 pl-2 w-1/3">
						<div>
							<Select
								fullWidth
								// className="rounded-[16px] h-8"
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								size="small"
							>
								<MenuItem disabled value="">
									Select task status
								</MenuItem>
								<MenuItem value={TaskStatus.OPEN}>
									OPEN
								</MenuItem>
								<MenuItem value={TaskStatus.INPROGRESS}>
									INPROGRESS
								</MenuItem>
								<MenuItem value={TaskStatus.RESOLVED}>
									RESOLVED
								</MenuItem>
								<MenuItem value={TaskStatus.CLOSED}>
									CLOSED
								</MenuItem>
							</Select>
						</div>
						<div>
							<Autocomplete
								fullWidth
								disablePortal
								size="small"
								id="assignee"
								value={assignee}
								onChange={(e, newValue) => {
									setAssignee(newValue);
								}}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => {
									setInputValue(newInputValue);
								}}
								options={options}
								renderInput={(params) => (
									<TextField className="!h-8" {...params} />
								)}
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-rows-4 grid-flow-col h-full gap-2">
					<div className="row-span-2 bg-red-400">
						<div></div>
					</div>
					<div className="row-span-2 bg-red-400">MILESTONE</div>
					<div className="row-span-2 col-span-2 bg-blue-400">
						FILES
					</div>
					<div className="row-span-2 col-span-2 bg-red-400">
						COMMENT
					</div>
				</div>
			</form>
		</div>
	);
}

export default TaskDetailForm;
