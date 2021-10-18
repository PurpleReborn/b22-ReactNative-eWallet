const initStateGlobal = {
  isErr: false,
  message: 'Error',
  isLoading: false,
};

export const global = (state = initStateGlobal, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        isErr: action.payload.isError,
        message: action.payload.message,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
