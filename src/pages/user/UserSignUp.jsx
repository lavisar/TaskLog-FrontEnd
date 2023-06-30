import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, TextField, Toolbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomLink from "../../components/CustomLink";
import { createSelector } from "reselect";
import { changeBio, changeEmail, changePassword, changeUsername, useSignUpMutation } from "../../store";
import { CustomTextArea } from "../../components/CustomTextArea";
import { WEBLINKS } from "../../store/constants/WebLinks";

function UserSignUp() {
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
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignUpMutation();

  useEffect(() => {
    emailRef.current.focus();
    setErrMsg('');
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || username.trim() === '' || password.trim() === '' || confirmPwd.trim() === '') {
      setErrMsg('Please fill in all fields');
      return;
    }
    if (confirmPwd.trim() !== password.trim()) {
      setErrMsg('Passwords do not match');
      return;
    }
    const newUser = new FormData();
    newUser.append("image", image);
    const userJson = JSON.stringify({ email, username, password, bio });
    const userBlob = new Blob([userJson], { type: "application/json" });
    newUser.append("user", userBlob);

    try {
      await signup(newUser).unwrap();
      dispatch(changeEmail(''));
      dispatch(changeUsername(''));
      dispatch(changePassword(''));
      setConfirmPwd('');
      dispatch(changeBio(''));
      navigate('/login');
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

  // styling
  const toolbarHeight = 45;
  const content = (
    <Box sx={{
      minHeight: '100vh',
      // minHeight: '100dvh',
    }}>

      <Toolbar sx={{ minHeight: toolbarHeight }} variant='dense'>
        <CustomLink to={WEBLINKS.LOGIN}>
          Login
        </CustomLink>
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
          <h1 className='text-center font-extrabold text-2xl'>Create an account</h1>

          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

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
                  hover:file:bg-green-100"
                  id="pic"
                  onChange={handleUploadFile}
                />
              </label>
            </div>

            <div className='text-center'>
              <LoadingButton
                type='submit'
                size='small'
                loading={isLoading}
                loadingIndicator="Creating account..."
                // loadingPosition='end'
                variant='contained'
                className="!bg-green-400 !hover:bg-green-600 !rounded-full"
              >
                <span className='px-5'>Sign Up</span>
              </LoadingButton>
            </div>
          </form>
        </Card>
      </Box>
    </Box>
  )

  return content;
}

export default UserSignUp;
