export const currentEnvName = process.env.REACT_APP_STAGE || "testing";
export const currentEnv = {
  REST_FULL_API_URL: process.env.REACT_APP_API_URL,
  REST_FULL_STATIC_API_URL: process.env.REACT_APP_STATIC_URL,
  RETURN_URL: process.env.REACT_APP_RETURN_URL
};
export const reduxCacheKey = "_persist"; // Pass to reducer key if want to cache it reducer
