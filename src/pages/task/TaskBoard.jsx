import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks, useGetTasksQuery } from "../../store";
import { Box, Button, Card, Dialog, TextField } from "@mui/material";
import { CustomTextArea } from "../../components/CustomTextArea";
import { LoadingButton } from "@mui/lab";

function TaskBoard() {
	const dispatch = useDispatch();
	const { data, isLoading, err } = useGetTasksQuery();
	data && dispatch(setTasks([...data]));

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {};
	const toolbarHeight = 45;

	return (
		<>
			<div className="flex">
				<div>
					<Button variant="contained" onClick={handleClickOpen}>
						+ NEW TASK
					</Button>
					<Dialog
						fullWidth
						maxWidth={550}
						open={open}
						onClose={handleClose}
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
									top: toolbarHeight / -2,
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
											id="taskName"
											type="text"
											label="Task Name"
											// ref={emailRef}
											// value={email}
											// onChange={
											// 	(e) =>
											// 	dispatch(
											// 		changeEmail(e.target.value)
											// 	)
											// }
											autoComplete="off"
											className="w-full"
										/>
									</div>

									<div className="p-4">
										<TextField
											required
											id="category"
											label="Category"
											// value={username}
											// onChange={(e) =>
											// 	dispatch(
											// 		changeUsername(
											// 			e.target.value
											// 		)
											// 	)
											// }
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
											// value={password}
											// onChange={(e) =>
											// 	dispatch(
											// 		changePassword(
											// 			e.target.value
											// 		)
											// 	)
											// }
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
											// value={confirmPwd}
											// onChange={(e) =>
											// 	setConfirmPwd(e.target.value)
											// }
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
											// value={confirmPwd}
											// onChange={(e) =>
											// 	setConfirmPwd(e.target.value)
											// }
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
											// value={confirmPwd}
											// onChange={(e) =>
											// 	setConfirmPwd(e.target.value)
											// }
											autoComplete="off"
											className="w-full"
										/>
									</div>

									<div className="p-4">
										<CustomTextArea
											id="brief"
											placeholder="Type in task briefings..."
											// value={bio}
											// onChange={(e) =>
											// 	dispatch(
											// 		changeBio(e.target.value)
											// 	)
											// }
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
											loading={isLoading}
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
