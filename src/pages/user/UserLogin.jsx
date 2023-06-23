import { useRef, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/apis/features/authSlice';
import { useLoginMutation } from '../../store/apis/features/authLoginApi';

function UserLogin() {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser('');
      setPwd('');
      navigate('/teams');
    } catch (err) {

    }
  }
  const handleSignUp = () => {
    navigate("/sign-up");
  }
  return <div>
    <Button onClick={handleSignUp}>Sign Up</Button>
  </div>;
}

export default UserLogin;
