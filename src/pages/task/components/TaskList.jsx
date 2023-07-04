import { useEffect, useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
    Typography,
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
	const [options, setOptions] = useState([""]);

	useEffect(() => {
		if (membersData) {
			setOptions([
				...options,
				...membersData?.map((member) => member.username),
			]);
		}
		if (data) {
			const rowConfig = data.map((row, index) => {
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
			setRows(rowConfig);
		}
	}, [membersData, data]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			flex: 1,
			renderCell: (row) => <div className="text-center">{row.id}</div>,
		},
		{ field: "taskName", headerName: "Task", flex: 2 },
		{ field: "priority", headerName: "Priority", flex: 1 },
		{ field: "category", headerName: "Category", flex: 1 },
		{ field: "dueDate", headerName: "Due Date", flex: 1 },
		{ field: "assignee", headerName: "Assignee", flex: 1 },
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (param) => (
				<Box component="Typography" className="flex justify-center items-center p-1 w-[150px] bg-[#26BB98] !rounded-[16px]">
                    <Typography color={'#fff'} fontWeight={500}>{param.value}</Typography>
                </Box>
			),
            
		},
	];

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
					<div
						className="mt-6"
						style={{ height: 400, width: "100%" }}
					>
						<DataGrid
							className="shadow-md shadow-[#00000033] bg-white !rounded-[16px] pl-4"
							sx={{ width: "100%" }}
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
							loading={isLoading}
							disableColumnFilter
							rowSelection={false}
							disableRowSelectionOnClick
							disableColumnSelector
							disableDensitySelector
							disableColumnMenu
						/>
					</div>
				</div>
			</div>
		</>
	);
};
