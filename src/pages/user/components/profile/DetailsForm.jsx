import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, useUpdateUserMutation } from "../../../../store";
import { TextField } from "@mui/material";
import { CustomTextArea } from "../../../../components/CustomTextArea";
import { LoadingButton } from "@mui/lab";

export default function DetailsForm({ data }) {
  const dispatch = useDispatch();
  const [formUsername, setFormUsername] = useState(data.username);
  const [formBio, setFormBio] = useState(data.bio);
  const [usernameError, setUsernameError] = useState('');

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
    <form onSubmit={handleSubmit}>
      <div className='p-4'>
        <TextField
          disabled
          required
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
    </form>)
}