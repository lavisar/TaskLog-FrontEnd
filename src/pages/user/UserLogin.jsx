import { useRef, useState, useEffect } from 'react';
import { Box, Card, TextField, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { setCredentials, useLoginMutation } from '../../store';
import { WEBLINKS } from '../../store/constants/WebLinks';
import CustomLink from '../../components/CustomLink';

function UserLogin() {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    document.title = "Login";
    emailRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || pwd.trim() === '') {
      setErrMsg('Please fill in all fields');
      return;
    }
    try {
      const userData = await login({ username: email, password: pwd }).unwrap();

      dispatch(setCredentials({ ...userData, user: email }));
      setUser('');
      setPwd('');
      navigate(WEBLINKS.MAIN);
    } catch (err) {
      setPwd('');
      setErrMsg(err.data);
    }
  }
  const handleUserInput = e => setUser(e.target.value);
  const handlePwdInput = e => setPwd(e.target.value);

  const toolbarHeight = 80;

  const content = (
    <Box sx={{
      minHeight: '100vh',
      // minHeight: '100dvh',
    }}>
      <div id="tasklog-background"></div>

      <Toolbar sx={{ minHeight: toolbarHeight }} variant='dense'>
        <CustomLink to={WEBLINKS.SIGNUP} className="text-white bg-green-400 rounded-full px-2 py-1 m-2 hover:bg-green-600 font-bold">
          Sign Up
        </CustomLink>
      </Toolbar>
      <Box sx={{
        minHeight: `calc(100vh - ${toolbarHeight}px)`,
        display: 'grid',
        placeItems: 'center',
        alignItems: 'center',
      }}>
        <Card className='p-2' sx={{
          width: 270, position: 'relative', top: toolbarHeight / -2
        }}>
          <h1 className='text-center font-extrabold text-2xl'>Welcome back!</h1>
          <div className='p-4 text-center text-red-400'>
            <span ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='p-4'>
              <TextField
                id='email'
                type='email'
                label="Email"
                ref={emailRef}
                value={email}
                onChange={handleUserInput}
                className='w-full'
              />
            </div>

            <div className='p-4'>
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={handlePwdInput}
                value={pwd}
                className='w-full'
              />
            </div>

            <div className='text-center'>
              <LoadingButton
                type='submit'
                size='small'
                loading={isLoading}
                loadingIndicator="Loading..."
                // loadingPosition='end'
                variant='contained'
                className='!bg-green-400 !hover:bg-green-600 !rounded-full'
              >
                <span className='px-3'>Login</span>
              </LoadingButton>
            </div>
          </form>
        </Card>
      </Box>
    </Box>
  )

  return content;
}

export default UserLogin;
