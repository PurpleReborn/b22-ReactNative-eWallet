const initialState = {
  msg: '',
};

const trx = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTION': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSACTION_FAILED': {
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

export default trx;
