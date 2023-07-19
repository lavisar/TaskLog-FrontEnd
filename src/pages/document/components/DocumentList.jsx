import { GetApp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDeleteDocumentByIdMutation } from "../../../store/apis/documentApi";
import { authRequestWithReauth } from "../../../store/apis/features/authApiAxios";

export const DocumentList = ({ documentLst }) => {
	const { data, isLoading, err } = documentLst;
	const [rows, setRows] = useState([]);

	const [deleteDocumentById] = useDeleteDocumentByIdMutation();

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
	const downloadFile = (documentId, filename) => {
		console.log("dowloading id: " + documentId);
		authRequestWithReauth(
			`document/download/${documentId}`,
			"GET",
			"blob"
		).then((response) => {
			console.log(response);
			var binaryData = [];
			binaryData.push(response.data);
			const link = document.createElement("a");
			link.href = URL.createObjectURL(
				new Blob(binaryData, { type: "application/octet-stream" })
			);
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(link.href);
		});
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
				const fileName = params.row.fileName;
				return (
					<div className="flex items-center justify-center space-x-3">
						<GetApp
							onClick={() => downloadFile(documentId, fileName)}
						/>
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
			<div className="mt-6 h-[600px]">
				<DataGrid
					className="shadow-md shadow-[#00000033] bg-white !rounded-[16px] pl-4 scrollbar-hide"
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
