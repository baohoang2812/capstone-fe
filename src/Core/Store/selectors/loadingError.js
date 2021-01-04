export const create_loading_error_selector = (actions) => {
  return (data) => actions.some((action) => data[action])
}