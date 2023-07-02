import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useChangePasswordMutation } from "../../../store";

export default function PasswordChange() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [err, setErr] = useState('');

  const [changePwd, { isLoading }] = useChangePasswordMutation();
  // function validatePassword(pw) {
  //   return /[A-Z]/.test(pw) &&
  //     /[a-z]/.test(pw) &&
  //     /[0-9]/.test(pw) &&
  //     /[^A-Za-z0-9]/.test(pw) &&
  //     pw.length >= 8;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPwd === newPwd) {
      setErr("New password is the same as current password");
      return;
    } else if (newPwd !== confirmPwd) {
      setErr("Password does not match");
      return;
    } else if (newPwd.length < 8) {
      setErr(true);
      return;
    } else if (!/[A-Z]/.test(newPwd)) {
      setErr('Password must contain at least one uppercase letter');
      return;
    } else if (!/[a-z]/.test(newPwd)) {
      setErr('Password must contain at least one lowercase letter');
      return;
    } else if (!/[0-9]/.test(newPwd)) {
      setErr('Password must contain at least one digit');
      return;
    }

    try {
      const result = await changePwd({ oldPassword: currentPwd, newPassword: newPwd }).unwrap();
      if (result?.data?.error) {
        setErr(result?.data?.error);
      }
      if (result === true) {
        setErr('');
      }
    } catch (error) {
      setErr(error.data);
    }
  }
  return (
    <div className="mt-5">
      <Typography variant="h6" className="!ml-4">Change Password</Typography>
      <form onSubmit={handleSubmit}>
        <div className='p-4'>
          <TextField
            required
            id='currentPwd'
            label="Current Password"
            type="password"
            value={currentPwd}
            onChange={e => setCurrentPwd(e.target.value)}
            autoComplete='off'
            className='w-full'
          />
        </div>

        <div className='p-4'>
          <TextField
            required
            id='password'
            label="New Password"
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            autoComplete='off'
            className='w-full'
          />
        </div>
        <div className='p-4'>
          <TextField
            required
            id='confirmPassword'
            label="Confirm Your Password"
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            autoComplete='off'
            className='w-full'
          />
        </div>

        <div className='text-center'>
          {err && <p className="text-red-500">{err}</p>}
          <LoadingButton
            type='submit'
            size='small'
            loading={isLoading}
            loadingIndicator="Changing..."
            // loadingPosition='end'
            variant='contained'
            className="!bg-green-400 !hover:bg-green-600 !rounded-full"
          >
            <span className='px-5'>Change Password</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}