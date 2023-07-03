import { Box, Button, Card, IconButton, TextField, Toolbar } from "@mui/material";
import { clearCurrentMember, clearTeam, setTeam, useCreateTeamMutation, useGetAllUserTeamsQuery } from "../../store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTextArea } from "../../components/CustomTextArea";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { WEBLINKS } from "../../store/constants/WebLinks";
import CustomLink from "../../components/CustomLink";
import { FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

export default function UserTeams() {
  const teamNameRef = useRef();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);

  useEffect(() => {
    dispatch(clearTeam());
    dispatch(clearCurrentMember());
  }, [dispatch])
  const { data, isLoading, isSuccess, isError, error } = useGetAllUserTeamsQuery();
  // console.log(data);

  const [createTeam, createTeamResults] = useCreateTeamMutation();


  const handleSubmit = async e => {
    e.preventDefault();
    if (teamName.trim() === '') {
      setErrMsg('Please enter a team name');
      return;
    }
    try {
      const teamData = await createTeam({ teamName, description }).unwrap();
      console.log(teamData);
      dispatch(setTeam(teamData));
      setTeamName('');
      setDescription('');
      navigate(`${WEBLINKS.TEAMS}/${teamData.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const createTeamForm = (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center font-extrabold text-2xl">Create Team</h1>
      <div className='p-4 text-center text-red-400'>
        <span className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</span>
      </div>
      <div className="p-4">
        <TextField
          id="name"
          label="Team Name"
          ref={teamNameRef}
          value={teamName}
          onChange={e => setTeamName(e.target.value)} autoComplete="off"
          className="w-full"
        />
      </div>
      <div className="p-4">
        <CustomTextArea
          id="description"
          placeholder="About your team"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full"
        />
      </div>

      <div className='text-center'>
        <LoadingButton
          type='submit'
          size='small'
          loading={createTeamResults.isLoading}
          loadingIndicator="Creating..."
          // loadingPosition='end'
          variant='contained'
          className='!bg-green-400 !hover:bg-green-600 !rounded-full'
        >
          <span className='px-3'>Create Team</span>
        </LoadingButton>
      </div>
    </form>
  )

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (data.length === 0) {
      content = <div>
        <p className="text-center text-lg text-lime-500 mb-2">You currently have no team, let's create one</p>
        {createTeamForm}
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
            {createTeamForm}
          </div>
        ) : (
          <div>
            <div className="text-right">
              <Button variant="contained" className="!bg-green-500 !rounded-full flex items-center justify-between"
                onClick={() => setForm(true)}
              >
                <FaPlus />
                <span className="pl-2">Create New Team</span>
              </Button>
            </div>
            <div className="mt-2 text-center">
              <h1 className="text-center font-extrabold text-2xl mb-3">Your teams</h1>
              {
                data.map((team, index) => {
                  return <div key={index}>
                    <CustomLink
                      to={`${WEBLINKS.TEAMS}/${team.teamId}`}
                      className="border-2 border-green-500 rounded-full m-2"
                    >
                      <h3 className="text-lg font-bold text-xl">{team.teamName}</h3>
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
  return <Box className="w-screen h-screen">
    <Toolbar
      variant="dense"
      sx={{
        height: toolbarHeight,
      }}
    >
      {/* Put logo on top left */}
    </Toolbar>
    <Box sx={{
      minHeight: `calc(100vh - ${toolbarHeight}px)`,
      display: 'grid',
      placeItems: 'center',
      alignItems: 'center',
    }}>
      <Card className='p-2' sx={{
        width: 450, position: 'relative', top: toolbarHeight / -2
      }}>
        {content}
      </Card>
    </Box>
  </Box>
}