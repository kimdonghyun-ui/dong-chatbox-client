import React,{ useEffect } from "react";
import { connect } from "react-redux";
import FrienList from "../components/FrienList";
import RoomList from "../components/RoomList";
import io from "socket.io-client";

import { cm_all_users, cm_all_room, cm_logout } from "../helpers/common";
import { rx_all_users, rx_all_rooms, rx_authenticated } from "../modules/chats";
import {
  CssBaseline,
} from "@material-ui/core";
import TabBox from "../components/TabBox";

function Chatbox({ rx_all_users, all_users, rx_all_rooms, all_rooms, me, rx_authenticated }) {

  const hendle_logout = () => cm_logout(rx_authenticated,me,rx_all_users,all_users);


  const socket = io.connect("http://localhost:4001");

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

  return (
    <React.Fragment>
      <CssBaseline />
      <TabBox
        content={[
          <FrienList users={all_users} me={me} btn_logout={hendle_logout} />,
          <RoomList rooms={all_rooms} me={me} btn_logout={hendle_logout} />,
          <FrienList users={all_users} me={me} />,
        ]}
      />
    </React.Fragment>
  );
} 


const mapStateToProps = (state) => ({
  all_users: state.chats.all_users,
  all_rooms: state.chats.all_rooms,
  me: state.chats.me,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);