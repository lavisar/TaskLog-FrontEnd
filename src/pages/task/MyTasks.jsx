import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetTaskByUserQuery } from "../../store";
import LoadingBackdrop from "./components/LoadingBackdrop";
import FilerTaskByStatus from "./components/FilterTaskByStatus";
import { TaskStatus } from "../../store/constants/TaskConstant";

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

	const [doingTasks, setDoingTasks] = useState([]);
	const [openTasks, setOpenTasks] = useState([]);
	const [resolvedTasks, setResolvedTasks] = useState([]);
	const [closedTasks, setClosedTasks] = useState([]);

	useEffect(() => {
		setDoingTasks(filerByStatus(TaskStatus.INPROGRESS, lstTask));
		setOpenTasks(filerByStatus(TaskStatus.OPEN, lstTask));
		setResolvedTasks(filerByStatus(TaskStatus.RESOLVED, lstTask));
		setClosedTasks(filerByStatus(TaskStatus.CLOSED, lstTask));
	}, []);

	return (
		<>
			{isGetting ? (
				<LoadingBackdrop props={{ isGetting, isGettingSuccess }} />
			) : (
				<div className="container mx-auto">
					<div className="flex flex-col">
						{/* {aaa().map((task, index) => (
							<div key={index}>
								<div>{task.status}</div>
								<div>{resolvedTasks?.length}</div>
							</div>
						))} */}
                        <FilerTaskByStatus />
					</div>
				</div>
			)}
		</>
	);
}

export default MyTasks;
