const initialState = {
  dataRecipient: [],
  dataSender: [],
  msgRecipient: '',
  msgSender: '',
  msg: '',
  pageInfo: {},
  search: [],
  pageInfoSearch: {},
};

const transfers = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSFER_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSFER_HISTORY_BY_RECIPIENT': {
      return {
        ...state,
        dataRecipient: action.payload.results,
        msgRecipient: action.payload.message,
      };
    }
    case 'TRANSFER_HISTORY_BY_RECIPIENT_FAILED': {
      return {
        ...state,
        msgRecipient: action.payload,
      };
    }
    case 'TRANSFER_HISTORY_BY_SENDER': {
      return {
        ...state,
        dataSender: action.payload.results,
        // dataSender: [...state.dataSender, ...action.payload.results],
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'TRANSFER_HISTORY_BY_SENDER2': {
      return {
        ...state,
        search: action.payload.results,
        // dataSender: [...state.dataSender, ...action.payload.results],
        pageInfoSearch: action.payload.pageInfo,
      };
    }
    case 'TRANSFER_HISTORY_BY_SENDER_FAILED': {
      return {
        ...state,
        msgSender: action.payload,
      };
    }
    case 'TRANSACTION_RESET': {
      return {
        ...state,
        msg: '',
        msgSender: '',
        msgRecipient: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transfers;
