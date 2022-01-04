const RX_AUTHENTICATED = "menu/RX_AUTHENTICATED";
const RX_BIG_LOADING = "menu/RX_BIG_LOADING";
const RX_ALL_USERS = "menu/RX_ALL_USERS";
const RX_ALL_ROOMS = "menu/RX_ALL_ROOMS";
const RX_ME = "menu/RX_ME";
const RX_FOCUSROOM = "menu/RX_FOCUSROOM";

export const rx_authenticated = (result) => ({
    type: RX_AUTHENTICATED,
    result,
});

export const rx_big_loading = (result) => ({
  type: RX_BIG_LOADING,
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



  const initialState = {
    authenticated: false,
    big_loading: false,
    all_users: [],
    all_rooms: [],
    me:{},
    focusroom: 0,
  };

  function chats(state = initialState, action) {
    switch (action.type) {
      case RX_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.result,
        };
        case RX_BIG_LOADING:
          return {
            ...state,
            big_loading: action.result,
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




      default:
        return state;
    }
  }
  
  export default chats;









