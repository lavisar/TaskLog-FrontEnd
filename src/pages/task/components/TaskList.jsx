import { useEffect, useState } from "react";
import {
	Autocomplete,
	Button,
	FormControl,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import {
	TaskPriority,
	TaskCategory,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const TaskList = ({ taskLst }) => {
	const { data, membersData, isLoading, err } = taskLst;
	const [category, setCategory] = useState("");
	const [priority, setPriority] = useState("");
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");

	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([]);
	const [options, setOptions] = useState([""]);

	const config = [
		{
			field: "id",
			headerName: "ID",
			flex: 1,
			renderCell: (row) => (
				<div className="text-center">{row.id}</div>
			)
		},
		{
			field: "taskName",
			headerName: "Task",
			flex: 2,
		},
		{ field: "priority", headerName: "Priority", flex: 1 },
		{ field: "category", headerName: "Category", flex: 1 },
		{
			field: "dueDate",
			headerName: "Due Date",
			flex: 1,
		},
		{
			field: "assignee",
			headerName: "Assignee",
			flex: 1,
		},
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (param) => (
				<Button variant="outlined" className="text-red-500 !rounded-full">{param.value}</Button>
			)
		},
	];

	useEffect(() => {
		if (membersData) {
			setOptions([
				...options,
				...membersData?.map((member) => member.username),
			]);
		}
		if (data) {
			const newRow = data.map((row, index) => {
				return {
					id: index + 1,
					taskName: row.taskName,
					priority: row.priority,
					category: row.category,
					dueDate: row.dueDate,
					assignee: row.user.username,
					status: row.status,
				};
			});
			setRows(newRow);
			const newColumn = config.map((cell) => {
				return {
					field: cell.field,
					headerName: cell.headerName,
					flex: cell.flex,
					valueGetter: cell.valueGetter,
					renderCell: cell.renderCell
				};
			});
			setColumns(newColumn);
		}
	}, [membersData, data]);

	return (
		<>
			<div className="mt-6">
				<div className="flex flex-row gap-2">
					<div className="w-52">
						<FormControl fullWidth size="small">
							<InputLabel id="categoryLabelId">
								Category
							</InputLabel>
							<Select
								labelId="categoryLabelId"
								className="w-full"
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								label="Category"
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
						</FormControl>
					</div>
					<div className="w-52">
						<FormControl fullWidth size="small">
							<InputLabel id="priorityLabelId">
								Priority
							</InputLabel>
							<Select
								labelId="priorityLabelId"
								className="w-full"
								id="priority"
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
								label="Priority"
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
						</FormControl>
					</div>
					<div className="w-52">
						<Autocomplete
							size="small"
							fullWidth
							disablePortal
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
								<TextField {...params} label="Assignee" />
							)}
						/>
					</div>
				</div>
				<div>
					{/* {isLoading ? (
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
					)} */}

					<div
						className="mt-6"
						style={{ height: 400, width: "100%" }}
					>
						<DataGrid
							sx={{ width: "100%" }}
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
