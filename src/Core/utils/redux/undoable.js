export default function undoable(reducer, namespace = "", defaultAction = []) {
  const initialState = {
    defaultState: [],
    past: [],
    present: reducer(undefined, {}),
    future: [],
    changed: false
  }

  return function (state = initialState, action) {
    const { past, present, future, defaultState, changed } = state;

    switch (action.type) {
      case namespace + "_UNDO": {
        const newPast = [...past];
        const previous = newPast.pop();

        return {
          defaultState,
          past: newPast,
          present: previous,
          future: [present, ...future],
          changed
        }
      }
      case namespace + "_REDO": {
        const next = future[0];
        const newFuture = future.slice(1);

        return {
          defaultState,
          past: [...past, present],
          present: next,
          future: newFuture,
          changed
        }
      }
      case namespace + "_DEFAULT" : {
        return {
          defaultState,
          past: [],
          present: defaultState,
          future: [],
          changed: false
        }
      }
      case namespace + "_RESET_CHANGE": {
        return {
          defaultState,
          past,
          present,
          future,
          changed: false
        }
      }
      default: {
        const newPresent = reducer(present, action);

        if (present === newPresent) {
          return state;
        }

        if (defaultAction.includes(action.type)) {
          return {
            defaultState: newPresent,
            past: [],
            present: newPresent,
            future: [],
            changed: false
          }
        }

        return {
          defaultState,
          past: [...past, present],
          present: newPresent,
          future: [],
          changed: true
        }
      }
    }
  }
}