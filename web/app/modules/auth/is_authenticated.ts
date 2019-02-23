export const isAuthenticated = () => {
   const accessToken = localStorage.getItem("accessToken");
   return Boolean(accessToken);
};
