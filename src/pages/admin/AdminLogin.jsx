import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setCredentials, useLoginMutation } from "../../store";

function AdminLogin() {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('main@email.com');
  const [pwd, setPwd] = useState('password');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, [])

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
      navigate("/admin");
    } catch (err) {
      setPwd('');
      setErrMsg(err.data);
    }
  }

  const handleUserInput = e => setUser(e.target.value);
  const handlePwdInput = e => setPwd(e.target.value);
  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
        />

        <LoadingButton
          type='submit'
          size='small'
          loading={isLoading}
          loadingIndicator="Loading..."
          // loadingPosition='end'
          variant='contained'
        >
          <span className='px-3'>Login</span>
        </LoadingButton>
      </form>
    </section>
  );
  return content;
}

export default AdminLogin;