import axios from "axios";
import { API_INSTANCE } from "./apisConst";
import { logOut, setCredentials, store } from "../..";

const authRequest = async (path, method, type, body) => {
  const token = store.getState().auth.token;
  let response;
  await axios({
    url: `${API_INSTANCE.BASE_URL}/${path}`,
    method,
    responseType: type,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => (response = err));
  return response;
};

const authRequestWithReauth = async (path, method, type, body) => {
  // 1 try
  let result = await authRequest(path, method, type, body);

  // if failed
  if (result?.response.status === 401) {
    const refreshToken = store.getState().auth.refreshToken;
    if (refreshToken) {
      try {
        // send refresh token
        await axios
          .post(`${API_INSTANCE.BASE_URL}/auth/refreshtoken`, { refreshToken })
          .then(async (res) => {
            // on success save in credentials
            console.log(res);
            const user = store.getState().auth.user;
            store.dispatch(setCredentials({ ...res.data, user }));

            // retry
            result = await authRequest(path, method, type, body);
          })
          .catch((err) => {
            store.dispatch(logOut());
          });
      } catch (error) {
        store.dispatch(logOut());
      }
    }
  }
  console.log(result);
  return result;
};

export { authRequestWithReauth };
