import { useParams } from "react-router-dom";
import { useChangeAdminRoleMutation, useGetUserQuery } from "../../store";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { UserRole } from "../../store/constants/Role";
import { useSelector } from "react-redux";

export default function ManageAccount() {
  const { accountId } = useParams();
  const [role, setRole] = useState('')
  const { data, isLoading, isSuccess } = useGetUserQuery(accountId);
  const [changeAdminRole, { isLoading: changingRole }] = useChangeAdminRoleMutation();
  const currentRole = useSelector((state) => state.user.role);
  useEffect(() => {
    if (isSuccess) {
      setRole(data.role);
    }
  }, [isSuccess, data])

  const handleChangeRole = async (e) => {
    try {
      const result = await changeAdminRole({ email: data.email, role: e.target.value }).unwrap();
      if (result) {
        setRole(e.target.value);
      }
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
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
                          disabled={changingRole || currentRole !== UserRole.MAIN}
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
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
  return <div>
    {content}
  </div>;
}
