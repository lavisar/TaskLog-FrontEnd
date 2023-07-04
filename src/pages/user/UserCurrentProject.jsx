import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TeamRole } from "../../store/constants/Role";
import { setCurrentMember, setTeam,useGetCurrentMemberQuery, useGetTeamQuery} from "../../store";
import {useGetAllProjectsQuery, useDeleteProjectsMutation} from "../../store/apis/projectApi"
import { WEBLINKS } from "../../store/constants/WebLinks";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomTableSortable from "../../components/table/CustomTableSortable";
import { Avatar, Box, Button, Card, Modal, Typography } from "@mui/material";
export default function UserCurrentProject() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState('');
    const [name, setName] = useState('');

    const {
        data: teamData,
        // isLoading: teamIsLoading,
        isSuccess: teamIsSuccess,
        isError: teamIsError,
        // error: teamError
    } = useGetTeamQuery(teamId);


    useEffect(() => {
        document.title = "Team"
        if (teamIsSuccess) {
            document.title = `Team ${teamData.teamName}`;
        }
    }, [teamIsSuccess, teamData]);

    const {
        data: currentMemberData,
        isSuccess: currentMemberIsSuccess,
        isLoading: currentMemberIsLoading,
      } = useGetCurrentMemberQuery(teamId);

    const {
        data: projectData,
        isLoading: projectIsLoading,
        isSuccess: projectIsSuccess,
        isError: projectIsError,
        error: projectError
    } = useGetAllProjectsQuery(teamId);

    const [remove, { isLoading }] = useDeleteProjectsMutation();

    useEffect(() => {
        if (teamIsError) {
          navigate(WEBLINKS.MAIN);
        } else if (teamIsSuccess) {
          dispatch(setTeam(teamData));
        }
    
        if (currentMemberIsSuccess) {
          dispatch(setCurrentMember(currentMemberData));
        }
      }, [dispatch, navigate, teamData, teamIsError, teamIsSuccess, currentMemberData, currentMemberIsSuccess]);



    const config = [
        {
            id: 'projectname',
            label: 'Name',
            renderCell: (project) => project.name,
            sortValue: (project) => project.name,
        },
        {
            id: 'addedAt',
            label: 'Created Date',
            renderCell: (project) => dayjs(project.addedAt).format("MMM. DD, YYYY"),
            sortValue: (project) => project.addedAt,
        },
        
        // {
        //     id: 'remove',
        //     label: 'Remove',
        //     renderCell: (project) =>{
        //         if (member.teamMemberRole === TeamRole.CREATOR){
        //             return '';
        //         }
        //         if(![TeamRole.CREATOR, TeamRole.ADMINISTRATOR].includes(currentMemberData?.teamMemberRole) && member.teamMemberId !== currentMemberData?.teamMemberId){
        //             return '';
        //         }
        //         return <div>
        //             <Button onClick={() => handleOpen(project.projectId, project.project.name)}>

        //             </Button>
        //         </div>
        //     }

        // }

    ]

    let content2
    if(projectIsLoading){
        content2 = <h1>Loading ...</h1>;
    }else if(projectIsError){
        console.log(projectError)
    }else if(projectIsSuccess){
        content2 = (
            <Card>
            <CustomTableSortable data={projectData} config={config} />
          </Card>
        )
    }

    return (
        <div>
            {content2}
        </div>
    )

}