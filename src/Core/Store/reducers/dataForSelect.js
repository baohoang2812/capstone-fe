import {
  GET_DATA_FOR_SELECT_SUCCESS,
  ADD_DATA_FOR_SELECT_SUCCESS,
  UPDATE_DATA_FOR_SELECT_SUCCESS
} from "~/Core/Store/actions/dataForSelect";

/**
 * @var {string} key key select data
 * @var {Object} initialState
 * @property {Array<any>} initialState[key]
 */
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FOR_SELECT_SUCCESS: {
      const {
        key,
        list = []
      } = action.payload;
      const newState = { ...state, [key]: list };

      return newState;
    }
    case ADD_DATA_FOR_SELECT_SUCCESS: {
      const {
        key,
        data
      } = action.payload;
      const newlist = [data, ...(state[key] || [])];
      const newState = { ...state, [key]: newlist };

      return newState;
    }
    case UPDATE_DATA_FOR_SELECT_SUCCESS: {
      const {
        key,
        data,
        customFindKey = "id",
        customFindValue
      } = action.payload;
      const newlist = (state[key] || []).map((item) => {
        if (customFindValue && customFindValue === item[customFindKey]) return data;
        if (item[customFindKey] === data[customFindKey]) return data;
        return item;
      });
      const newState = { ...state, [key]: newlist };

      return newState;
    }
    default:
      return state;
  }
}