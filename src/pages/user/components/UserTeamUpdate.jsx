import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillSetting } from 'react-icons/ai';
import { CustomTextArea } from "../../../components/CustomTextArea";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setTeam, useDeleteTeamMutation, useUpdateTeamMutation } from "../../../store";
import { useNavigate } from "react-router-dom";
import { WEBLINKS } from "../../../store/constants/WebLinks";
import { TeamRole } from "../../../store/constants/Role";
import CustomLink from "../../../components/CustomLink";

export default function UserTeamUpdate({ currentMemberIsLoading }) {
  const selectDetails = createSelector(
    (state) => state.team.id,
    (state) => state.team.teamName,
    (state) => state.team.description,
    (id, teamName, description) => ({ id, teamName, description })
  )
  const { id, teamName, description } = useSelector(selectDetails);
  const currentRole = useSelector((state) => state.currentMember.teamMemberRole);

  const [formName, setName] = useState(teamName);
  const [formDescription, setDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState('');
  const [deleteHelper, setDeleteHelper] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setName(teamName);
    setDescription(description);
  }, [teamName, description]);
  useEffect(() => {
    setDeleteHelper("");
  }, [deleteTeam])

  const [update, { isLoading }] = useUpdateTeamMutation();
  const [sendDelete, { isLoading: deleteLoading }] = useDeleteTeamMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formName.trim() === '') {
      console.log("Name for the team cannot be blank");
      return;
    }
    try {
      const result = await update({ id, teamName: formName, description: formDescription }).unwrap();
      console.log(result);
      if (result?.error?.data) {
        console.log("Failed to update team");
        return;
      }
      dispatch(setTeam(result));
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE
  const deleteText = `I want to delete the team ${teamName}`;
  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleteTeam !== deleteText) {
      setDeleteHelper("Wrong input");
      return;
    }
    try {
      const result = await sendDelete(id).unwrap();
      if (result?.error?.data) {
        setDeleteHelper(result.error.data);
        return;
      }
      navigate(WEBLINKS.MAIN);
    } catch (error) {
      console.log(error);
    }
  }

  return <div>
    <div className="mb-10">
      <div className="flex items-center mb-2 justify-between">
        <Typography variant="h4">{teamName}</Typography>
        <div>
          <CustomLink to={WEBLINKS.MAIN}
            className="text-white bg-yellow-500 rounded-full p-2 hover:bg-yellow-400"
          >
            Other teams
          </CustomLink>
          {!currentMemberIsLoading
            && currentRole === TeamRole.CREATOR
            && (
              <Button
                onClick={() => setOpen(true)}
                className="!text-white !bg-green-500 hover:!bg-green-300 !rounded-full !px-3"
              >
                <AiFillSetting />
                <span className="pl-1">Team Settings</span>
              </Button>
            )}
        </div>
      </div>
      <p>{description}</p>
    </div>

    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="update-team-modal"
      aria-describedby="modal-team"
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
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <TextField
              id="name"
              label="Team Name"
              value={formName}
              onChange={e => setName(e.target.value)}
              autoComplete="off"
              className="w-full"
            />
          </div>
          <div className="p-4">
            <CustomTextArea
              id="description"
              placeholder="About your team"
              value={formDescription}
              onChange={e => setDescription(e.target.value)}
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

        <div className="border border-red-500/100 mt-10 p-2 rounded">
          <Typography variant="h6">Delete team</Typography>
          <form onSubmit={handleDelete}>
            <p>Once you delete the team, everything will be deleted, there is no going back. Please be certain.</p>
            <p>Please type <span className="select-none text-sm bg-gray-200">{deleteText}</span> in the field to delete the team</p>

            <div className="flex items-center text-sm">
              <TextField
                error
                id="delete"
                label="Delete Team"
                value={deleteTeam}
                onChange={e => setDeleteTeam(e.target.value)}
                autoComplete="off"
                className="w-full"
                variant="standard"
                helperText={deleteHelper}
              />
              <LoadingButton
                type='submit'
                size='small'
                loading={deleteLoading}
                variant='contained'
                className='!bg-red-400 hover:!bg-red-600'
              >
                <span className='text-sm'>Delete</span>
              </LoadingButton>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  </div>
}