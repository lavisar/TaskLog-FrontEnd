import {
	ArrowDownward,
	ArrowForward,
	ArrowUpward,
	MoreVert,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	TaskPriority,
	TaskStatus,
} from "../../../store/constants/TaskConstant";
import { setShowTaskDetails } from "../../../store";
import dayjs from "dayjs";

function FilerTaskByStatus({ rowProp }) {
	const dispatch = useDispatch();
	const { status, handleOpen } = rowProp;
	const [rows, setRows] = useState([]);
	useEffect(() => {
		const rowConfig = status.map((row, index) => {
			return {
				id: row.id,
				task: row.taskName,
				priority: row.priority,
				category: row.category,
				dueDate: row.dueDate,
			};
		});
		setRows(rowConfig);
	}, [status]);

	const columns = [
		{
			field: "id",
			headerName: "",
		},
		{
			field: "task",
			headerName: "Task",
			flex: 0.9,
		},
		{
			field: "priority",
			headerName: "Priority",
			flex: 0.5,
			renderCell: (cell) => {
				switch (cell.value) {
					case TaskPriority.HIGH:
						return <ArrowUpward sx={{ color: "#f42858" }} />;
					case TaskPriority.NORMAL:
						return <ArrowForward sx={{ color: "#4488c5" }} />;
					default:
						return <ArrowDownward sx={{ color: "#5eb5a6" }} />;
				}
			},
		},
		{
			field: "category",
			headerName: "Category",
			flex: 0.5,
		},
		{
			field: "dueDate",
			headerName: "Due Date",
			flex: 0.5,
			renderCell: (cell) => {
				return dayjs(cell.value).format("DD/MM/YYYY");
			},
		},
	];

	const setStatusColor = (status) => {
		switch (status) {
			case TaskStatus.INPROGRESS:
				return "#FFBA49";
			case TaskStatus.RESOLVED:
				return "#BB2649";
			case TaskStatus.CLOSED:
				return "#8C8C8C";
			case TaskStatus.OPEN:
				return "#26BB98";
			default:
				return "#26BB98";		
		}
	};

	const handleRowClick = (taskId) => {
		const taskRow = status.find((dataRow) => dataRow.id === taskId);
		dispatch(setShowTaskDetails(taskRow));
		handleOpen(true);
	};

	return (
		<div
			className={`flex flex-col shadow-md shadow-[#00000033] bg-white !rounded-[16px]`}
		>
			<div
				className={`flex items-center gap-10 h-20 border-b-2 border-solid`}
				style={{ borderBottomColor: `${setStatusColor(status[0].status)}` }}
			>
				<p className="pl-5 text-2xl font-extrabold">
					{status[0].status}
				</p>
				<div
					className={`w-[60px] h-[40px] rounded-[28px] flex justify-center items-center bg-[${setStatusColor(
						status[0].status
					)}] text-xl font-black`}
				>
					{status.length}
				</div>
			</div>
			<div className="mx-3">
				<DataGrid
					rows={rows}
					columns={columns}
					className="!border-none"
					sx={{
						width: "100%",
						"& .MuiDataGrid-columnHeader:focus": {
							outline: "none",
						},
						"& .MuiDataGrid-row": { cursor: "pointer" },
						"& .MuiDataGrid-cell:focus": {
							outline: "none",
						},
					}}
					hideFooter
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					disableColumnFilter
					rowSelection={false}
					disableRowSelectionOnClick
					disableColumnSelector
					disableDensitySelector
					disableColumnMenu
					columnVisibilityModel={{
						id: false,
					}}
					onRowClick={(param) => handleRowClick(param.row.id)}
				/>
			</div>
		</div>
	);
}

export default FilerTaskByStatus;
