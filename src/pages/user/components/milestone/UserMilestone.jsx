import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMilestoneMutation, useFindMilestonesByProjectIdQuery, useGetAllMilestoneQuery, useGetMilestoneQuery } from "../../../../store/apis/milestoneApi";
import { useGetProjectQuery } from "../../../../store/apis/projectApi";
import { WEBLINKS } from "../../../../store/constants/WebLinks";
import { setProject } from "../../../../store";
import { setMilestone } from "../../../../store/slices/milestoneSlice";
import { Card, Modal, Button, Box, Typography } from "@mui/material";
import CustomTableSortable from "../../../../components/table/CustomTableSortable";
import { LoadingButton } from "@mui/lab";
import { IoRemoveCircleSharp, IoPencil } from 'react-icons/io5';
import AddMemberButton from "../team/AddMemberButton";
export default function UserMilestone(){
    const{projects_id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [milestoneId,setMilestoneId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formdate, setFormdate] = useState('');
    const [todate, setTodate] = useState('');

    // const {
    //     data: projectData,
    //     isSuccess: projectIsSuccess,
    //     isError: projectIsError
    // } = useGetProjectQuery(projectId);

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
    } = useGetProjectQuery(projects_id);

    const {
        data: findmilestoneData,
        isLoading: findmilestoneIsLoading,
        isSuccess: findmilestoneIsSuccess,
        isError: findmilestoneIsError,
        error: findmilestoneError,
    } = useFindMilestonesByProjectIdQuery(projects_id);

    const {
        data: milestoneData,
        isLoading: milestoneIsLoading,
        isSuccess: milestoneIsSuccess,
        isError: milestoneIsError,
        error: milestoneError,
    } = useGetAllMilestoneQuery(projects_id);

    const [remove, {isLoading}] = useDeleteMilestoneMutation();

    useEffect(()=>{
        // if(getProjectIsError) {
        //     navigate(WEBLINKS.MILESTONE);
         if(getProjectIsSuccess){
            dispatch(setProject(getProjectData));
        }

        if(milestoneIsSuccess){
            dispatch(setMilestone(milestoneData));
        }
    },[dispatch,navigate,getProjectData, getMilestoneIsError,getProjectIsSuccess,milestoneData,milestoneIsSuccess]);

    const handleOpen = (id, milestoneName, milestoneDescription, milestoneFromdate, milestoneTodate)=>{
        setOpen(true);
        setMilestoneId(id);
        setName(milestoneName);
        setDescription(milestoneDescription);
        setFormdate(milestoneFromdate);
        setTodate(milestoneTodate);
    }

    const handleRemove = async (milestoneId)=>{
        try {
            const result = await remove(milestoneId);
            console.log(result);
            if(result?.error.originalStatus ===200){
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
                    <Button onClick={() => handleOpen(milestone.id, milestone.name )}
                        className="!rounded-full aspect-square !min-w-min hover:!bg-red-300"
                    >
                        <IoRemoveCircleSharp className="text-lg text-red-400" />
                    </Button>
                </div>
            }


        },
    ]

    let content3
    if(findmilestoneIsLoading){
        content3 = <h1>Loading ...</h1>
    }else if(findmilestoneIsError){
        console.log(findmilestoneError)
    }else if(findmilestoneIsSuccess){
        content3 = (
            <Card>
                <CustomTableSortable data={findmilestoneData} config={config}/>
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
        </div>
    )

    
}