import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllMembersDetailsQuery, useGetTaskByUserQuery } from "../../store";
import LoadingBackdrop from "./components/LoadingBackdrop";
import FilerTaskByStatus from "./components/FilterTaskByStatus";
import { TaskStatus } from "../../store/constants/TaskConstant";
import { Dialog } from "@mui/material";
import TaskDetailForm from "./components/TaskDetailForm";

function filerByStatus(status, allTasks) {
	const arr = allTasks?.filter((task) => task.status === status);
	return arr;
}

function MyTasks() {
	const { userId } = useParams();
	const {
		data: lstTask,
		isError: isGetFail,
		isSuccess: isGettingSuccess,
		isLoading: isGetting,
	} = useGetTaskByUserQuery(userId);
	const teamSelect = useSelector((state) => state.team.id);
	const { data: membersData } = useGetAllMembersDetailsQuery(teamSelect);

	// const [doingTasks, setDoingTasks] = useState([]);
	// const [openTasks, setOpenTasks] = useState([]);
	// const [resolvedTasks, setResolvedTasks] = useState([]);
	// const [closedTasks, setClosedTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	
	const handleOpen = () => {
		setOpen(true);
	}

	useEffect(() => {
		setFilteredTasks(lstTask);
	}, [lstTask]);

	const filterTasksByStatus = (status) => {
		return filteredTasks?.filter((task) => task.status === status);
	};

	// Danh sách các task theo từng status
	const openTasks = filterTasksByStatus(TaskStatus.OPEN);
	const doingTasks = filterTasksByStatus(TaskStatus.INPROGRESS);
	const resolvedTasks = filterTasksByStatus(TaskStatus.RESOLVED);
	const closedTasks = filterTasksByStatus(TaskStatus.CLOSED);

	return (
		<>
			{isGetting ? (
				<LoadingBackdrop props={{ isGetting, isGettingSuccess }} />
			) : (
				<div className="container mx-auto">
					<div className="flex flex-col gap-5">
						{doingTasks?.length > 0 ? (
							<FilerTaskByStatus rowProp={{status: doingTasks, handleOpen}} />
						) : (
							""
						)}
						{openTasks?.length > 0 ? (
							<FilerTaskByStatus rowProp={{status: openTasks, handleOpen}} />
						) : (
							""
						)}
						{resolvedTasks?.length > 0 ? (
							<FilerTaskByStatus rowProp={{status: resolvedTasks, handleOpen}} />
						) : (
							""
						)}
						{closedTasks?.length > 0 ? (
							<FilerTaskByStatus rowProp={{status: closedTasks, handleOpen}} />
						) : (
							""
						)}
					</div>
				</div>
			)}
			<Dialog
				className="w-screen rounded-2xl"
				fullWidth={true}
				maxWidth={"lg"}
				open={open}
				onClose={handleClose}
				sx={{
					overflow: "auto",
				}}
			>
				<TaskDetailForm
					props={{
						membersData,
						handleClose,
					}}
				/>
			</Dialog>
		</>
	);
}

export default MyTasks;
