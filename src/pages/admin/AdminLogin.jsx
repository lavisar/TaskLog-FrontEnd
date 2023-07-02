import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setCredentials, useLoginMutation } from "../../store";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { Box, Card, TextField } from "@mui/material";

function AdminLogin() {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || pwd.trim() === '') {
      setErrMsg('Please fill in all fields');
      return;
    }
    try {
      const result = await login({ username: email, password: pwd }).unwrap();
      dispatch(setCredentials({ ...result, user: email }));
      setEmail('');
      setPwd('');
      navigate(WEBLINKS.ADMIN_MAIN);
    } catch (err) {
      if (err.status === 401) {
        setErrMsg("Invalid email or password");
      }
      setPwd('');
    }
  }

  const content = (
    <Box sx={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      alignItems: 'center',
    }}>
      <Card className='p-2' sx={{
        width: 270, position: 'relative'
      }}>
        <h1 className='text-center font-extrabold text-2xl'>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='p-4'>
            <TextField
              id='email'
              type='email'
              label="Email"
              ref={emailRef}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full'
              required
            />
          </div>

          <div className='p-4'>
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={e => setPwd(e.target.value)}
              value={pwd}
              className='w-full'
              required
            />
          </div>

          <div className='text-center'>
            <p className="text-red-500 mb-1">{errMsg}</p>
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
  )
  return content;
}

export default AdminLogin;