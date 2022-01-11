const RX_AUTHENTICATED = "menu/RX_AUTHENTICATED";
const RX_LOADING1 = "menu/RX_LOADING1";
const RX_LOADING2 = "menu/RX_LOADING2";
const RX_LOADING3 = "menu/RX_LOADING3";
const RX_ALL_USERS = "menu/RX_ALL_USERS";
const RX_ALL_ROOMS = "menu/RX_ALL_ROOMS";
const RX_ME = "menu/RX_ME";
const RX_FOCUSROOM = "menu/RX_FOCUSROOM";
const RX_TABINDEX = "menu/RX_TABINDEX";
const RX_MSGBOX = "menu/RX_MSGBOX";


export const rx_authenticated = (result) => ({
    type: RX_AUTHENTICATED,
    result,
});

export const rx_loading1 = (result) => ({
  type: RX_LOADING1,
  result,
});
export const rx_loading2 = (result) => ({
  type: RX_LOADING2,
  result,
});
export const rx_loading3 = (result) => ({
  type: RX_LOADING3,
  result,
});

export const rx_all_users = (result) => ({
  type: RX_ALL_USERS,
  result,
});

export const rx_all_rooms = (result) => ({
  type: RX_ALL_ROOMS,
  result,
});

export const rx_me = (result) => ({
  type: RX_ME,
  result,
});

export const rx_focusroom = (result) => ({
  type: RX_FOCUSROOM,
  result,
});

export const rx_tabindex = (result) => ({
  type: RX_TABINDEX,
  result,
});

export const rx_msgbox = (result) => ({
  type: RX_MSGBOX,
  result,
});



  const initialState = {
    authenticated: false,
    loading1: false,
    loading2: false,
    loading3: false,
    all_users: [],
    all_rooms: [],
    me:{},
    focusroom: 0,
    tabindex:0,
    msgbox:[]
  };

  function chats(state = initialState, action) {
    switch (action.type) {
      case RX_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.result,
        };
        case RX_LOADING1:
          return {
            ...state,
            loading1: action.result,
        };
        case RX_LOADING2:
          return {
            ...state,
            loading2: action.result,
        };
        case RX_LOADING3:
          return {
            ...state,
            loading3: action.result,
          };
        case RX_ALL_USERS:
          return {
            ...state,
            all_users: action.result,
        };
        case RX_ALL_ROOMS:
          return {
            ...state,
            all_rooms: action.result,
        };
        case RX_ME:
          return {
            ...state,
            me: action.result,
        };
        case RX_FOCUSROOM:
          return {
            ...state,
            focusroom: action.result,
        };
        case RX_TABINDEX:
          return {
            ...state,
            tabindex: action.result,
        };
        case RX_MSGBOX:
          return {
            ...state,
            msgbox: action.result,
            // msgbox: (action.result[0].length > 0 && action.result[1] > 0) ? action.result[0].filter((item) => item.id === action.result[1])[0].attributes.msglist : [],
        };

      default:
        return state;
    }
  }
  
  export default chats;









