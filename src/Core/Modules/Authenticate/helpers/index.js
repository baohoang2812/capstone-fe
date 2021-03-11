import jwt_decode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setAccountInfo = (user) => {
  localStorage.setItem("account_info", JSON.stringify(user));
};

export const setImportStatus = (importStatus) => {
  localStorage.setItem("import_status", importStatus);
};

export const getAccountInfo = (user) => {
  return JSON.parse(localStorage.getItem("account_info"));
};

export const setPermissionsAccountInfo = (permissions) => {
  localStorage.setItem("permissions", JSON.stringify(permissions));
};

export const getPermissionsAccountInfo = (permissions) => {
  return JSON.parse(localStorage.getItem("permissions"));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const checkLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token !== null && token !== undefined) {
    return true;
  }
  return false;
};

export const checkRole = (roleName) => {
  const token = localStorage.getItem("token" || "");
  const { roleName: role } = jwt_decode(token);
  
  return roleName?.find(item => item.toLowerCase() === role.toLowerCase()) !== undefined;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("account_info");
  localStorage.removeItem("persist:root");
  window.location.href = "/";
  return true;
};
