export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("account_info");
  localStorage.removeItem("persist:root");
  window.location.href = "/";
  return true;
};