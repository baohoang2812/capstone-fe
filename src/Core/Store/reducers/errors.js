export default function errors(state = {}, action) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;
  
  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'FAILURE',
  }
}