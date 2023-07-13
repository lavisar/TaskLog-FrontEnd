import { MoreVert } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TaskStatus } from "../../../store/constants/TaskConstant";

function FilerTaskByStatus({rowProp}) {
	const {status, handleOpen} = rowProp;
	const [rows, setRows] = useState([]);
	useEffect(() => {
		const rowConfig = status.map((row, index) => {
			return {
				id: index + 1,
				task: row.taskName,
				priority: row.priority,
				category: row.category,
				dueDate: row.dueDate,
				action: "",
			}
		})
		setRows(rowConfig);
	}, [rowProp])
	// const rows = [
	// 	{
	// 		id: "xxx",
	// 		task: "TASK_001",
	// 		priority: "HIGH",
	// 		category: "Bug",
	// 		dueDate: " 6/9/23",
	// 		action: "BUTTON",
	// 	},
	// ];

	const columns = [
		{
			field: "task",
			headerName: "Task",
			flex: 3,
		},
		{
			field: "priority",
			headerName: "Priority",
			flex: 2,
		},
		{
			field: "category",
			headerName: "Category",
			flex: 2,
		},
		{
			field: "dueDate",
			headerName: "Due Date",
			flex: 2,
		},
		{
			field: "action",
			headerName: "",
			flex: 1,
			sortable: false,
			renderCell: () => (
				<IconButton className="!text-black" onClick={handleOpenDiaglog}>
					<MoreVert />
				</IconButton>
			),
		},
	];

	const setStatusColor = (status) => {
		switch (status) {
			case TaskStatus.INPROGRESS:
				return "-[#FFBA49]";
			case TaskStatus.RESOLVED:
				return "-[#BB2649]";
			case TaskStatus.CLOSED:
				return "-[#8C8C8C]";
			default:
				return "-[#26BB98]";
		}
	};

	const handleOpenDiaglog = () => {
		handleOpen(true);
	}

	return (
		<div className={`flex flex-col shadow-md shadow-[#00000033] bg-white !rounded-[16px]`}>
			<div className={`flex items-center gap-10 h-20 border-b-2 border-solid border${setStatusColor(status[0].status)}`}>
				<p className="pl-5 text-2xl font-extrabold">{status[0].status}</p>
				<div className={`w-[60px] h-[40px] rounded-[28px] flex justify-center items-center bg${setStatusColor(status[0].status)} text-xl font-black`}>{status.length}</div>
			</div>
			<div className="pl-3">
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
						"& .MuiDataGrid-row:hover": { background: "none" },
						"& .MuiDataGrid-cell:focus": {
							outline: "none",
						},
					}}
					disableColumnFilter
					rowSelection={false}
					disableRowSelectionOnClick
					disableColumnSelector
					disableDensitySelector
					disableColumnMenu
					hideFooter
				/>
			</div>
		</div>
	);
}

export default FilerTaskByStatus;
