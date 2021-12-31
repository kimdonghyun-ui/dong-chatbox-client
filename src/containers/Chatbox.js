import React,{ useEffect, useState } from "react";
import { connect } from "react-redux";
import FriendList from "../components/FriendList";
import io from "socket.io-client";

import { cm_all_users } from "../helpers/common";
import { rx_all_users } from "../modules/chats";
import {
  CssBaseline,
} from "@material-ui/core";
import TabBox from "../components/TabBox";

function Chatbox({ rx_all_users, all_users, me }) {
  const [ users, setUser ] = useState([])

  const socket = io.connect("http://localhost:4001");

  useEffect(() => {
    cm_all_users(rx_all_users,socket);
    socket.on('user_update', function(user) {
      setUser(user);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);



  return (
    // <div className="App">
    //   <button onClick={()=> cm_all_users(rx_all_users,socket)}>버튼</button>
    //   <FriendList users={users} />
    // </div>


<React.Fragment>
<CssBaseline />
<TabBox
  content={[
    <FriendList users={users} me={me} />,
    <FriendList users={users} me={me} />,
    <FriendList users={users} me={me} />,
  ]}
/>
</React.Fragment>


  );
} 


const mapStateToProps = (state) => ({
  all_users: state.chats.all_users,
  me: state.chats.me,
});

const mapDispatchToProps = (dispatch) => ({
  rx_all_users: (val) => {
    dispatch(rx_all_users(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);