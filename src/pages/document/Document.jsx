import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetDocumentsByProjectIdQuery } from "../../store";
import { DocumentList } from "./components/DocumentList";

function Document() {
	const projectSelect = useSelector((state) => state.project.id);
	const { data, isLoading, err } = useGetDocumentsByProjectIdQuery("001");

	return (
		<>
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
