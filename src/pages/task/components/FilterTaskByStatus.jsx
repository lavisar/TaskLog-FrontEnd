import { MoreVert } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function FilerTaskByStatus({ props }) {
	const rows = [
		{
			id: "xxx",
			task: "TASK_001",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eligendi, illum laudantium et iure culpa neque similique inventore necessitatibus aspernatur natus. Est quam sunt nemo doloremque recusandae suscipit eius. Dolore.",
			priority: "HIGH",
			category: "Bug",
			dueDate: " 6/9/23",
			action: "BUTTON",
		},
	];

	const columns = [
		{
			field: "task",
			headerName: "Task",
			flex: 1,
		},
		{
			field: "description",
			headerName: "Description",
			flex: 4,
		},
		{
			field: "priority",
			headerName: "Priority",
			flex: 1,
		},
		{
			field: "category",
			headerName: "Category",
			flex: 1,
		},
		{
			field: "dueDate",
			headerName: "Due Date",
			flex: 1,
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			sortable: false,
			renderCell: () => (
				<IconButton className="!text-black !bg-slate-500">
					<MoreVert />
				</IconButton>
			),
		},
	];

	return (
		<div className="flex flex-col shadow-md shadow-[#00000033] bg-white !rounded-[16px]">
			<div className="flex items-center gap-2 h-20 border-b-2 border-solid border-[#FFBA49]">
				<p className="pl-5">IN PROGRESS</p>
				<div>1</div>
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
