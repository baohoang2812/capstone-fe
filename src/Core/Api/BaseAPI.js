import axios from "axios";
import { currentEnv } from "~/Configs";
// import { logout } from "~/Core/utils/helper/authenticate";

const serialize = (obj) => {
  if (obj && obj !== {}) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return `?${str.join("&")}`;
  }
  return "";
}
const generate_options = (opts = {}) => {
  let headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };
  console.log(opts)
  if (opts.headers) {
    headers = {
      ...headers,
      ...opts.headers
    };
  }
  
  delete opts.headers;

  return {
    headers,
    ...opts
  };
};

axios.interceptors.response.use((config) => {
  return config;
}, (error) => {
  const { response } = error;

  if (response?.status === 401 || response?.statusCode === 401) {
    // logout();
    return error;
  } else {
    throw error;
  }
});

const get_prefix = (apiVersion, customPrefix, path) => {
  let prefix = customPrefix || currentEnv.REST_FULL_API_URL;

  return `${prefix}${path}`;
}

const get = (apiVersion, customPrefix) => async (path, params, opts) => {
  console.log(opts)
  try {
    const response = await axios.get(
      get_prefix(apiVersion, customPrefix, path) + serialize(params),
      generate_options(opts)
    );

    const { data } = response;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const post = (apiVersion, customPrefix) => async (path, body, opts) => {
  try {
    const response = await axios.post(
      get_prefix(apiVersion, customPrefix, path),
      body,
      generate_options(opts)
    );

    const { data } = response;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const put = (apiVersion, customPrefix) => async (path, body, opts) => {
  try {
    const response = await axios.put(
      get_prefix(apiVersion, customPrefix, path),
      body,
      generate_options(opts)
    );

    const { data } = response;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const del = (apiVersion, customPrefix) => async (path, body, opts) => {
  try {
    const response = await axios.delete(
      get_prefix(apiVersion, customPrefix, path),
      { data: body },
      generate_options(opts)
    );

    const { data } = response;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const upload_image = (apiVersion, customPrefix) => async (file) => {
  let prefix = customPrefix || currentEnv.REST_FULL_API_URL;
  const formData = new FormData();
  formData.append("file", file, `${+new Date()}_${file.name}`);

  try {
    const { data } = await axios.post(
      `${prefix}/file/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      id: data[0]?.id,
      url: data[0]?.relative_url
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

function initBaseApi(apiVersion, customPrefix) {
  return {
    get: get(apiVersion, customPrefix),
    post: post(apiVersion, customPrefix),
    del: del(apiVersion, customPrefix),
    put: put(apiVersion, customPrefix),
    upload_image: upload_image(apiVersion, customPrefix)
  };
}

export default class BaseAPI {

  constructor(apiVersion, customPrefix) {
    this.initApi = initBaseApi(apiVersion, customPrefix);
    this.onInit();
  }

  onInit() {}

  requestUrl(url) {
    this.baseUrl = url;
    return this;
  }

  add = (entity, options = {}, opts) => {
    if (options.formData) {
      return this.initApi.post(`${this.baseUrl}`, options.formData, opts);
    }
    return this.initApi.post(`${this.baseUrl}`, { ...entity }, opts);
  };

  update = ({ id, ...rest }, options = {}, opts) => {
    if (options.formData) {
      return this.initApi.put(`${this.baseUrl}/${id}`, options.formData, opts);
    }
    return this.initApi.put(`${this.baseUrl}/${id}`, { ...rest }, opts);
  };

  deleteByIds = (ids, options = {}, opts) => {
    return this.initApi.post(`${this.baseUrl}/deleteByIds`, { ids }, opts);
  };

  getOne = (filter, opts) => {
    return this.initApi.post(`${this.baseUrl}/list`, filter, opts);
  }
    
  getList = (filter, opts) => {
    return this.initApi.post(`${this.baseUrl}/list`, filter, opts);
  }

  uploadImage = (file) => {
    return this.initApi.upload_image(file)
  }
}
