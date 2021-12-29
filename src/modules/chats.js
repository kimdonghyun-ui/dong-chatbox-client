const RX_AUTHENTICATED = "menu/RX_AUTHENTICATED";



export const rx_authenticated = (result) => ({
    type: RX_AUTHENTICATED,
    result,
  });

  const initialState = {
    authenticated: false,
  };

  function chats(state = initialState, action) {
    switch (action.type) {
      case RX_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.result,
        };

      
      default:
        return state;
    }
  }
  
  export default chats;









