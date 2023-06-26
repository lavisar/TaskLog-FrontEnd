import { useRef, useState, useEffect } from 'react';
import { Box, Button, Card, TextField, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { setCredentials, useLoginMutation } from '../../store';

function UserLogin() {
  const emailRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.trim() === '' || pwd.trim() === '') {
      setErrMsg('Please fill in all fields');
      return;
    }
    try {
      const userData = await login({ username: user, password: pwd }).unwrap();

      dispatch(setCredentials({ ...userData, user }));
      setUser('');
      setPwd('');
      navigate('/teams');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }
  const handleUserInput = e => setUser(e.target.value);
  const handlePwdInput = e => setPwd(e.target.value);
  const handleSignUp = () => {
    navigate("/sign-up");
  }

  const toolbarHeight = 45;

  const content = (
    <Box sx={{
      minHeight: '100vh',
      // minHeight: '100dvh',
    }}>

      <Toolbar sx={{ minHeight: toolbarHeight }} variant='dense'>
        <Button onClick={handleSignUp}>Sign Up</Button>
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
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit}>
            <div className='p-4'>
              <TextField
                required
                id='email'
                type='email'
                label="Email"
                ref={emailRef}
                value={user}
                onChange={handleUserInput}
                autoComplete='off'
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
                required
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
                className='bg-green-400 hover:bg-green-600'
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
