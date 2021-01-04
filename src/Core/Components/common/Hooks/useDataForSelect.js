import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* Selectors */
import {
  select_option_data_for_select_fields
} from "~/Core/Store/selectors/dataForSelect";
import { create_loading_error_selector } from "~/Core/Store/selectors/loadingError";

/* Actions */
import { get_data_for_select_action } from "~/Core/Store/actions/dataForSelect";

/**
 * @param {string} key key for select
 * @param {function} method
 * @param {Object} where
 * @param {number} pageSize number record want to get
 * @param {boolean} disableOtherLoading disable other loading using data selector
 * @param {string} loadingWhenEquaKey
 */
export function useDataForSelect(
  key,
  method,
  where,
  pageSize,
  disableOtherLoading,
  loadingWhenEquaKey
) {

  /* Redux */
  const dispatch = useDispatch();
  let loading = useSelector(state => create_loading_error_selector([
    "GET_DATA_FOR_SELECT"
  ])(state.LoadingHandler));
  const data = useSelector(select_option_data_for_select_fields(key));
  const selectorLoading = disableOtherLoading ? (
    data.length === 0 && loading
  ) : loading;

  useEffect(() => {
    if (data.length === 0) {
      dispatch(get_data_for_select_action(key, method, where, pageSize));
    }
  }, [key])

  return [data, selectorLoading];
}