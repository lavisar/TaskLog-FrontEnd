import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProjectsMutation } from "../../store/apis/projectApi";
import { Button, ClickAwayListener, Grow, Paper, Popper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { FaPlus } from "react-icons/fa";

export default function AddProjectButton() {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const id = useSelector(state => state.team.id);
    const [createProjects, { isLoading }] = useCreateProjectsMutation();

    const handlePopperClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        setName('');
    };

    function handleListKeyDown(event) {
        if (event.key === "Escape") {
            setOpen(false);
        }
    }

    const handleSubmit = async n => {
        n.preventDefault();
        if (name.trim() === '') {
            return;
        }
        try {
            await createProjects({ name, team_id: id });
            setOpen(false);
            setName('');
        } catch (error) {
            console.log(error);
        }
    }



    const addProjectForm = (
        <form onSubmit={handleSubmit}>
            <div className="p-1">
                <TextField
                    id="name"
                    label="Project Name"
                    type="text"
                    value={name}
                    onChange={n => setName(n.target.value)}
                    autoComplete="off"
                    className="w-full"
                    variant="standard"
                />
            </div>
            <div className="p-2">
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: "rgb(34 197 94)",
                        borderRadius: "9999px",
                        "&:hover": {
                            backgroundColor: "rgb(134 239 172)",
                        }
                    }}
                >
                    <span className="text-white">Add Project</span>

                </LoadingButton>
            </div>
        </form>
    )

    return (
        <Box className="text-right m-4">
            <Button
                ref={anchorRef}
                aria-describedby="add"
                onClick={() => setOpen(prev => !prev)}
                variant="contained"
                className="!bg-green-500 !rounded-full flex items-center justify-between"
                aria-controls={open ? "add-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <FaPlus />
                <span className="pl-2">Add Project</span>
            </Button>

            <Popper
                id="add"
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal
                sx={{ minWidth: 300 }}
                className="border shadow-black/40 shadow-lg !rounded-2xl !p-3 !bg-white z-10"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom-end" ? "left top" : "left bottom",
                        }}
                    >
                        <Paper className="!shadow-none">
                            <ClickAwayListener onClickAway={handlePopperClose}>
                                <Box
                                    id="add-menu"
                                    aria-labelledby="add-btn"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {addProjectForm}
                                </Box>
                            </ClickAwayListener>

                        </Paper>

                    </Grow>
                )}

            </Popper>
        </Box>
    )
}