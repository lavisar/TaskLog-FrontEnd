import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useGetTasksQuery, useGetAllMembersDetailsQuery, useGetTasksByProjectQuery } from "../../store";
import { Button, Dialog } from "@mui/material";
import { TaskList } from "./components/TaskList";
import { TaskColumn } from "./components/TaskColumn";
import AddTaskForm from "./components/AddTaskForm";
import TaskDetailForm from "./components/TaskDetailForm";

function TaskBoard() {
	const teamSelect = useSelector((state) => state.team.id);
	const {search} = useLocation();
	const projectId = search.split("=")[1];
	const { data, isLoading, err } = useGetTasksByProjectQuery(projectId);
	const { data: membersData } = useGetAllMembersDetailsQuery(teamSelect);

	const [open, setOpen] = useState(false);
	const [showAsList, setShowAsList] = useState(true);
	const [isCreateNew, setIsCreateNew] = useState(false);
	const handleClickOpen = () => {
		setIsCreateNew(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleShowType = () => {
		setShowAsList(!showAsList);
	};

	return (
		<>
			<div className="container mx-auto">
				<div className="flex">
					<div className="w-full">
						<div className="flex justify-between">
							<Button
								variant="contained"
								onClick={() => {
									setIsCreateNew(true);
									setOpen(true);
								}}
							>
								+ NEW TASK
							</Button>
							<div className="flex gap-2">
								<Button
									variant="contained"
									disabled={!showAsList}
									onClick={handleShowType}
								>
									COLUMNS
								</Button>
								<Button
									variant="contained"
									disabled={showAsList}
									onClick={handleShowType}
								>
									LISTS
								</Button>
							</div>
						</div>
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
							{isCreateNew ? (
								<AddTaskForm
									props={{
										data,
										membersData,
										handleClose,
									}}
								/>
							) : (
								<TaskDetailForm
									props={{
										data,
										membersData,
										handleClose,
									}}
								/>
							)}
						</Dialog>
					</div>
				</div>
				{showAsList ? (
					<TaskList
						taskLst={{
							data,
							membersData,
							isLoading,
							err,
							handleClickOpen,
						}}
					/>
				) : (
					<TaskColumn />
				)}
			</div>
		</>
	);
}

export default TaskBoard;
