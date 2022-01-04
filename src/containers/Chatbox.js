import React,{ useEffect } from "react";
import { connect } from "react-redux";
import FrienList from "../components/FrienList";
import RoomList from "../components/RoomList";
import io from "socket.io-client";

import { cm_all_users, cm_all_room, cm_logout } from "../helpers/common";
import { rx_all_users, rx_all_rooms, rx_authenticated, rx_focusroom } from "../modules/chats";
import {
  CssBaseline,
} from "@material-ui/core";
import TabBox from "../components/TabBox";

import Message from "../components/Message";
import InputBox from "../components/InputBox";

function Chatbox({ rx_all_users, all_users, rx_all_rooms, all_rooms, me, rx_authenticated, rx_focusroom, focusroom }) {

  const hendle_logout = () => cm_logout(rx_authenticated,me,rx_all_users,all_users);

  
  // const socket = io.connect("http://localhost:4001");
  const socket = io.connect("https://dong-chatbox-server.herokuapp.com");

  useEffect(() => {
    cm_all_room(socket);
    cm_all_users(socket);
    socket.on('user_update', function(user) {
      rx_all_users(user);
    });
    socket.on('room_update', function(room) {
      rx_all_rooms(room);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // cm_logout(rx_authenticated,me,rx_all_users,all_users);


console.log('#####all_rooms',focusroom)
const hello = (id) => all_rooms.filter((item,index) => item.id === id  ) 
console.log(hello(focusroom))
console.log('#####all_rooms')



  return (
    <React.Fragment>
      <CssBaseline />
      <TabBox
        content={[
          <FrienList users={all_users} me={me} btn_logout={hendle_logout} />,
          <RoomList rooms={all_rooms} me={me} btn_logout={hendle_logout} />,
          <>
            <Message msgs={hello(focusroom)} me={me} btn_logout={hendle_logout}  />
            <InputBox me={me} focusroom={focusroom} rx_all_rooms={rx_all_rooms} all_rooms={all_rooms} />
          </>,
        ]}
      />
    </React.Fragment>
  );
} 


const mapStateToProps = (state) => ({
  all_users: state.chats.all_users,
  all_rooms: state.chats.all_rooms,
  me: state.chats.me,
  focusroom: state.chats.focusroom
});

const mapDispatchToProps = (dispatch) => ({
  rx_all_users: (val) => {
    dispatch(rx_all_users(val));
  },
  rx_all_rooms: (val) => {
    dispatch(rx_all_rooms(val));
  },
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_focusroom: (val) => {
    dispatch(rx_focusroom(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);