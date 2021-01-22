import axios from "axios";

/* Configs */
import { currentEnv } from "~/Configs";

export function login(body) {
  return axios.post(`${currentEnv.REST_FULL_API_URL}/v1/auth/login`, body);
}
