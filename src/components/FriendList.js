import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import { connect } from "react-redux";
import { rx_authenticated } from "../modules/chats";

import FriendItem from "./FriendItem";
import { delCookie } from "../cookie";

import { Box, List, Button } from "@material-ui/core";

// import { CM_me_connected, CM_logout } from "../helpers/common";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '26px'
  },
  list: {
    position: 'absolute',
    top: '98px',
    bottom: '72px',
    left: '24px',
    right: '25px',
    overflowY: "scroll",
  },
  divider: {
    // margin: '20px 0',
  },
  title: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '50px',
    padding:'0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: '20px',
    fontWeight:'bold',
    "& button": {
      position: 'absolute',
      right: '10px',
      color:'#fff'
    }
  }
}));

const FriendList = ({users, me, rx_authenticated}) => {
  const classes = useStyles();



  useEffect(() => {
    console.log("[표시]FriendList.js");

  }, []);

  return (
    <Box className={classes.root}>
      <div  className={classes.title}>
        {me.username}
        <Button onClick={() => {
            delCookie('me');
            delCookie('myToken');
            rx_authenticated(false);
          }}>로그아웃</Button>
      </div>
      <ListSubheader component="div">전체 친구 리스트</ListSubheader>

      <List className={classes.list}>
       
        {users.length > 0 ? (
          users.map((user, index) => (
            <FriendItem img="https://material-ui.com/static/images/avatar/1.jpg" text={user.username} sub={user.email} />
          ))
        ) : (
          <li>리스트가없습니다.</li>
        )}
      </List>

    </Box>
  );
};

// const mapStateToProps = (state) => ({
//   all_users: state.chats.all_users,
// });

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
});

export default connect(null, mapDispatchToProps)(FriendList);