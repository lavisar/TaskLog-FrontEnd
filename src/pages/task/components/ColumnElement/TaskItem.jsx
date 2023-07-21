import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { setShowTaskDetails } from "../../../../store";
import {
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../../../store/constants/TaskConstant";
import ErrorIcon from "@mui/icons-material/Error";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { API_INSTANCE } from "../../../../store/apis/features/apisConst";

function priorityIconColor(string) {
	if (string === "HIGH") {
		return "#BB2649";
	}
	if (string === "NORMAL") {
		return "#FFBA49";
	}
	if (string === "LOW") {
		return "#26BB98";
	}
}

export const TaskItem = ({ task, index, handleRowClick }) => (
	<Draggable key={task.id} draggableId={task.id} index={index}>
		{(provided) => (
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0 shadow-md shadow-[#00000033] flex"
				onClick={() => handleRowClick(task.id)}
			>
				{/* left item */}
				<div className="w-[80%]">
					<h5 className="text-md text-lg leading-6">
						{task.taskName}
					</h5>

					<p className="text-xs py-[20px]">
						Category:{" "}
						<span className="font-bold">{task.category}</span>
					</p>
					<p className="text-xs">
						Due on:{" "}
						<span className="font-bold">
							{new Date(task.dueDate).toLocaleDateString("en-GB")}
						</span>
					</p>
				</div>
				{/* right item */}
				<div className="w-[20%] text-center">
					{/* avt assignee */}
					<img
						src={`${API_INSTANCE.BASE_URL}/auth/image/${task.pic}`}
						className="rounded-full w-[35px] h-[35px] aspect-square object-cover ml-[6px] mb-[10px] "
						alt="pic of member"
						title={task.assignee}
					/>

					<div>
						{/* priority */}
						<ErrorIcon
							style={{
								color: `${priorityIconColor(task.priority)}`,
							}}
						/>
					</div>
					<div className="pt-[10px]">
						<MoreVertIcon />
					</div>
				</div>
			</div>
		)}
	</Draggable>
);
