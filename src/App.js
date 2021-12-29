import React, {  useEffect } from 'react';

import { HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { rx_authenticated } from "./modules/chats";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Chat from "./containers/Chat";
import { getCookie } from "./cookie";

function App({rx_authenticated, authenticated}) {

  useEffect(() => {
    if (getCookie('myToken')) {
      rx_authenticated(true);
      console.log('[appjs]토큰있으니까 로그인된거임')
    }
  }, [rx_authenticated]);
    
  
  
  return (
    <HashRouter>
      <Switch>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
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
    </HashRouter>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.chats.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);