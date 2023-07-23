import { Send } from "@mui/icons-material";
import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Modal,
	Typography,
	Button,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomTextArea } from "../../../components/CustomTextArea";
import {
	useCreateCommentMutation,
	useDeleteCommentByIdMutation,
	useGetCommentsByTaskIdQuery,
	useUpdateCommentMutation,
} from "../../../store";
import { API_INSTANCE } from "../../../store/apis/features/apisConst";
import CheckIcon from "@mui/icons-material/Check";

export const CommentSection = ({ taskId }) => {
	const { currentTask } = taskId;
	const currentMember = useSelector((state) => state.currentMember);
	const { data, isLoading, err } = useGetCommentsByTaskIdQuery(currentTask);
	const [deleteCommentById] = useDeleteCommentByIdMutation();
	const [uploadComment] = useCreateCommentMutation();
	const [updateComment] = useUpdateCommentMutation();
	const [comment, setComment] = useState("");
	const [contextMenu, setContextMenu] = React.useState(null);
	const [contextId, setContextId] = React.useState(null);
	const [flag, setFlag] = React.useState();
	const [updatedComment, setUpdatedComment] = React.useState("");
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	// handle update comment
	const handleCommentChange = (event) => {
		const value = event.target.value;
		const defaultValue = event.target.defaultValue;
		if (value === "") {
			setUpdatedComment(defaultValue);
		} else {
			setUpdatedComment(value);
		}
	};
	const handleCheckClick = () => {
		setFlag(false);
		handleUpdateComment();
	};
	const handleUpdateComment = async () => {
		console.log("running update comment...");
		console.log("comment Id: " + contextId);
		console.log("task id:", taskId);
		console.log("changed value: " + updatedComment);
		const commentModel = {
			id: contextId,
			taskId: currentTask,
			comment: updatedComment,
		};
		try {
			await updateComment(commentModel);
		} catch (error) {
			console.log(error);
		}
	};

	// handle context menu
	const handleContextMenu = (event, selectId) => {
		console.log("event", event);
		console.log("selectId", selectId);
		setContextId(selectId);

		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
				  }
				: null
		);
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	function formatDateTime(datetime) {
		const dateTimeObj = new Date(datetime);
		const timeString = dateTimeObj.toLocaleTimeString("en-US", {
			hour12: false,
			hour: "numeric",
			minute: "numeric",
		});
		const dateString = dateTimeObj
			.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
			.replace(/\//g, "/");
		return `${timeString} ${dateString}`;
	}

	const handleComment = async () => {
		console.log("Running Add new comment...");
		const formData = new FormData();
		const taskId = currentTask;
		const memberId = currentMember.userId;
		const commentData = comment;
		const commentModel = {
			comment: commentData,
		};
		const commentJson = JSON.stringify(commentModel);
		const commentBlob = new Blob([commentJson], {
			type: "application/json",
		});
		formData.append("taskId ", taskId);
		formData.append("userId ", memberId);
		formData.append("comment", commentBlob);
		try {
			if (commentData.trim() === "") {
				console.log("missing comment");
				return;
			}
			await uploadComment(formData);
			setComment("");
		} catch (error) {
			console.log("Error uploading comment", error);
		}
	};

	const handleDelete = async (id) => {
		console.log("delete comment with ID: ", id);
		setContextMenu(null);
		try {
			const result = await deleteCommentById(id);

			console.log(result);
			if (result?.error.originalStatus === 200) {
				return;
			}
		} catch (error) {
			console.error("error", error);
		}
	};
	const handleUpdate = (id) => {
		console.log("update comment with ID: ", id);
		setFlag(id);
		setContextMenu(null);
	};
	const handleDeleteConfirmed = async () => {
		handleCloseModal();
		handleDelete(contextId);
	};
	const handleMenuItemClick = (option) => {
		const selectedComment = contextId;
		switch (option) {
			case "Edit":
				handleUpdate(selectedComment);
				break;
			case "Delete":
				handleOpenModal();
				break;
			default:
				break;
		}
	};

	return (
		<>
			{/* comment list */}
			<div className="flex flex-col gap-4 mt-4 h-[200px] overflow-y-scroll scrollbar-hide">
				{data ? (
					data.map((item, index) => (
						<div
							key={index}
							className="flex gap-4 items-center pb-[8px] pl-[15px] rounded-l-lg shadow-md shadow-[#00000033] bg-white"
							onContextMenu={(e) => handleContextMenu(e, item.id)}
							style={{ cursor: "context-menu" }}
						>
							<div className="grid justify-items-end w-[5%]">
								{currentMember.pic ? (
									<span>
										<img
											src={`${API_INSTANCE.BASE_URL}/auth/image/${item.createdBy}.jpg`}
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
								{flag === item.id ? (
									<div className="flex">
										<TextField
											defaultValue={item.comment}
											fullWidth
											InputProps={{
												sx: { borderRadius: "50px" },
											}}
											size="small"
											onChange={handleCommentChange}
										/>
										<IconButton
											className="text-black"
											onClick={handleCheckClick}
										>
											<CheckIcon />
										</IconButton>
									</div>
								) : (
									item.comment
								)}
							</div>
							<div className="text-sm font-normal text-[#8C8C8C] ml-4">
								{formatDateTime(item.createAt)}
							</div>
						</div>
					))
				) : (
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</Box>
				)}
			</div>
			{/* comment input */}
			<div className="flex items-center gap-3 mt-4 absolute w-[64%]">
				<CustomTextArea
					id=""
					placeholder="Write a comment..."
					className="w-[90%] !rounded-lg"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<IconButton className="!text-black" onClick={handleComment}>
					<Send />
				</IconButton>
			</div>
			{/* Context menu */}
			<Menu
				open={contextMenu !== null}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? { top: contextMenu.mouseY, left: contextMenu.mouseX }
						: undefined
				}
			>
				<MenuItem onClick={() => handleMenuItemClick("Edit")}>
					Edit
				</MenuItem>
				<MenuItem onClick={() => handleMenuItemClick("Delete")}>
					Delete
				</MenuItem>
			</Menu>
			<Modal open={showModal} onClose={handleCloseModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 500,
						bgcolor: "background.paper",
						borderRadius: "20px",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant="h6" className="text-center">
						Do you want to delete this comment?
					</Typography>
					<Box className="flex mt-5 items-center justify-between">
						<Button
							variant="contained"
							color="error"
							onClick={() => handleDeleteConfirmed()}
						>
							Delete
						</Button>
						<Button onClick={handleCloseModal}>Cancel</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};
