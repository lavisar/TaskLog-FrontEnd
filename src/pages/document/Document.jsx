import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetDocumentsByProjectIdQuery } from "../../store";
import { DocumentList } from "./components/DocumentList";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/UploadFile";
import { FormUpload } from "./components/FormUpload";

function Document() {
	const projectSelect = useSelector((state) => state.project.id);
	console.log("projectSelect", projectSelect);
	// for testing purposes
	const { data, isLoading, err } = useGetDocumentsByProjectIdQuery("001");
	// const { data, isLoading, err } =
	// 	useGetDocumentsByProjectIdQuery(projectSelect);

	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<div className="w-full">
				<Button variant="contained" onClick={() => setShowForm(true)}>
					+ UPLOAD
				</Button>
				{showForm && <FormUpload onClose={() => setShowForm(false)} />}
			</div>
			<div className="container mx-auto">
				<DocumentList
					documentLst={{
						data,
						isLoading,
						err,
					}}
				/>
			</div>
		</>
	);
}

export default Document;
