import React, { useState } from "react";
import { connect } from "react-redux";
import { fireauth } from "../services/firebase";
import { sendChat, CM_my_msgLength_change } from "../helpers/common";

import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

import { rx_msglength2 } from "../modules/chats";

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

const InputBox = ({ focusroom, me, rx_msglength2, msglength2 }) => {
  const classes = useStyles();
  const [msg, setMsg] = useState("");

  const handleOnChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setMsg("");
    sendChat(
      {
        message: msg,
        timestamp: Date.now(),
        uid: fireauth.currentUser.uid,
        avatar: me.avatar,
        name:
          fireauth.currentUser.displayName === null
            ? me.name
            : fireauth.currentUser.displayName,
      },
      focusroom
    );
    CM_my_msgLength_change(focusroom, rx_msglength2, msglength2);
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

const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  me: state.chats.me[0],
  msglength2: state.chats.msglength2,
});

const mapDispatchToProps = (dispatch) => ({
  rx_msglength2: (val) => {
    dispatch(rx_msglength2(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);