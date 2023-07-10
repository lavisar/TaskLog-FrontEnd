import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Autocomplete,
	Box,
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
import { setShowTaskDetails } from "../../../store";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDownward, ArrowForward, ArrowUpward } from "@mui/icons-material";

export const TaskList = ({ taskLst }) => {
	const dispatch = useDispatch();
	const { data, membersData, isLoading, handleClickOpen } = taskLst;
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
	const [assignee, setAssignee] = useState("");
	const [inputValue, setInputValue] = useState("");

	const [rows, setRows] = useState([]);
	const [options, setOptions] = useState([""]);

	useEffect(() => {
		if (membersData) {
			setOptions([...membersData?.map((member) => member.username)]);
		}
		if (data) {
			const rowConfig = data.map((row, index) => {
				return {
					id: index + 1,
					taskId: row.id,
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
	}, [data, membersData]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			flex: 1,
			renderCell: (row) => <div className="text-center">{row.id}</div>,
		},
		{ field: "taskId", headerName: "taskId", flex: 2 },
		{ field: "taskName", headerName: "Task", flex: 2 },
		{ 
			field: "priority", 
			headerName: "Priority", 
			flex: 1,
			renderCell: (cell) => {
				switch(cell.value) {
					case TaskPriority.HIGH:
						return <ArrowUpward sx={{color: "#f42858"}} />
					case TaskPriority.NORMAL: 
						return <ArrowForward sx={{color: "#4488c5"}} />
					default: 
						return <ArrowDownward sx={{color: "#5eb5a6"}} />
				}
			}  
		},
		{ field: "category", headerName: "Category", flex: 1 },
		{ field: "dueDate", headerName: "Due Date", flex: 1 },
		{ field: "assignee", headerName: "Assignee", flex: 1 },
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (param) => (
				<Box
					className={`flex justify-center items-center p-1 w-[150px] ${setStatusColor(param.value)} !rounded-[16px]`}
				>
					<Typography color={"#fff"} fontWeight={500}>
						{param.value}
					</Typography>
				</Box>
			),
		},
	];

	const setStatusColor = (status) => {
		switch (status) {
			case TaskStatus.INPROGRESS:
				return "bg-[#FFBA49]";
			case TaskStatus.RESOLVED:
				return "bg-[#BB2649]";
			case TaskStatus.CLOSED:
				return "bg-[#8C8C8C]";
			default:
				return "bg-[#26BB98]";
		}
	};

	const handleRowClick = (taskId) => {
		const taskRow = data.find((dataRow) => dataRow.id === taskId);
		dispatch(setShowTaskDetails(taskRow));
		handleClickOpen(true);
	};

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
							<InputLabel id="statusLabelId">Status</InputLabel>
							<Select
								labelId="statusLabelId"
								className="w-full"
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								label="Status"
							>
								<MenuItem value={TaskStatus.OPEN}>
									OPEN
								</MenuItem>
								<MenuItem value={TaskStatus.INPROGRESS}>
									INPROGRESS
								</MenuItem>
								<MenuItem value={TaskStatus.RESOLVED}>
									RESOLVED
								</MenuItem>
								<MenuItem value={TaskStatus.CLOSED}>
									CLOSED
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
							isOptionEqualToValue={(option, value) =>
								option.value === value.value
							}
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
							sx={{
								width: "100%",
								"& .MuiDataGrid-row": { cursor: "pointer" },
								"& .MuiDataGrid-cell:focus": {
									outline: "none",
								},
							}}
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
							columnVisibilityModel={{
								taskId: false,
							}}
							onRowClick={(params) =>
								handleRowClick(params.row.taskId)
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
