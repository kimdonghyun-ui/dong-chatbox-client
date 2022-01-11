import React,{ useEffect } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_all_users, rx_all_rooms, rx_all_msgs } from "../modules/chats";

/* material-ui */
import { CssBaseline } from "@material-ui/core";

/* function */
import { socket, cm_all_users, cm_all_rooms, cm_all_msgs } from "../helpers/common";

/* components */
import TabBox from "../components/TabBox";
import FrienList from "../components/FrienList";
import RoomList from "../components/RoomList";
// import Message from "../components/Message";
// import InputBox from "../components/InputBox";



function Chatbox({ rx_all_users, rx_all_rooms, rx_all_msgs }) {

  useEffect(() => {

    cm_all_users(); //api에 users 데이터 요청 후 성공시 소켓에 전달 (user_update로 되돌려받는다.)
    socket.on('all_user_update', function(user) {
      rx_all_users(user); //소켓에 연결된 모든 사용자에게 유저 데이터를 갱신해준다.
    });


    cm_all_rooms(); //api에 rooms 데이터 요청 후 성공시 소켓에 전달 (room_update로 되돌려받는다.)
    socket.on('all_room_update', function(rooms) {
      rx_all_rooms(rooms);
    });

    cm_all_msgs(); //api에 rooms 데이터 요청 후 성공시 소켓에 전달 (room_update로 되돌려받는다.)
    socket.on('all_msgs_update', function(msgs) {
      rx_all_msgs(msgs);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <React.Fragment>
      <CssBaseline />
      <TabBox
        content={[
          <FrienList />,
          <RoomList />,
          <>
          탠3내용
          </>,
        ]}
      />
      {/* <TabBox
        content={[
          <FrienList users={all_users} me={me} btn_logout={hendle_logout} />,
          <RoomList rooms={all_rooms} me={me} btn_logout={hendle_logout} />,
          <>
          까궁
            <Message msgs={msgbox} me={me} btn_logout={hendle_logout}  />
            <InputBox all_msgs={msgbox} me={me} focusroom={focusroom} rx_all_rooms={rx_all_rooms} all_rooms={all_rooms} />
          </>,
        ]}
      /> */}
    </React.Fragment>
  );
} 


// const mapStateToProps = (state) => ({
//   loading: state.chats.loading,
//   all_users: state.chats.all_users,
//   all_rooms: state.chats.all_rooms,
//   me: state.chats.me,
//   focusroom: state.chats.focusroom,
//   msgbox: state.chats.msgbox,
// });

const mapDispatchToProps = (dispatch) => ({
  rx_all_users: (val) => {
    dispatch(rx_all_users(val));
  },
  rx_all_rooms: (val) => {
    dispatch(rx_all_rooms(val));
  },
  rx_all_msgs: (val) => {
    dispatch(rx_all_msgs(val));
  }
});

export default connect(null, mapDispatchToProps)(Chatbox);