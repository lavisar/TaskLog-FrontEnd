import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

export const DocumentList = ({ documentLst }) => {
	const dispatch = useDispatch();
	const { data, isLoading, err } = documentLst;
	const [inputValue, setInputValue] = useState("");
	const [rows, setRows] = useState([]);
	const [options, setOptions] = useState([""]);

	useEffect(() => {
		if (data) {
			const rowConfig = data.map((row, index) => {
				var inputString = row.files;
				var indexOfUnderscore = inputString.indexOf("_");
				var result = inputString.substring(indexOfUnderscore + 1);
				return {
					id: index + 1,
					documentId: row.id,
					fileName: result,
					fileDescription: row.description,
					uploadedTime: row.createAt,
				};
			});
			setRows(rowConfig);
		}
	}, [data]);

	const columns = [
		{ field: "documentId", headerName: "Document ID", width: 150 },
		{ field: "fileName", headerName: "File Name", width: 200 },
		{
			field: "fileDescription",
			headerName: "File Description",
			width: 250,
		},
		{ field: "uploadedTime", headerName: "Uploaded Time", width: 200 },
	];

	return (
		<>
			<div className="mt-6">
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
						documentId: false,
					}}
				/>
			</div>
		</>
	);
};
