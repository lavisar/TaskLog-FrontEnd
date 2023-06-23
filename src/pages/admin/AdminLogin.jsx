import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/apis/features/authSlice";
import { useLoginMutation } from "../../store/apis/features/authLoginApi";

function AdminLogin() {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
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

      dispatch(setCredentials({ ...userData, user: user }));
      setUser('');
      setPwd('');
      navigate("/admin/main");
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
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
  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="login">
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
        <button>Sign In</button>
      </form>
    </section>
  );
  return content;
}

export default AdminLogin;