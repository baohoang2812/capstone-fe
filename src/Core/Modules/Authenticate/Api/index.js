import axios from "axios";

/* Configs */
import { currentEnv } from "~/Configs";

export function login(body) {
  return axios.post(`${currentEnv.REST_FULL_API_URL}/auth/login`, body);
}
