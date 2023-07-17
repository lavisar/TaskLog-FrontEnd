import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useGetTasksQuery, useGetAllMembersDetailsQuery, useGetTasksByProjectQuery } from "../../store";
import { Button, Dialog } from "@mui/material";
import { TaskList } from "./components/TaskList";
import { TaskColumn } from "./components/TaskColumn";
import AddTaskForm from "./components/AddTaskForm";
import TaskDetailForm from "./components/TaskDetailForm";
import { Add, ViewColumn, ViewList } from "@mui/icons-material";

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
	
	const handleOpen = () => {
		setOpen(true);
	}

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
								className="!rounded-2xl !bg-white"
								sx={{ boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.25);"}}
								variant="contained"
								onClick={() => {
									setIsCreateNew(true);
									setOpen(true);
								}}
							>
								<span className="font-extrabold text-2xl flex items-center gap-4 text-black"><Add className="!text-4xl" /> NEW TASK</span>
							</Button>
							<div className="flex gap-2">
								<Button
									variant="contained"
									disabled={!showAsList}
									className={`!rounded-2xl !text-black !text-2xl !font-normal ${!showAsList ? "!bg-[#0CF0BB]" : "!bg-white"}`}
									sx={{ boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.25) !important;"}}
									onClick={handleShowType}
								>
									<span className="flex items-center gap-4"><ViewColumn className="!text-[40px]" /> COLUMNS</span>
								</Button>
								<Button
									variant="contained"
									disabled={showAsList}
									className={`!rounded-2xl !text-black !text-2xl !font-normal ${showAsList ? "!bg-[#0CF0BB]" : "!bg-white"}`}
									sx={{ boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.25) !important;"}}
									onClick={handleShowType}
								>
									<span className="flex items-center gap-4"><ViewList className="!text-[40px]" /> LISTS</span>
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
