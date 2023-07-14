import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
	useDeleteDocumentByIdMutation,
	useGetFileDownloadQuery,
} from "../../../store/apis/documentApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetApp } from "@mui/icons-material";

export const DocumentList = ({ documentLst }) => {
	const dispatch = useDispatch();
	const { data, isLoading, err } = documentLst;
	const [rows, setRows] = useState([]);
	const [options, setOptions] = useState([""]);

	const deleteDocumentById = useDeleteDocumentByIdMutation();
	const { data: fileData } = useGetFileDownloadQuery();

	console.log("useGetFileDownloadQuery:", useGetFileDownloadQuery());
	// console.log("getFileDownload", fileData);

	const handleDelete = async (documentId) => {
		console.log("deleting id:", documentId);
		try {
			const result = await deleteDocumentById(documentId);
			console.log(result);
			if (result?.error.originalStatus === 200) {
				return;
			}
			console.log("Document cannot be removed");
		} catch (error) {
			console.error("error", error);
		}
	};
	const downloadFile = (documentId) => {
		console.log("dowloading id: " + documentId);
		console.log("getFileDownload", fileData(documentId));
		// getFileDownload(documentId).then((res) => {
		// 	const a = document.createElement("a");
		// 	a.href = URL.createObjectURL(res.data);
		// 	a.download = res.data.fileName || "file";
		// 	a.click();
		// });
	};

	useEffect(() => {
		if (data) {
			const rowConfig = data.map((row, index) => {
				var inputString = row.files;
				var indexOfUnderscore = inputString.indexOf("_");
				var result = inputString.substring(indexOfUnderscore + 1);

				const date = new Date(row.createAt);
				const uploadedTime = date.toLocaleString("en-us", {
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				});
				return {
					id: index + 1,
					documentId: row.id,
					fileName: result,
					fileDescription: row.description,
					uploadedTime: uploadedTime,
				};
			});
			setRows(rowConfig);
		}
	}, [data]);

	const columns = [
		{ field: "documentId", headerName: "Document ID", width: 200 },
		{ field: "fileName", headerName: "File Name", width: 200 },
		{
			field: "fileDescription",
			headerName: "File Description",
			width: 400,
		},
		{ field: "uploadedTime", headerName: "Uploaded Time", width: 300 },
		{
			field: "actions",
			headerName: "Actions",
			width: 100,
			renderCell: (params) => {
				const documentId = params.row.documentId;
				return (
					<div className="flex items-center justify-center space-x-3">
						<GetApp onClick={() => downloadFile(documentId)} />
						<span className="mx-2">|</span>
						<DeleteIcon
							onClick={() => handleDelete(documentId)}
							style={{ color: "red" }}
						/>
					</div>
				);
			},
		},
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
