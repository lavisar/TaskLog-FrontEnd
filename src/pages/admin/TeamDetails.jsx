import { useNavigate, useParams } from "react-router-dom"
import { useDeleteTeamMutation, useGetAllMembersDetailsQuery, useGetTeamQuery } from "../../store";
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { WEBLINKS } from "../../store/constants/WebLinks";

export default function TeamDetails() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isLoading, isSuccess, isError } = useGetTeamQuery(teamId);
  useEffect(() => {
    if (isSuccess) {
      document.title = `Team ${data.teamName}`;
    }
  }, [isSuccess, data])

  const { data: membersData, isLoading: membersIsLoading, isSuccess: membersIsSuccess, isError: membersIsError } = useGetAllMembersDetailsQuery(teamId);
  const [deleteTeam, { isLoading: deleting }] = useDeleteTeamMutation();
  const handleDelete = async (e) => {
    try {
      const result = await deleteTeam(teamId).unwrap();
      if (result?.data?.error) {
        console.log(result.data.error);
        return;
      }
      setOpen(false);
      navigate(WEBLINKS.ADMIN_ALL_TEAMS);
    } catch (error) {
      console.log(error)
    }
  }

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 800 }}>
          <TableBody>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>{data.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>{data.teamName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{data.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>{data.createdAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  } else if (isError) {
    content = <p className="text-red-500">Error</p>
  }

  let members;
  if (membersIsLoading) {
    members = <p>Loading...</p>
  } else if (membersIsError) {
    members = <p>Error loading members</p>
  } else if (membersIsSuccess) {
    console.log(membersData);
    members = <Paper className="my-5">
      <Typography variant="h6">Team members</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell>Added At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membersData.map(m => (
              <TableRow key={m.teamMemberId}>
                <TableCell>{m.userId}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.username}</TableCell>
                <TableCell>{m.addedBy}</TableCell>
                <TableCell>{m.addedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

  }
  return <div>
    {content}
    {members}
    <Paper>
      <Button onClick={() => setOpen(true)} className="!rounded-full">
        <div className="flex items-center p-3 bg-red-500 rounded-full text-white hover:bg-red-600">
          <span className="pr-2"><MdDelete /></span>
          Delete team
        </div>
      </Button>


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-user-modal"
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
          <div>
            <Typography id="remove-member-modal" variant="h6" className="text-center">
              Do you want to delete this team?
            </Typography>
          </div>
          <Box className="flex mt-5 items-center justify-between">
            <LoadingButton
              loading={deleting}
              onClick={handleDelete}
              loadingIndicator="Deleting..."
              variant="contained"
              color="error"
              className=""
            >
              Delete
            </LoadingButton>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  </div>
}