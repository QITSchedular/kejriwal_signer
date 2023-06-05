// set the token in local storage to login the user
export const handleTokenResponse = (response) => {
  // Assuming the response contains the token
  const accessToken = response.token;
  const expirationTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes validity
  // const expirationTime = new Date().getTime() + 10000; // 15 minutes validity
  const tokenData = {
    accessToken,
    expirationTime,
  };
  localStorage.setItem("accessToken", JSON.stringify(tokenData));
  return null;
};

// token expiration time
export const isTokenExpired = () => {
  const tokenData = localStorage.getItem("accessToken");
  if (tokenData) {
    const { expirationTime } = JSON.parse(tokenData);
    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
  }
  return true; // Token does not exist, consider it expired
};

export const extractToken = () => {
  const tokenData = localStorage.getItem("accessToken");
  const { accessToken } = JSON.parse(tokenData);
  return accessToken;
};
export const logoutUser = () => {
  const tokenData = localStorage.removeItem("accessToken");
  return true;
};
