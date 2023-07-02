import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setUser, useUpdateUserMutation } from "../../../store";
import { CustomTextArea } from "../../../components/CustomTextArea"
import { UserRole } from "../../../store/constants/Role";

export default function DetailsForm({ data }) {
  const dispatch = useDispatch();
  const [formUsername, setFormUsername] = useState(data.username);
  const [formBio, setFormBio] = useState(data.bio);
  const [usernameError, setUsernameError] = useState('');
  const [role, setRole] = useState(data.role);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [requestError, setRequestError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formUsername.trim() === '') {
      console.log('Submit');
      setUsernameError("Username cannot be blank");
      return;
    }
    const updateDetails = new FormData();
    const userJson = JSON.stringify({ username: formUsername, bio: formBio });
    const userBlob = new Blob([userJson], { type: "application/json" });
    updateDetails.append("user", userBlob);
    try {
      const result = await updateUser(updateDetails).unwrap();
      if (result?.error?.data) {
        setRequestError(result.error.data);
        return;
      }
      dispatch(setUser(result));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography variant="h6" className="!ml-4" >Profile details</Typography>
      <form onSubmit={handleSubmit}>
        <div className='p-4'>
          <TextField
            disabled
            id='email'
            type='email'
            label="Email"
            value={data.email}
            autoComplete='off'
            className='w-full'
          />
        </div>

        <div className='p-4'>
          <TextField
            error={formUsername === ''}
            helperText={usernameError}
            id='username'
            label="Username"
            value={formUsername}
            onChange={(e) => {
              setUsernameError('')
              return setFormUsername(e.target.value)
            }}
            autoComplete='off'
            className='w-full'
          />
        </div>

        <div className='p-4'>
          <CustomTextArea
            id="bio"
            placeholder="More about yourself"
            value={formBio}
            onChange={e => setFormBio(e.target.value)}
            className="w-full"
          />
        </div>

        <div className='text-center'>
          {requestError ? (
            <p className="text-red-300 text-sm">{requestError}</p>
          ) : ''}
          <LoadingButton
            type='submit'
            size='small'
            loading={isLoading}
            loadingIndicator="Saving..."
            // loadingPosition='end'
            variant='contained'
            className="!bg-green-400 !hover:bg-green-600 !rounded-full"
          >
            <span className='px-5'>Save change</span>
          </LoadingButton>
        </div>
      </form>

      {data.role && (
        <div className="p-4">
          <FormControl fullWidth>
            <InputLabel id="user-role">Role</InputLabel>
            <Select
              disabled
              labelId="user-role"
              id="role"
              value={role}
              label="Role"
              onChange={e => setRole(e.target.value)}
            >
              <MenuItem value={UserRole.MAIN}>Main</MenuItem>
              <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
              <MenuItem value={UserRole.USER}>USER</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  )
}