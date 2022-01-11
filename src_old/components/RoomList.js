import React, { useEffect } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_authenticated, rx_all_users, rx_focusroom, rx_tabindex } from "../modules/chats";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Button, ListSubheader } from "@material-ui/core";

/* function */
import { socket } from "../helpers/common";

/* components */
import RoomItem from "./RoomItem";
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

const RoomList = ({rooms, me, btn_logout, all_users, rx_focusroom, rx_tabindex, loading3}) => {
  const classes = useStyles();

  const hendle_focusroom = (i) => {
    rx_tabindex(2);
    rx_focusroom(i);
    console.log('방버튼')
    socket.emit('joinRoom',{
      Room: i,
      NickName: me.username
    });

  }

  useEffect(() => {
    console.log("[표시]RoomList.js");

  }, []);

  return (
    <LoadingBar open={loading3}>
      <Box className={classes.root}>
        <div  className={classes.title}>
          {me.username}
          <Button onClick={() => {
              btn_logout();
            }}>로그아웃</Button>
        </div>
        <ListSubheader component="div">전체 친구 리스트</ListSubheader>

        <List className={classes.list}>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <RoomItem key={index} img="https://material-ui.com/static/images/avatar/1.jpg" room={room} all_users={all_users} event={hendle_focusroom} />
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
  me: state.chats.me,
  loading3: state.chats.loading3
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_all_users: (val) => {
    dispatch(rx_all_users(val));
  },
  rx_focusroom: (val) => {
    dispatch(rx_focusroom(val));
  },
  rx_tabindex: (val) => {
    dispatch(rx_tabindex(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);