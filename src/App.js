import React, {  useEffect } from 'react';

import { HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { rx_authenticated, rx_me } from "./modules/chats";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
// import Chat from "./containers/Chat";
import Chatbox from "./containers/Chatbox";

import { getCookie } from "./cookie";
import {
  CircularProgress,
  Box
} from "@material-ui/core";
function App({rx_authenticated, authenticated, big_loading, rx_me}) {

  useEffect(() => {
    if (getCookie('myToken')) {
      rx_authenticated(true);
      rx_me(getCookie('me'));
      console.log('[appjs]토큰있으니까 로그인된거임!')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  
  
  return (
    <HashRouter>
      {big_loading ? (
          <Box
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ):(
        <Switch>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chatbox}
        />
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        />
        <PublicRoute
          path={["/", "/login"]}
          authenticated={authenticated}
          component={Login}
        />
      </Switch>

      )}


{/* loading */}

    </HashRouter>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.chats.authenticated,
  big_loading: state.chats.big_loading
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_me: (val) => {
    dispatch(rx_me(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);