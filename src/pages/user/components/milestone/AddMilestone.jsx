import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useCreateMilestoneMutation } from "../../../../store/apis/milestoneApi";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, TextField, Popper, Grow, Paper, ClickAwayListener } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AddMilestone() {
    const [name, setName] = useState('');
    const [description, setDiscription] = useState('');
    const [from, setFromdate] = useState('');
    const [to, setTodate] = useState('');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const id = useSelector(state => state?.project?.id);
    const [createMilestone, { isLoading }] = useCreateMilestoneMutation();

    const handlePopperClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        setName('');
        setDiscription('');
        setFromdate('');
        setTodate('');
    };



    function handleListKeyDown(event) {
        if (event.key === "Escape") {
            setOpen(false);
        }
    }

    const handleSubmit = async m => {
        m.preventDefault();
        if (name.trim() === '' || description.trim() === '') {
            return;
        }
        try {
            await createMilestone({ name, description, from, to, projectId: id });
            setOpen(false);
            setName('');
            setDiscription('');
            setFromdate('');
            setTodate('');
        } catch (error) {
            console.log(error);
        }
    }


    const AddMilestoneForm = (
        <div onSubmit={handleSubmit}>
            <div className="p-1">
                <TextField
                    id="name"
                    label="Milestone Name"
                    type="text"
                    value={name}
                    onChange={m => setName(m.target.value)}
                    autoComplete="off"
                    className="w-full"
                    variant="standard"
                />
            </div>
            <div className="p-1">
                <TextField
                    id="descirption"
                    label="Milestone Description"
                    type="text"
                    value={description}
                    onChange={m => setDiscription(m.target.value)}
                    autoComplete="off"
                    className="w-full"
                    variant="standard"
                />
            </div>
            <div className="p-1">
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                >
                    <DateField
                        id="from"
                        label="Milestone From-Date "
                        value={from}
                        onChange={newValue => setFromdate(newValue)}
                        autoComplete="off"
                        className="w-full"
                        variant="standard"
                    />
                    </LocalizationProvider>
            </div>
            <div className="p-1">
            <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                >
                <DateField
                    id="to"
                    label="Milestone To-Date "
                    value={to}
                    onChange={newValue => setTodate(newValue)}
                    autoComplete="off"
                    className="w-full"
                    variant="standard"
                />
                </LocalizationProvider>
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
                    <span className="text-white">Add Milestone</span>

                </LoadingButton>
            </div>
        </div>
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
                <span className="pl-2">Add Milestone</span>
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
                                    {AddMilestoneForm}
                                </Box>
                            </ClickAwayListener>

                        </Paper>

                    </Grow>
                )}

            </Popper>
        </Box>
    )
} 