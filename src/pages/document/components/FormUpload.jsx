import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";

export const FormUpload = ({ onClose }) => {
	const [file, setFile] = React.useState(null);
	const [description, setDescription] = React.useState("");

	const handleFileChange = (event) => {
		const uploadedFile = event.target.files[0];
		setFile(uploadedFile);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = () => {
		// Perform your logic to save the file and description here
		console.log("File:", file);
		console.log("Description:", description);

		// Reset form values
		setFile(null);
		setDescription("");
		onClose();
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
