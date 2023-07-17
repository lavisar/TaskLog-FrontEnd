import { useEffect } from "react";
import { useGetAllProjectsQuery } from '../../store/apis/projectApi'
import { Card } from "@mui/material";
import { WEBLINKS } from "../../store/constants/WebLinks";
import CustomGrid from "../../components/table/CustomGrid";
import CustomLink from "../../components/CustomLink";
import { CgDetailsMore } from 'react-icons/cg';

export default function ProjectList() {
    useEffect(() => {
        document.title = "Projects List";
    }, [])

    const { data, isLoading, isSuccess } = useGetAllProjectsQuery();
    let content2;
    if (isLoading) {
        content2 = <p>Loading...</p>
    } else if (isSuccess) {
        const config = [
            {
                id: 'id',
                label: 'Id',
                flex: 0.4,
            },
            {
                id: 'name',
                label: 'Project Name',
                flex: 0.5,
            },
            {
                id: 'team_id',
                label: 'Team Id',
                flex: 0.6,
            },
            {
                id: 'createAt',
                label: 'Create At',
                flex: 0.6,
            },
            {
                id: "details",
                label: "Details",
                flex: 0.5,
                renderCell: (project) => <div>
                    <CustomLink to={`${WEBLINKS.ADMIN_PROJECT_DETAIL}/${project.id}`} className="text-blue-500 border border-blue-500 rounded-full px-2 flex items-center hover:bg-blue-300">
                        <CgDetailsMore className="mr-1" />
                        Details
                    </CustomLink>
                </div>
            },

        ]
        content2 = <CustomGrid data={data} config={config} pageSize={10} />
    }
    return <Card>
        {content2}
    </Card>

}