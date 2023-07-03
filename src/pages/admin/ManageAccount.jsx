import { useNavigate, useParams } from "react-router-dom";
import { useChangeAdminRoleMutation, useDeleteUserMutation, useGetUserQuery } from "../../store";
import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { UserRole } from "../../store/constants/Role";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { MdDelete } from "react-icons/md";
import { WEBLINKS } from "../../store/constants/WebLinks";
import ImageChange from "../shared/profile/ImageChange";
import { createSelector } from "reselect";

export default function ManageAccount() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState('')
  const [roleErr, setRoleErr] = useState('');
  const [open, setOpen] = useState(false);

  const { data, isLoading, isSuccess } = useGetUserQuery(accountId);
  const [changeAdminRole, { isLoading: changingRole }] = useChangeAdminRoleMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const selectDetails = createSelector(
    (state) => state.user.id,
    (state) => state.user.role,
    (id, role) => ({ id, role })
  )
  const { id: currentId, role: currentRole } = useSelector(selectDetails);
  useEffect(() => {
    if (isSuccess) {
      document.title = `User ${data.username}`;
      setRole(data.role);
    }
  }, [isSuccess, data])

  const handleChangeRole = async (e) => {
    try {
      setRoleErr('');
      const result = await changeAdminRole({ email: data.email, role: e.target.value }).unwrap();
      if (result?.data?.error) {
        setRoleErr(result.data.error);
        return;
      }
      setRole(e.target.value);
    } catch (error) {
      setRoleErr(error.data);
    }
  }

  const handleDelete = async () => {
    try {
      const result = await deleteUser(data.id).unwrap();
      if (result?.data?.error) {
        console.log(result.data.error);
        return;
      }
      navigate(WEBLINKS.ADMIN_ALL_USERS);
    } catch (error) {
      console.log(error);
    }
  }

  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = (
      <div>
        <TableContainer component={Paper} sx={{ px: 5 }}>
          <Table sx={{ maxWidth: 1000 }}>
            <TableBody>
              <TableRow>
                <TableCell>Profile Pic</TableCell>
                <TableCell>
                  {data.pic && <div>
                    <ImageChange data={{ id: data.id, pic: data.pic, username: data.username }} admin={true} />
                  </div>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{data.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{data.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>About</TableCell>
                <TableCell>{data.bio}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>{data.createdAt}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>
                  {data.role && (
                    <div className="p-4">
                      <FormControl fullWidth>
                        <InputLabel id="user-role">Role</InputLabel>
                        <Select
                          error={roleErr !== ''}
                          disabled={
                            changingRole ||
                            (currentRole === UserRole.ADMIN && role === UserRole.MAIN) ||
                            data.id === currentId
                          }
                          labelId="user-role"
                          id="role"
                          value={role}
                          label="Role"
                          onChange={handleChangeRole}
                        >
                          <MenuItem value={UserRole.MAIN}>Main</MenuItem>
                          <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                          <MenuItem value={UserRole.USER}>User</MenuItem>
                          <MenuItem value={UserRole.BANNED}>Banned</MenuItem>
                        </Select>
                      </FormControl>
                      <p className="text-red-400">{roleErr}</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              {data.role !== UserRole.MAIN ? (
                <TableRow>
                  <TableCell>
                    <Button onClick={() => setOpen(true)} className="!rounded-full">
                      <div className="flex items-center p-3 bg-red-500 rounded-full text-white hover:bg-red-600">
                        <span className="pr-2"><MdDelete /></span>
                        Delete account
                      </div>
                    </Button>
                  </TableCell>
                </TableRow>
              ) : ''}
            </TableBody>
          </Table>
        </TableContainer>


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
                Do you want to delete this user?
              </Typography>
            </div>
            <Box className="flex mt-5 items-center justify-between">
              <LoadingButton
                loading={deleting}
                onClick={() => handleDelete()}
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
      </div>
    )
  }
  return <div>
    {content}
  </div>;
}
