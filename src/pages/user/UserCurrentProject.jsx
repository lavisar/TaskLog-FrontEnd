import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectsMutation, useFindProjectByNameQuery, useGetAllProjectsQuery } from "../../store/apis/projectApi";

export default function UserCurrentProject() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState('');
    const [name, setName] = useState('');

    // const {
    //     data: projectData,
    //     isSuccess: projecIsSuccess,
    //     isError: projectIsError,
    // } = useFindProjectByNameQuery(teamId);

    const {
        data: projectData,
        isLoading: projectIsLoading,
        isSuccess: projectIsSuccess,
        isError: projectIsError,
        error: projectError

    } = useGetAllProjectsQuery(teamId)

    const [remove, { isLoading }] = useDeleteProjectsMutation();

    if (projectIsSuccess) {
        console.log(projectData);
    }




}