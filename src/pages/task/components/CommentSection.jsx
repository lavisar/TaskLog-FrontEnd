import { Send } from "@mui/icons-material";
import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomTextArea } from "../../../components/CustomTextArea";
import {
	useCreateCommentMutation,
	useDeleteCommentByIdMutation,
	useGetCommentsByTaskIdQuery,
} from "../../../store";
import { API_INSTANCE } from "../../../store/apis/features/apisConst";

export const CommentSection = ({ taskId }) => {
	const { currentTask } = taskId;
	const currentMember = useSelector((state) => state.currentMember);
	const { data, isLoading, err } = useGetCommentsByTaskIdQuery(currentTask);
	const [deleteCommentById] = useDeleteCommentByIdMutation();
	const [uploadComment] = useCreateCommentMutation();
	const [comment, setComment] = useState("");
	const [contextMenu, setContextMenu] = React.useState(null);

	// handle context menu
	const handleContextMenu = (event) => {
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

	const handleDelete = (event) => {
		const commentId = event.currentTarget.getAttribute("data-comment-id");
		console.log("delete comment with ID: ", commentId);
		setContextMenu(null);
	};
	const handleUpdate = (event) => {
		const commentId = event.currentTarget.getAttribute("data-comment-id");
		console.log("update comment with ID: ", commentId);
		setContextMenu(null);
	};

	return (
		<>
			{/* comment list */}
			<div className="flex flex-col gap-4 mt-4 h-[200px] overflow-y-scroll">
				{data ? (
					data.map((item) => (
						<div
							className="flex gap-4 items-center pb-[8px] pl-[15px] rounded-l-lg shadow-md shadow-[#00000033] bg-white"
							onContextMenu={handleContextMenu}
							style={{ cursor: "context-menu" }}
							data-comment-id={item.id}
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
							<div className="hidden">{item.id}</div>
							<div className="text-base font-normal text-[#0E141A] w-[75%] text-ellipsis line-clamp-3">
								{item.comment}
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
				<MenuItem onClick={handleUpdate}>Edit</MenuItem>
				<MenuItem onClick={handleDelete}>Delete</MenuItem>
			</Menu>
		</>
	);
};
