import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import {
	Autocomplete,
	Avatar,
	Button,
	IconButton,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import {
	Add,
	ArrowDownward,
	ArrowForward,
	ArrowUpward,
	Delete,
	Flag,
	Folder,
	Notes,
	Send,
	UploadFile,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { CustomTextArea } from "../../../components/CustomTextArea";
import { API_INSTANCE } from "../../../store/apis/features/apisConst";
import { useUpdateTaskMutation } from "../../../store";

function TaskDetailForm({ props }) {
	const taskToShowDetails = useSelector(
		(state) => state.tasks.taskToShowDetails
	);
	const projectId = useSelector((state) => state.project.id);
	const currentMember = useSelector((state) => state.currentMember);
	const { data, membersData, handleClose } = props;
	const [updateTask] = useUpdateTaskMutation();

	const [options, setOptions] = useState([""]);
	const [taskId, setTaskId] = useState("");
	const [taskName, setTaskName] = useState("");
	const [brief, setBrief] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [estimated, setEstimated] = useState("");
	const [actual, setActual] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [dueDate, setDueDate] = useState(null);
	const [status, setStatus] = useState("");
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [comment, setComment] = useState("");
	let index = 2;
	useEffect(() => {
		if (membersData) {
			setOptions([...membersData?.map((member) => member.username)]);
		}
		if (Object.keys(taskToShowDetails).length > 0) {
			setTaskId(taskToShowDetails.id);
			setTaskName(taskToShowDetails.taskName);
			setBrief(taskToShowDetails.brief);
			setCategory(taskToShowDetails.category);
			setPriority(taskToShowDetails.priority);
			setStatus(taskToShowDetails.status);
			setEstimated(taskToShowDetails.estimated);
			setActual(taskToShowDetails.actualHours);
			setStartDate(
				taskToShowDetails.startDate
					? dayjs(taskToShowDetails.startDate)
					: null
			);
			setDueDate(
				taskToShowDetails.dueDate
					? dayjs(taskToShowDetails.dueDate)
					: null
			);
			setEndDate(
				taskToShowDetails.endDate
					? dayjs(taskToShowDetails.endDate)
					: null
			);
			setAssignee(taskToShowDetails.user?.username);
		}
	}, []);

	const handleUpdateTask = async (e) => {
		e.preventDefault();
		const user = membersData.find((member) => member.username === assignee);
		const taskModel = {
			id: taskId,
			taskName,
			brief,
			priority,
			category,
			estimated: estimated,
			actualHours: actual,
			startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
			dueDate: dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : null,
			endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
			status,
			project: { id: projectId },
			user: { id: user.userId },
		};
		try {
			await updateTask(taskModel);
			handleClose(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCloseDialog = () => {
		handleClose(false);
	};
	const handleDeleteFile = () => {};
	const handleComment = () => {};

	return (
		<div className="min-h-full !rounded-2xl">
			<form className="h-full" onSubmit={handleUpdateTask}>
				<div className="p-5 flex border-b-2 shadow-lg">
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
								{ priority === TaskPriority.HIGH ? (
									<ArrowUpward sx={{ color: "#f42858" }} />
								) : priority === TaskPriority.NORMAL ? (
									<ArrowForward sx={{ color: "#4488c5" }} />
								) : priority === TaskPriority.LOW ? (
									<ArrowDownward sx={{ color: "#5eb5a6" }} />
								) : "" }
								<Select
									required
									size="small"
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
							<div className="flex justify-end items-center gap-2">
								<p>Due on:</p>
								<span className="w-1/2">
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DatePicker
											size="small"
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
				<div className="grid grid-rows-4 grid-cols-3 h-full gap-y-2 gap-x-6 p-5">
					<div className="row-start-1 row-end-3 col-end-2 px-2 pt-2 pb-6 flex flex-col gap-3 border-b border-solid border-[#e5e7eb]">
						<div className="flex items-center gap-2">
							<Folder />
							<div className="font-extrabold text-xl">
								Task Brief
							</div>
						</div>
						<div className="">
							<CustomTextArea
								id=""
								placeholder="Type in task briefings..."
								value={brief}
								onChange={(e) => setBrief(e.target.value)}
								className="!w-1/3 !bg-[#F6F6F6] !rounded-[16px] !min-w-[100%]"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex justify-between items-center">
								<p>Estimated hours:</p>
								<p>{estimated} hrs</p>
							</div>
							<div className="flex justify-between items-center">
								<p>Actual hours:</p>
								<p className="flex justify-center items-center gap-1">
									<input
										type="text"
										className="w-8 text-center border-solid border-2 border-[#c4c4c4] outline-none rounded-[4px]"
										value={actual}
										onChange={(e) =>
											setActual(e.target.value)
										}
									/>
									<span>hrs</span>
								</p>
							</div>
							<div className="flex justify-between items-center">
								<p>Start date:</p>
								<div className="w-1/2">
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DatePicker
											size="small"
											slotProps={{
												textField: {
													size: "small",
													fullWidth: false,
												},
											}}
											value={startDate}
											onChange={(newValue) =>
												setStartDate(newValue)
											}
											format="DD/MM/YYYY"
											views={["day"]}
										/>
									</LocalizationProvider>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<p>Actual end date:</p>
								<div className="w-1/2">
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DatePicker
											size="small"
											slotProps={{
												textField: {
													size: "small",
													fullWidth: false,
												},
											}}
											id="endDate"
											value={endDate}
											onChange={(newValue) =>
												setEndDate(newValue)
											}
											format="DD/MM/YYYY"
											views={["day"]}
										/>
									</LocalizationProvider>
								</div>
							</div>
						</div>
					</div>
					<div className="row-start-3 row-end-5 col-end-2 flex flex-col gap-3 mt-4">
						<div className="flex items-center gap-2">
							<Flag />
							<div className="font-extrabold text-xl">
								Milestone
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-4 px-6">
								<div className="w-2 h-2 rounded-full bg-black"></div>
								<div>Current milestone info</div>
							</div>
							<div className="flex items-center px-6 gap-1">
								<p className="text-base font-extrabold text-[#8C8C8C]">
									Date:{" "}
								</p>
								<span>09/06/23 - 06/09/23</span>
							</div>
							<div className="flex px-6">
								<p className="text-base font-extrabold text-[#8C8C8C]">
									Description:{" "}
									<span className="font-normal text-black">
										Current milestone details Lorem ipsum
										dolor sit amet, consectetur adipiscing
										elit, sed do eiusmod tempor incididunt
										ut labore et.
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="row-span-2 col-span-2">
						<div className="flex items-center gap-2">
							<UploadFile />
							<div className="font-extrabold text-xl">Files</div>
						</div>
						<div className="mt-4 max-h-[220px] overflow-auto p-3">
							<table
								className="w-full table-auto border-collapse border-spacing-4 rounded-2xl"
								style={{
									boxShadow:
										"0px 3px 10px 0 rgba(0, 0, 0, 0.25)",
								}}
							>
								<thead>
									<tr className="border-b  border-[rgba(0, 0, 0, 0.12)] h-[52px]">
										<th className="w-[60%] text-left pl-4 text-base font-bold">
											File name
										</th>
										<th className="w-[25%] text-left text-base font-bold">
											Uploaded
										</th>
										<th className="w-[15%] text-center text-base font-bold">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-[rgba(0, 0, 0, 0.12)] h-[52px]">
										<td className="pl-4 text-base font-normal text-[#26BB98]">
											filename.exe
										</td>
										<td>6/9/2023</td>
										<td className="text-center">
											<IconButton
												className="!text-black"
												onClick={handleDeleteFile}
											>
												<Delete />
											</IconButton>
										</td>
									</tr>
									<tr
										className={`${
											index === 2
												? ""
												: "border-b border-slate-500"
										} h-[52px]`}
									>
										<td className="pl-4 text-base font-normal text-[#26BB98]">
											filename.exe
										</td>
										<td>6/9/2023</td>
										<td className="text-center">
											<IconButton
												className="!text-black"
												onClick={handleDeleteFile}
											>
												<Delete />
											</IconButton>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="mt-4 px-3">
							<Button
								fullWidth
								variant="contained"
								className="!bg-[#EAEAEA] !rounded-2xl !h-14 !py-2 !shadow-md !flex !items-center !gap-2"
							>
								<div>
									<Add className="!text-[40px] text-[#0E141A]" />
								</div>
								<div className="text-xl font-bold text-[#0E141A]">
									UPLOAD NEW FILES
								</div>
							</Button>
						</div>
					</div>
					<div className="row-span-2 col-span-2">
						<div className="flex items-center gap-2">
							<Notes />
							<div className="font-extrabold text-xl">
								Comments
							</div>
						</div>
						<div className="flex flex-col gap-4 mt-4">
							<div className="flex gap-4 items-center py-2 px-4">
								<div className="grid justify-items-end w-[5%]">
									{currentMember.pic ? (
										<span>
											<img
												src={`${API_INSTANCE.BASE_URL}/auth/image/${currentMember.pic}`}
												className="rounded-full max-h-32 aspect-square object-cover m-0"
												alt="Profile pic of member"
											/>
										</span>
									) : (
										<Avatar className="rounded-full max-h-32 aspect-square object-cover !m-0">
											{currentMember?.username?.charAt(0)}
										</Avatar>
									)}
								</div>
								<div className="text-base font-normal text-[#0E141A] w-[75%] text-ellipsis line-clamp-3">
									Comment content Lorem ipsum dolor sit amet,
									consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna
									aliqua. Ut enim ad minim veniam, quis
									nostrud exercitation ullamco laboris nisi ut
									aliquip ex ea commodo consequat.ted hours:{" "}
								</div>
								<div className="text-sm font-normal text-[#8C8C8C] ml-4">
									09:41 09/06
								</div>
							</div>
							<div className="flex gap-4 items-center py-2 px-4">
								<div className="grid justify-items-end w-[5%]">
									{currentMember.pic ? (
										<span>
											<img
												src={`${API_INSTANCE.BASE_URL}/auth/image/${currentMember.pic}`}
												className="rounded-full max-h-32 aspect-square object-cover m-0"
												alt="Profile pic of member"
											/>
										</span>
									) : (
										<Avatar className="rounded-full max-h-32 aspect-square object-cover !m-0">
											{currentMember?.username?.charAt(0)}
										</Avatar>
									)}
								</div>
								<div className="text-base font-normal text-[#0E141A] w-[75%] text-ellipsis line-clamp-3">
									Comment content Lorem ipsum dolor sit amet,
									consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna
									aliqua. Ut enim ad minim veniam, quis
									nostrud exercitation ullamco laboris nisi ut
									aliquip ex ea commodo consequat.ted hours:{" "}
								</div>
								<div className="text-sm font-normal text-[#8C8C8C] ml-4">
									09:41 09/06
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3 mt-4">
							<CustomTextArea
								id=""
								placeholder="Write a comment, use @ to mention..."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								className="w-[90%] !rounded-lg"
							/>
							<IconButton
								className="!text-black"
								onClick={handleComment}
							>
								<Send />
							</IconButton>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-6 pl-5 pb-5 pr-8">
					<div>
						<Button
							variant="contained"
							className="!bg-[#EAEAEA] !rounded-2xl !h-12 !py-2 !px-5 !shadow-md"
							onClick={handleCloseDialog}
						>
							<span className="text-base font-extrabold text-[#0E141A]">
								CANCEL
							</span>
						</Button>
					</div>
					<div>
						<Button
							variant="contained"
							className="!bg-[#26BB98] !rounded-2xl !h-12 !py-2 !px-5 !shadow-md"
							type="submit"
						>
							<span className="text-base font-extrabold text-white">
								CONFIRM
							</span>
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TaskDetailForm;
