import React, { useState } from "react";
import { connect } from "react-redux";
// import { fireauth } from "../services/firebase";
import { cm_sendChat } from "../helpers/common";

import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

// import { rx_all_rooms } from "../modules/chats";

const useStyles = makeStyles((theme) => ({
  InputBox: {
    display: "flex",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "70px",
    left: '0',
    width: "96%",
    margin: "2%",
    padding: "2%",
    boxShadow: "1px 1px 5px #a0a0a0",
    borderRadius: "5px",
    justifyContent: "space-between",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const InputBox = ({ focusroom, me, rx_all_rooms, all_rooms }) => {
  const classes = useStyles();
  const [msg, setMsg] = useState("");

  const handleOnChange = (e) => {
    setMsg(e.target.value);
  };


  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-mixed-operators
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
          //   uid:uuidv4(),
          //   message:`${me+you}님 입장`,
          //   name:"헬로우123",
          //   timestamp:1638161877523,
          //   userid:
  const handleSumbit = async (e) => {
    e.preventDefault();
    setMsg("");

    console.log('all_rooms',all_rooms)
    all_rooms.map((item) => item.id === focusroom && item.attributes.msglist.push(      {
        uid:uuidv4(),
        message:msg,
        name:me.username,
        timestamp:Date.now(),
        userid:me.id
  })  )
    // console.log('all_rooms2',all_rooms.filter((item) => item.id === focusroom))
    rx_all_rooms(all_rooms);
    // const hee = all_rooms.fiter((item) => item.id === focusroom )
// console.log('시시시시시',hee)
    cm_sendChat(
        all_rooms.filter((item) => item.id === focusroom),focusroom,all_rooms
    );
    // CM_my_msgLength_change(focusroom, rx_msglength2, msglength2);
  };

  return (
    <form onSubmit={handleSumbit}>
      <Box className={classes.InputBox}>
        <TextField
          id="outlined-basic"
          label="메시지"
          value={msg}
          onChange={handleOnChange}
          style={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </form>
  );
};

// const mapStateToProps = (state) => ({
//   focusroom: state.chats.focusroom,
//   me: state.chats.me[0],
//   msglength2: state.chats.msglength2,
// });

// const mapDispatchToProps = (dispatch) => ({
//   rx_msglength2: (val) => {
//     dispatch(rx_msglength2(val));
//   },
// });

export default connect(null, null)(InputBox);