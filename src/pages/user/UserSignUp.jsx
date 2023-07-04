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
  const [errMsg, setErrMsg] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignUpMutation();

  useEffect(() => {
    document.title = "Sign Up";
    emailRef.current.focus();
    setErrMsg('');
  }, [])

  // function validatePassword(pw) {
  //   return /[A-Z]/.test(pw) &&
  //     /[a-z]/.test(pw) &&
  //     /[0-9]/.test(pw) &&
  //     /[^A-Za-z0-9]/.test(pw) &&
  //     pw.length >= 8;
  // }
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
  const toolbarHeight = 80;
  const content = (
    <Box sx={{
      minHeight: '100vh',
    }}>
      <div id="tasklog-background"></div>

      <Toolbar sx={{ minHeight: toolbarHeight }} variant='dense'>
        <CustomLink to={WEBLINKS.LOGIN} className="text-white bg-green-400 rounded-full px-2 py-1 m-2 hover:bg-green-600 font-bold">
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
