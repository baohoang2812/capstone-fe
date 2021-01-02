const defaultValue = []

export const select_option_data_for_select_fields = (key) => (state) => {
  return state.dataForSelect[key] || defaultValue;
}
