import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

/* function */
import { cm_msgs_update } from "../helpers/common";

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

const InputBox = ({ all_msgs ,focusroom, me, rx_all_rooms, all_rooms,  }) => {
  const classes = useStyles();
 
  const [msgs, setMsg] = useState({
    Room: focusroom,
    NickName: me.username,
    me_id: me.id,
    Input: "",
    timestamp: Date.now(),
    uid:""
  });

  const handleOnChange = (e) => {
    setMsg({
      Room: focusroom,
      NickName: me.username,
      me_id: me.id,
      Input: e.target.value,
      timestamp: Date.now(),
      uid:uuidv4()
    });



  };


  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
      return v.toString(16);
    });
  }


  const handleSumbit = async (e) => {
    e.preventDefault();

    const m_focus_list = all_msgs.filter((item) => item.attributes.name === focusroom)[0];
    if(m_focus_list){
      console.log('메시지가 있으니까 셋팅해주기',m_focus_list);
      m_focus_list.attributes.list.push(msgs)
      console.log(m_focus_list.attributes.list)
      cm_msgs_update(m_focus_list.attributes.list,m_focus_list.id,all_msgs);
      // console.log('all_msgsall_msgsall_msgsall_msgsall_msgsall_msgs',all_msgs)
    };

    // 
    setMsg({ ...msgs, Input: '' });
  };

  // const [hellos, setHello] = useState([]);

  useEffect(() => {
    console.log('[표시]InputBox.js');

console.log(uuidv4())

// console.log('msgs',msgs)
// console.log('all_msgs',all_msgs)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return (
    <form onSubmit={handleSumbit}>
      <Box className={classes.InputBox}>
      <TextField
              label="Input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Input"
              name="Input"
              autoComplete="Input"
              autoFocus
              value={msgs.Input}
              onChange={handleOnChange}
            />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={handleSumbit}
        >
          Send
        </Button>
      </Box>
    </form>
  );
};

const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  all_msgs: state.chats.all_msgs,
  me: state.chats.me
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_remove: (val) => {
//     dispatch(rx_remove(val));
//   },
// });

export default connect(mapStateToProps, null)(InputBox);
//rx_all_rooms={rx_all_rooms} all_rooms={all_rooms}