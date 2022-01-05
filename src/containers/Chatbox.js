import React,{ useEffect, useState } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_all_users, rx_all_rooms, rx_authenticated, rx_focusroom } from "../modules/chats";

/* material-ui */
import { CssBaseline } from "@material-ui/core";

/* function */
import { socket, cm_all_users, cm_all_rooms, cm_logout } from "../helpers/common";

/* components */
import TabBox from "../components/TabBox";
import FrienList from "../components/FrienList";
import RoomList from "../components/RoomList";
import Message from "../components/Message";
import InputBox from "../components/InputBox";



function Chatbox({ rx_all_users, all_users, rx_all_rooms, all_rooms, me, rx_authenticated, rx_focusroom, focusroom }) {
  const [count, setCount] = useState(0);

  /* hendle_logout(로그아웃 버튼) */
  const hendle_logout = () => cm_logout(rx_authenticated,me);

  useEffect(() => {

    cm_all_users(); //api에 users 데이터 요청 후 성공시 소켓에 전달 (user_update로 되돌려받는다.)
    socket.on('user_update', function(user) {
      rx_all_users(user);
    });


    cm_all_rooms(); //api에 rooms 데이터 요청 후 성공시 소켓에 전달 (room_update로 되돌려받는다.)
    socket.on('room_update', function(room) {
      rx_all_rooms(room);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
 

  useEffect(() => {
    console.log('#####all_rooms',focusroom)
    const hello = (id) => all_rooms.filter((item,index) => item.id === id  ) 
    console.log(hello(focusroom))
    setCount(hello(focusroom))
    console.log('#####all_rooms')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[all_rooms,focusroom]);





  return (
    <React.Fragment>
      <CssBaseline />
      <TabBox
        content={[
          <FrienList users={all_users} me={me} btn_logout={hendle_logout} />,
          <RoomList rooms={all_rooms} me={me} btn_logout={hendle_logout} />,
          <>
            <Message msgs={count} me={me} btn_logout={hendle_logout}  />
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