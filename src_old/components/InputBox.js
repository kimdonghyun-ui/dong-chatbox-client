import React, { useState, useEffect } from "react";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

/* function */
// import { cm_setmsg } from "../helpers/common";

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
 
  const [msgs, setMsg] = useState();

  const handleOnChange = (e) => {
    setMsg({
      Room: focusroom,
      NickName: me.username,
      me_id: me.id,
      Input: e.target.value,
      timestamp: Date.now(),
    });
  };


  const handleSumbit = async (e) => {
    e.preventDefault();
    setMsg({ ...msgs, Input: '' });
  };

  // const [hellos, setHello] = useState([]);

  useEffect(() => {

console.log(msgs)
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

export default InputBox;