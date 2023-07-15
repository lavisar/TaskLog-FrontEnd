import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetDocumentsByProjectIdQuery } from "../../store";
import { DocumentList } from "./components/DocumentList";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FormUpload } from "./components/FormUpload";

function Document() {
	const projectSelect = useSelector((state) => state.project.id);
	console.log("projectSelect", projectSelect);
	// for testing purposes
	const { data, isLoading, err } = useGetDocumentsByProjectIdQuery("001");
	// const { data, isLoading, err } =
	// 	useGetDocumentsByProjectIdQuery(projectSelect);

	const [showForm, setShowForm] = useState(false);
	const openForm = () => {
		setShowForm(true);
	};

	const closeForm = () => {
		setShowForm(false);
	};
	return (
		<>
			<div className="w-full">
				<Button variant="contained" color="success" onClick={openForm}>
					<UploadFileIcon className="mr-3" /> NEW FILE
				</Button>
				{showForm && <FormUpload onClose={closeForm} />}
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
