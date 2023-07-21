import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { setShowTaskDetails } from "../../../../store";
import {
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../../../store/constants/TaskConstant";
import { TaskItem } from "./TaskItem";

function color(statusValue) {
	if (statusValue === "OPEN") {
		return "from-[#FFFFFF00] to-[#26BB98]";
	}
	if (statusValue === "IN PROGRESS") {
		return "from-[#FFFFFF00] to-[#FFBA49]";
	}
	if (statusValue === "RESOLVED") {
		return "from-[#FFFFFF00] to-[#BB2649]";
	}
	if (statusValue === "CLOSED") {
		return "from-[#FFFFFF00] to-[#8C8C8C]";
	}
}
export const TaskStatusColumn = ({ statusValue, tasks, handleRowClick }) => (
	<div key={statusValue} className="flex-1 !w-[300px] bg-gray-100 ">
		<div className="rounded-md shadow-md flex flex-col relative overflow-hidden">
			<h4 className="px-[20px]">
				<span className="text-gray-600" style={{ fontSize: "20px" }}>
					{statusValue}
				</span>
			</h4>
			<span
				className={`w-full h-[8px] bg-gradient-to-b inset-x-0 top-0
					${color(statusValue)}`}
			></span>
			<div
				className="overflow-y-auto overflow-x-hidden h-auto scrollbar-hide"
				style={{ maxHeight: "calc(100vh - 250px)" }}
			>
				<Droppable droppableId={statusValue.toString()}>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="mt-4 p-2 rounded-lg"
						>
							{/* Các mục công việc */}
							{tasks
								.filter((task) => task.status === statusValue)
								.map((task, index) => (
									<TaskItem
										key={task.id}
										task={task}
										index={index}
										handleRowClick={handleRowClick}
									/>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	</div>
);
