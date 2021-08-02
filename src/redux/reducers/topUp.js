const initialState = {
  data: [],
  msg: '',
};

const topUp = (state = initialState, action) => {
  switch (action.type) {
    case 'TOPUP': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TOPUP_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default topUp;
