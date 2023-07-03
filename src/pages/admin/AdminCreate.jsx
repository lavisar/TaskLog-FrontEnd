import { LoadingButton } from "@mui/lab";
import { CustomTextArea } from "../../components/CustomTextArea";
import { Box, Card, TextField } from "@mui/material";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeBio, changeEmail, changePassword, changeUsername, useCreateAdminMutation } from "../../store";

export default function AdminCreate() {
  const dispatch = useDispatch();
  const selectDetails = createSelector(
    (state) => state.signupForm.email,
    (state) => state.signupForm.username,
    (state) => state.signupForm.password,
    (state) => state.signupForm.bio,
    (email, username, password, bio) => ({ email, username, password, bio })
  )
  const { email, username, password, bio } = useSelector(selectDetails);

  const emailRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  useEffect(() => {
    emailRef.current.focus();
    setErrMsg('');
  }, [])

  const pwdErrFunc = (msg) => {
    setErrMsg(msg);
    dispatch(changePassword(''));
    setConfirmPwd('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || username.trim() === '' || password.trim() === '' || confirmPwd.trim() === '') {
      setErrMsg('Please fill in all fields');
      return;
    }
    if (confirmPwd.trim() !== password.trim()) {
      pwdErrFunc('Passwords do not match');
      return;
    } else if (password.length < 8) {
      pwdErrFunc('Password must have at least 8 characters');
      return;
    } else if (!/[A-Z]/.test(password)) {
      pwdErrFunc('Password must contain at least one uppercase letter');
      return;
    } else if (!/[a-z]/.test(password)) {
      pwdErrFunc('Password must contain at least one lowercase letter');
      return;
    } else if (!/[0-9]/.test(password)) {
      pwdErrFunc('Password must contain at least one digit');
      return;
    }

    const newUser = new FormData();
    newUser.append("image", image);
    const userJson = JSON.stringify({ email, username, password, bio });
    const userBlob = new Blob([userJson], { type: "application/json" });
    newUser.append("user", userBlob);

    try {
      const result = await createAdmin(newUser).unwrap();
      if (result?.data?.error) {
        console.log(result.data.error);
        return;
      }
      console.log(result);
      dispatch(changeEmail(''));
      dispatch(changeUsername(''));
      dispatch(changePassword(''));
      setConfirmPwd('');
      dispatch(changeBio(''));
      navigate(`${WEBLINKS.ADMIN_MANAGE_ACCOUNT}/${result.id}`);
    } catch (err) {
      dispatch(changePassword(''));
      setConfirmPwd('');
      setErrMsg(err.data);
      // errRef.current.focus();
    }
  }

  const handleUploadFile = e => {
    const file = e.target.files[0];
    setImage(file);
  }

  const content = (
    <Box sx={{
      display: 'grid',
      placeItems: 'center',
      alignItems: 'center',
    }}>
      <Card className='p-2' sx={{
        width: 450, position: 'relative'
      }}>
        <h1 className='text-center font-extrabold text-2xl'>Create an admin</h1>

        <form onSubmit={handleSubmit}>
          <div className='p-4'>
            <TextField
              required
              id='email'
              type='email'
              label="Email"
              ref={emailRef}
              value={email}
              onChange={(e) => dispatch(changeEmail(e.target.value))}
              autoComplete='off'
              className='w-full'
            />
          </div>

          <div className='p-4'>
            <TextField
              required
              id='username'
              label="Username"
              value={username}
              onChange={(e) => dispatch(changeUsername(e.target.value))}
              autoComplete='off'
              className='w-full'
            />
          </div>

          <div className='p-4'>
            <TextField
              required
              id='password'
              label="Password"
              type="password"
              value={password}
              onChange={(e) => dispatch(changePassword(e.target.value))}
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

          <div className='p-4'>
            <CustomTextArea
              id="bio"
              placeholder="More about yourself"
              value={bio}
              onChange={e => dispatch(changeBio(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="p-4">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file"
                className="block w-full text-sm text-slate-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-500
                  hover:file:bg-green-100 cursor-pointer"
                id="pic"
                onChange={handleUploadFile}
              />
            </label>
          </div>

          <div className='text-center'>
            <p className="text-red-500">{errMsg}</p>
            <LoadingButton
              type='submit'
              size='small'
              loading={isLoading}
              loadingIndicator="Creating..."
              // loadingPosition='end'
              variant='contained'
              className="!bg-green-400 !hover:bg-green-600 !rounded-full"
            >
              <span className='px-5'>Create Admin</span>
            </LoadingButton>
          </div>
        </form>
      </Card>
    </Box>
  )

  return content;
}