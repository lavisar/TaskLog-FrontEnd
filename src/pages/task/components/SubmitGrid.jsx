import React from "react";
import { GetApp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { authRequestWithReauth } from "../../../store/apis/features/authApiAxios";
import { Modal, Typography, Button, Box } from "@mui/material";
import {
	useGetSubmitsByTaskIdQuery,
	useDeleteSubmitByIdMutation,
	useCreateSumitMutation,
} from "../../../store";

export const SubmitGrid = ({ taskId }) => {
	const { currentTask } = taskId;
	const [rows, setRows] = useState([]);
	const [file, setFile] = React.useState(null);
	const { data, isLoading, err } = useGetSubmitsByTaskIdQuery(currentTask);
	const [deleteSubmitById] = useDeleteSubmitByIdMutation();
	const [showModal, setShowModal] = useState(false);
	const [currentSubmitId, setCurrentSubmitId] = useState();
	const [uploadSubmit] = useCreateSumitMutation();

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleDelete = async (submitId) => {
		console.log("DeleteId", submitId);
		setCurrentSubmitId(submitId);
		handleOpenModal();
	};

	const handleDeleteConfirmed = async () => {
		handleCloseModal();
		try {
			const result = await deleteSubmitById(currentSubmitId);
			console.log(result);
			if (result?.error.originalStatus === 200) {
				return;
			}
			console.log("Document cannot be removed");
		} catch (error) {
			console.error("error", error);
		}
	};

	const downloadFile = async (submitId, filename) => {
		console.log("dowloading id: " + submitId);
		await authRequestWithReauth(
			`submit/download/${submitId}`,
			"GET",
			"blob"
		).then((response) => {
			console.log("response data", response.data);
			var binaryData = [];
			binaryData.push(response.data);
			const link = document.createElement("a");
			link.href = URL.createObjectURL(
				response.data
				// new Blob(binaryData, { type: "application/pdf" })
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
				var inputString = row.attached;
				var indexOfUnderscore = inputString.indexOf("_");
				var result = inputString.substring(indexOfUnderscore + 1);
				const date = new Date(row.submittedAt);
				const uploadedTime = date.toLocaleString("en-us", {
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				});
				return {
					id: index + 1,
					submitId: row.id,
					fileName: result,
					uploadedTime: uploadedTime,
				};
			});
			setRows(rowConfig);
		}
	}, [data]);

	const columns = [
		{ field: "submitId", headerName: "Document ID", width: 200 },
		{ field: "fileName", headerName: "File Name", width: 350 },
		{ field: "uploadedTime", headerName: "Uploaded", width: 230 },
		{
			field: "actions",
			headerName: "Actions",
			width: 100,
			renderCell: (params) => {
				const submitId = params.row.submitId;
				const fileName = params.row.fileName;
				return (
					<div className="flex items-center justify-center space-x-3">
						<GetApp
							onClick={() => downloadFile(submitId, fileName)}
						/>
						<span className="mx-2">|</span>
						<DeleteIcon
							onClick={() => handleDelete(submitId)}
							style={{ color: "red" }}
						/>
					</div>
				);
			},
		},
	];

	const handleSubmit = async (event) => {
		console.log("Running handleSubmit...");
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		const submitModel = {};
		const taskId = currentTask;
		const submitJson = JSON.stringify(submitModel);
		const submitBlob = new Blob([submitJson], {
			type: "application/json",
		});
		formData.append("attached ", uploadedFile);
		formData.append("submit", submitBlob);
		formData.append("taskId", taskId);
		try {
			await uploadSubmit(formData);
			setFile(null);
		} catch (error) {
			console.log("Error uploading submit", error);
		}
	};
	return (
		<>
			<div className="mt-4 h-[220px] overflow-auto p-3">
				<DataGrid
					rows={rows}
					columns={columns}
					loading={isLoading}
					className="shadow-md shadow-[#00000033] bg-white !rounded-[16px] pl-4 !border-none"
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
					columnVisibilityModel={{
						submitId: false,
					}}
				/>
			</div>
			<div className="mt-4 px-3">
				<Button
					fullWidth
					component="label"
					variant="contained"
					className="!bg-[#EAEAEA] !rounded-2xl !h-14 !py-2 !shadow-md !flex !items-center !gap-2"
				>
					<div>
						<AddIcon className="!text-[40px] text-[#0E141A]" />
					</div>
					<div className="text-xl font-bold text-[#0E141A]">
						UPLOAD NEW FILES
					</div>
					<input type="file" hidden onChange={handleSubmit} />
				</Button>
			</div>
			<Modal open={showModal} onClose={handleCloseModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 500,
						bgcolor: "background.paper",
						borderRadius: "20px",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant="h6" className="text-center">
						Do you want to remove this file?
					</Typography>
					<Box className="flex mt-5 items-center justify-between">
						<Button
							variant="contained"
							color="error"
							onClick={() => handleDeleteConfirmed()}
						>
							Remove
						</Button>
						<Button onClick={handleCloseModal}>Cancel</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};
