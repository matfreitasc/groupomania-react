import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
<<<<<<< HEAD
    const response = await axios.get('/auth/', {
=======
    const response = await axios.get('/auth/refresh', {
>>>>>>> master
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        userId: response.data.userId,
        username: response.data.username,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
