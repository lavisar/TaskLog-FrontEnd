import { Box, Button, Card, IconButton, LinearProgress, TextField, Toolbar } from "@mui/material"
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import CustomLink from "../../components/CustomLink";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProjectsMutation, useGetAllProjectsQuery } from "../../store/apis/projectApi";
import { useDispatch } from "react-redux";
import { clearProject, setProject } from "../../store";

export default function UserProjects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const [form, setForm] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = "Choose a project";
  }, []);
  useEffect(() => {
    dispatch(clearProject());
  }, [dispatch]);
  const { data, isLoading, isSuccess, isError, error } = useGetAllProjectsQuery();
  const [createProjects, { isLoading: creating }] = useCreateProjectsMutation();

  const handleSubmit = async n => {
    n.preventDefault();
    if (name.trim() === '') {
      return;
    }
    try {
      const projectData = await createProjects({ name, team_id: teamId }).unwrap();
      console.log(projectData);
      dispatch(setProject(projectData));
      setName('');
      navigate(`${WEBLINKS.TEAMS}/${teamId}`);
    } catch (error) {
      console.log(error);
    }
  }
  const createProjectForm = (
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
          loading={creating}
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

  const chooseProject = (project) => {
    dispatch(setProject(project));
  }

  let content;
  if (isLoading) {
    content = <LinearProgress color="success" />;
  } else if (isSuccess) {
    let projectData = [];
    projectData = data.filter(project => project.team_id === teamId);
    if (projectData.length === 0) {
      content = <div>
        <p className="text-center text-lg text-lime-500 mb-2">Create a project</p>
        {createProjectForm}
      </div>;
    } else {
      content = <div>
        {form ? (
          <div>
            <div className="text-right">
              <IconButton
                onClick={() => setForm(false)}
              ><AiOutlineClose /></IconButton>
            </div>
            {createProjectForm}
          </div>
        ) : (
          <div>
            <div className="text-right">
              <Button variant="contained" className="!bg-green-500 !rounded-full flex items-center justify-between"
                onClick={() => setForm(true)}
              >
                <FaPlus />
                <span className="pl-2">Create a Project</span>
              </Button>
            </div>
            <div className="mt-2 text-center">
              <h1 className="text-center font-extrabold text-2xl mb-3">Your Projects</h1>
              {
                projectData.map((project, index) => {
                  console.log(project);
                  return <div key={index}>
                    <CustomLink
                      to={`${WEBLINKS.TEAMS}/${teamId}`}
                      className="border-2 border-green-500 rounded-full m-2"
                    >
                      <h3 className="text-lg font-bold text-xl" onClick={() => chooseProject(project)}>{project.name}</h3>
                    </CustomLink>
                  </div>
                })
              }
            </div>
          </div>
        )
        }
      </div>
    }
  } else if (isError) {
    console.log(error);
    content = <p className="text-red-500">Error connect to server</p>
  }

  const toolbarHeight = 50;
  return <Box
    className="w-screen h-screen"
    sx={{ overflow: "hidden" }}
  >
    <div id="tasklog-background"></div>
    <Toolbar
      variant="dense"
      sx={{
        height: toolbarHeight,
      }}
      className="!p-0"
    >
      <img src="/images/header_logo.png" />
    </Toolbar>

    <Box sx={{
      minHeight: `calc(100vh - ${toolbarHeight}px)`,
      display: 'grid',
      placeItems: 'center',
      alignItems: 'center',
    }}>
      <Card className='p-2' sx={{
        width: 450, position: 'relative',
        top: toolbarHeight / -2,
        borderRadius: '20px',
      }}>
        {content}
      </Card>
    </Box>
  </Box>;
}