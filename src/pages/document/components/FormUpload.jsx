import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";
import { useCreateDocumentMutation } from "../../../store";
import { useSelector } from "react-redux";

export const FormUpload = ({ onClose }) => {
	const projectSelect = useSelector((state) => state.project.id);
	const [file, setFile] = React.useState(null);
	const [description, setDescription] = React.useState("");
	const [uploadDoc] = useCreateDocumentMutation();

	const handleFileChange = (event) => {
		const uploadedFile = event.target.files[0];
		setFile(uploadedFile);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = async () => {
		console.log(">> Running function handleSubmit...");
		console.log("File:", file);
		console.log("Description:", description);
		console.log("projectID:", projectSelect);

		const formData = new FormData();
		const documentModel = {
			description: description,
		};
		const projectModel = {
			id: projectSelect,
		};
		const documentJson = JSON.stringify(documentModel);
		const projectJson = JSON.stringify(projectModel);
		const documentBlog = new Blob([documentJson], {
			type: "application/json",
		});
		const projectBlob = new Blob([projectJson], {
			type: "application/json",
		});
		formData.append("document", documentBlog);
		formData.append("project", projectBlob);
		formData.append("file", file);

		try {
			await uploadDoc(formData);
			setFile(null);
			setDescription("");
			onClose();
		} catch (err) {
			console.log("Error uploading document:", err);
		}
	};

	return (
		<Dialog open={true} onClose={onClose}>
			<h1 className="text-center font-extrabold text-2xl py-5">
				Upload File
			</h1>
			<DialogContent className="flex flex-col gap-4">
				<input
					type="file"
					onChange={handleFileChange}
					className="outline-none"
				/>
				<TextField
					label="Description"
					value={description}
					onChange={handleDescriptionChange}
					fullWidth
					multiline
					rows={4}
					className="outline-none"
				/>
			</DialogContent>
			<DialogActions className="justify-center space-x-4">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
				>
					Save
				</Button>
				<Button onClick={onClose} variant="outlined" color="secondary">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};
