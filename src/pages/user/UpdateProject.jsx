import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { useUpdateProjectsMutation } from "../../store/apis/projectApi";
import { Box, Button, Modal, TextField, Typography, Alert } from "@mui/material";
import { setProject } from "../../store";
import { LoadingButton } from "@mui/lab";
import { AiFillSetting } from 'react-icons/ai';
import AddMilestone from "./components/milestone/AddMilestone";
import UserMilestone from "./components/milestone/UserMilestone";


export default function UpdateProject({ getProjectIsLoading }) {
    const selectDetails = createSelector(
        (state) => state.project.id,
        (state) => state.project.name,
        (id, name) => ({ id, name })
    )

    const { id, name } = useSelector(selectDetails);
    console.log(name);
    const [formName, setFormName] = useState(name);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCreateNew, setIsCreateNew] = useState(false);
    useEffect(() => {
        setFormName(name);
    }, [name]);

    const [update, { isLoading }] = useUpdateProjectsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formName.trim() === '') {
            console.log("Name for the project cannot be blank");
            return;
        }
        try {
            const result = await update({ id, name: formName }).unwrap();
            console.log(result);
            if (result) {
                dispatch(setProject(result));
                setFormName("");
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <div>
            <Box className="text-right m-4">
                <Button
                    onClick={() => setOpen(true)}
                    className="!text-white !bg-green-500 hover:!bg-green-300 !rounded-full !px-3"
                >
                    <AiFillSetting />
                    <span className="pl-1">Edit Current Project</span>
                </Button>

            </Box>
        </div>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="update-project-modal"
            aria-describedby="modal-project"
        >

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 750,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AddMilestone />
                    </div>
                    <div className="p-4">
                        <TextField
                            id="name"
                            label="Project Name"
                            value={formName}
                            onChange={e => setFormName(e.target.value)}
                            autoComplete="off"
                            className="w-full"
                        />
                    </div>

                    <div className='text-center'>
                        <LoadingButton
                            type='submit'
                            size='small'
                            loading={isLoading}
                            // loadingIndicator="Creating..."
                            // loadingPosition='end'
                            variant='contained'
                            className='!bg-green-400 hover:!bg-green-600 !rounded-full'
                        >
                            <span className='px-3'>SAVE CHANGES</span>
                        </LoadingButton>

                    </div>
                </form>
                <br>
                </br>
                <UserMilestone projectId={id} />
            </Box>


        </Modal>


    </div >



}