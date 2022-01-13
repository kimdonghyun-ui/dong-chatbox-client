import React, { useEffect } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_authenticated, rx_tabindex, rx_focusroom, rx_loading2 } from "../modules/chats";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Button, ListSubheader } from "@material-ui/core";

/* function */
import { cm_room_add, cm_logout } from "../helpers/common";

/* components */
import FriendItem from "./FriendItem";
import LoadingBar from "./LoadingBar";

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

const FrienList = ({all_users,rx_authenticated, me, all_rooms, all_msgs, rx_tabindex, rx_focusroom, loading2, rx_loading2}) => {
  const classes = useStyles();
  const handleFriend = (you) => {
    cm_room_add(me.id, you, all_rooms, all_msgs, rx_tabindex, rx_focusroom);
    
  };


  useEffect(() => {
    console.log("[표시]FrienList.js");

  }, []);

  return (
    <LoadingBar open={loading2}>
      <Box className={classes.root}>
        <div  className={classes.title}>
          {me.username}
          <Button onClick={() => {
              cm_logout(rx_authenticated,me,rx_loading2);
            }}>로그아웃</Button>
        </div>

        <ListSubheader component="div">전체 친구 리스트</ListSubheader>

        <List className={classes.list}>
          {all_users.length > 0 ? (
            all_users.map((user, index) => (
              <FriendItem key={index} img="https://material-ui.com/static/images/avatar/1.jpg" text={user.username} sub={user.email} id={user.id} confirmed={user.confirmed} event={handleFriend} />
            ))
          ) : (
            <li>리스트가없습니다.</li>
          )}
        </List>
      </Box>
    </LoadingBar>

  );
};

const mapStateToProps = (state) => ({
  all_users: state.chats.all_users,
  all_rooms: state.chats.all_rooms,
  all_msgs: state.chats.all_msgs,
  me: state.chats.me,
  loading2: state.chats.loading2
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_tabindex: (val) => {
    dispatch(rx_tabindex(val));
  },
  rx_focusroom: (val) => {
    dispatch(rx_focusroom(val));
  },
  rx_loading2: (val) => {
    dispatch(rx_loading2(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FrienList);