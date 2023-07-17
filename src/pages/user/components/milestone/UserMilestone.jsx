import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    useDeleteMilestoneMutation, useFindMilestonesByProjectIdQuery, useUpdateMilestoneMutation,
    useGetAllMilestoneQuery, useGetMilestoneQuery, milestoneApi
} from "../../../../store/apis/milestoneApi";

import { useGetProjectQuery } from "../../../../store/apis/projectApi";
import { WEBLINKS } from "../../../../store/constants/WebLinks";
import { setProject } from "../../../../store";
import { setMilestone } from "../../../../store/slices/milestoneSlice";
import { Card, Modal, Button, Box, Typography, TextField } from "@mui/material";
import CustomTableSortable from "../../../../components/table/CustomTableSortable";
import { LoadingButton } from "@mui/lab";
import { IoRemoveCircleSharp, IoPencil } from 'react-icons/io5';
import AddMemberButton from "../team/AddMemberButton";
export default function UserMilestone({ projectId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [milestoneId, setMilestoneId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formdate, setFormdate] = useState('');
    const [todate, setTodate] = useState('');

    const [editOpen, setEditOpen] = useState(false);
    const [editMilestoneId, setEditMilestoneId] = useState('');
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editFromDate, setEditFromDate] = useState('');
    const [editToDate, setEditToDate] = useState('');

    const handleEditOpen = (id, milestoneName, milestoneDescription, milestoneFromDate, milestoneToDate) => {
        setEditOpen(true);
        setEditMilestoneId(id);
        setEditName(milestoneName);
        setEditDescription(milestoneDescription);
        setEditFromDate(milestoneFromDate);
        setEditToDate(milestoneToDate);
    };

    const [updateMilestone, { isLoading: updating }] = useUpdateMilestoneMutation();

    const handleEditSave = async () => {
        try {
            // Perform the update mutation using the updateMilestone mutation function
            const result = await updateMilestone({
                id: editMilestoneId,
                name: editName,
                description: editDescription,
                fromDate: editFromDate,
                toDate: editToDate,
            }).unwrap();
            console.log(result);

            // Handle the success or error response
            if (result?.error?.originalStatus === 200) {
                setEditOpen(false);
                return;
            }
            console.log("Milestone cannot be updated");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditCancel = () => {
        setEditOpen(false);
        setEditMilestoneId('');
        setEditName('');
        setEditDescription('');
        setEditFromDate('');
        setEditToDate('');
    };


    const {
        data: getMilestoneData,
        isSuccess: getMilestoneIsSuccess,
        isError: getMilestoneIsError,
        isLoading: getMilestoneIsLoading,
    } = useGetMilestoneQuery(milestoneId);


    const {
        data: getProjectData,
        isSuccess: getProjectIsSuccess,
        isLoading: getProjectIsLoading,
        isError: getProjectIsError,
    } = useGetProjectQuery(projectId);

    const {
        data: milestoneData,
        isLoading: milestoneIsLoading,
        isSuccess: milestoneIsSuccess,
        isError: milestoneIsError,
        error: milestoneError,
    } = useFindMilestonesByProjectIdQuery(projectId);


    const [remove, { isLoading }] = useDeleteMilestoneMutation();

    useEffect(() => {
        // if(getProjectIsError) {
        //     navigate(WEBLINKS.MILESTONE);
        if (getProjectIsSuccess) {
            dispatch(setProject(getProjectData));
        }

        if (milestoneIsSuccess) {
            dispatch(setMilestone(milestoneData));
        }
    }, [dispatch, navigate, getProjectData, getMilestoneIsError, getProjectIsSuccess, milestoneData, milestoneIsSuccess]);

    const handleOpen = (id, milestoneName, milestoneDescription, milestoneFromdate, milestoneTodate) => {
        setOpen(true);
        setMilestoneId(id);
        setName(milestoneName);
        setDescription(milestoneDescription);
        setFormdate(milestoneFromdate);
        setTodate(milestoneTodate);
    }

    const handleRemove = async (milestoneId) => {
        try {
            const result = await remove(milestoneId);
            console.log(result);
            if (result?.error.originalStatus === 200) {
                setOpen(false);
                return;
            }
            console.log("Milestone cannot be removed");
            return;
        } catch (error) {
            console.log(error);
        }
    }


    const config = [
        {
            id: 'milestonename',
            label: 'Milestone Name',
            renderCell: (milestone) => milestone.name,
            value: (milestone) => milestone.name,
        },
        {
            id: 'mildescription',
            label: 'Milestone Description',
            renderCell: (milestone) => milestone.description,
            value: (milestone) => milestone.description,
        },
        {
            id: 'formdate',
            label: 'From - Date',
            renderCell: (milestone) => milestone.formdate,
            value: (milestone) => milestone.formdate,
        },
        {
            id: 'todate',
            label: 'To - Date',
            renderCell: (milestone) => milestone.todate,
            value: (milestone) => milestone.todate,
        },
        {
            id: 'remove',
            label: 'Remove',
            renderCell: (milestone) => {
                return <div>
                    <Button onClick={() => handleOpen(milestone.id, milestone.name)}
                        className="!rounded-full aspect-square !min-w-min hover:!bg-red-300"
                    >
                        <IoRemoveCircleSharp className="text-lg text-red-400" />
                    </Button>
                </div>
            }


        },
        {
            id: 'Edit',
            label: 'Edit',
            renderCell: (milestone) => {
                return (
                    <div>
                        <Button onClick={() => handleEditOpen(milestone.id, milestone.name, milestone.description, milestone.formdate, milestone.todate)}>
                            <IoPencil className="text-lg text-yellow-400" />
                        </Button>
                    </div>
                );
            }
        }

    ]

    let content3
    if (milestoneIsLoading) {
        content3 = <h1>Loading ...</h1>
    } else if (milestoneIsError) {
        console.log(milestoneError)
    } else if (milestoneIsSuccess) {
        content3 = (
            <Card>
                <CustomTableSortable data={milestoneData} config={config} />
            </Card>
        );
    }

    return (
        <div>
            {content3}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="remove-milestone-modal"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {milestoneId === getMilestoneIsLoading?.id ? (
                        <Typography id="remove-milestone-modal" variant="h6" className="text-center">
                            Do you want to remove this milestone?
                        </Typography>
                    ) : (
                        <div>
                            <Typography id="remove-milestone-modal" variant="h6" className="text-center">
                                Do you want to remove this milestone?
                            </Typography>
                        </div>
                    )}
                    <Box className="flex mt-5 items-center justify-between">
                        <LoadingButton
                            loading={isLoading}
                            onClick={() => handleRemove(milestoneId)}
                            variant="contained"
                            color="error"
                            className=""
                        >
                            {milestoneId === getMilestoneData?.id ? 'Yes' : 'Remove'}
                        </LoadingButton>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={editOpen}
                onClose={handleEditCancel}
                aria-labelledby="edit-milestone-modal"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" className="text-center">
                        Edit Milestone
                    </Typography>
                    <form>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                fullWidth
                                multiline
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="From Date"
                                value={editFromDate}
                                onChange={(e) => setEditFromDate(e.target.value)}
                                type="date"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="To Date"
                                value={editToDate}
                                onChange={(e) => setEditToDate(e.target.value)}
                                type="date"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box className="flex mt-5 items-center justify-between">
                            <Button onClick={handleEditCancel}>
                                Cancel
                            </Button>
                            <LoadingButton
                                loading={isLoading}
                                onClick={handleEditSave}
                                variant="contained"
                            >
                                Save
                            </LoadingButton>
                        </Box>
                    </form>
                </Box>
            </Modal>

        </div>
    )


}