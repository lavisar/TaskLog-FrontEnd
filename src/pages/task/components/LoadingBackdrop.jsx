import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingBackdrop({ props }) {
	const { isGetting, isGettingSuccess } = props;
	const [open, setOpen] = useState(false);
    useEffect(() => {
        isGetting && setOpen(true);
        isGettingSuccess && setOpen(false);
    });
	return (
		<div>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={open}
			>
				<CircularProgress sx={{ color: "#26BB98"}} />
			</Backdrop>
		</div>
	);
}
