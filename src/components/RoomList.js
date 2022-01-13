import React, { useEffect, useState } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_authenticated, rx_focusroom, rx_tabindex, rx_loading2 } from "../modules/chats";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Button, ListSubheader } from "@material-ui/core";

/* function */
import { socket, cm_room_remove, cm_logout } from "../helpers/common";

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

const RoomList = ({all_users, all_rooms, all_msgs, me, rx_authenticated, rx_focusroom, focusroom, rx_tabindex, rx_loading2 }) => {
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
  const hendle_room_remove = (r_id) => cm_room_remove(r_id,all_rooms,all_msgs,focusroom);
  
  const my_room = (m_data) => m_data.filter((i) => i.attributes.roomuser.includes(me.id))
  const [hellos, setHello] = useState([]);

  useEffect(() => {
    console.log("[표시]RoomList.js");
    setHello(my_room(all_rooms));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all_rooms]);

  return (
    <LoadingBar open={false}>
      <Box className={classes.root}>
        <div  className={classes.title}>
          {me.username}
          <Button onClick={() => {
              cm_logout(rx_authenticated,me,rx_loading2);
            }}>로그아웃</Button>
        </div>
        <ListSubheader component="div">전체 친구 리스트</ListSubheader>

        <List className={classes.list}>
          {hellos.length > 0 ? (
            hellos.map((room, index) => (
              <RoomItem key={index} img="https://material-ui.com/static/images/avatar/1.jpg" room={room} all_users={all_users} event={hendle_focusroom} hendle_room_remove={hendle_room_remove} />
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
  focusroom: state.chats.focusroom,
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_focusroom: (val) => {
    dispatch(rx_focusroom(val));
  },
  rx_tabindex: (val) => {
    dispatch(rx_tabindex(val));
  },
  rx_loading2: (val) => {
    dispatch(rx_loading2(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);