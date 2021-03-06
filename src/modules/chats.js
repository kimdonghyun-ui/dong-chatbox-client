const RX_AUTHENTICATED = "menu/RX_AUTHENTICATED";
const RX_LOADING1 = "menu/RX_LOADING1";
const RX_LOADING2 = "menu/RX_LOADING2";
const RX_LOADING3 = "menu/RX_LOADING3";
const RX_ALL_USERS = "menu/RX_ALL_USERS";
const RX_ALL_ROOMS = "menu/RX_ALL_ROOMS";
const RX_ALL_MSGS = "menu/RX_ALL_MSGS";

const RX_ME = "menu/RX_ME";
const RX_FOCUSROOM = "menu/RX_FOCUSROOM";
const RX_TABINDEX = "menu/RX_TABINDEX";


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

export const rx_all_msgs = (result) => ({
  type: RX_ALL_MSGS,
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





  const initialState = {
    authenticated: false,
    loading1: false,
    loading2: false,
    loading3: false,
    all_users: [],
    all_rooms: [],
    all_msgs:[],
    me:{},
    focusroom: 0,
    tabindex:0,
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
        case RX_ALL_MSGS:
          return {
            ...state,
            all_msgs: action.result,
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


      default:
        return state;
    }
  }
  
  export default chats;









