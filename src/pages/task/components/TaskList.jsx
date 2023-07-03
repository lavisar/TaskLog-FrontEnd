export const TaskList = ({ taskLst }) => {
	console.log("TaskList", taskLst);
	return (
		<>
			<div>Show tasks as list</div>
			<div className="mt-6">
				{taskLst.isLoading ? (
					<div>Loading...</div>
				) : taskLst.err ? (
					<div>{taskLst.err}</div>
				) : (
					<ul>
						{taskLst.data?.map((task, index) => (
							<div key={index}>
								{index + 1} - {task.taskName}
							</div>
						))}
					</ul>
				)}
			</div>
		</>
	);
};
