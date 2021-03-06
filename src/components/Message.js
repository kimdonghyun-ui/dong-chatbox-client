import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";


import * as dateFns from "date-fns";
import { cm_msg_remove } from "../helpers/common";
import {ListSubheader, Snackbar} from "@material-ui/core";
import { socket } from "../helpers/common";
import { cm_logout } from "../helpers/common";
import { rx_authenticated, rx_loading2 } from "../modules/chats";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// import FriendAdd from "./FriendAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:'26px',
  },
  lBox: {
    flexDirection: "row-reverse",
    display: "flex",
    textAlign: "right",
  },
  rBox: {
    flexDirection: "row-reverse",
    display: "flex",
    textAlign: "right",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    left: 0,
    width: "100%",
    "& input,& button": {
      width: "100%",
      height: "50px",
    },
  },

  listBox: {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    top: '98px',
    bottom: '165px',
    left: '24px',
    right: '25px',
    overflowY: "scroll",
  },
  listBoxItem: {
    display: "block",
  },
  listBoxItemavatar: {
    display: "flex",
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

const Message = ({ all_msgs, me, focusroom, rx_authenticated, rx_loading2, tabindex }) => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState('');
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  // msgs={msgbox} me={me} btn_logout={hendle_logout}  



  // const [datas, setData] = useState([]);

  const classes = useStyles();

  const intervalId = useRef(null);

  function scrollToMyRef() {
    console.log('scrollToMyRef??????')
    const scroll =
      intervalId.current.scrollHeight - intervalId.current.clientHeight;
    intervalId.current.scrollTo(0, scroll);
  }




  /* ????????? ?????? */
  const hendle_msgRemove = (msg_uid) => {
    let data = all_msgs.filter((item) => item.attributes.name === focusroom)[0]
    console.log('????????? ??????',data.id );
    console.log('????????? ??????',data.attributes.list.filter((i) => i.uid !== msg_uid),data.id,all_msgs );
    cm_msg_remove(data.attributes.list.filter((i) => i.uid !== msg_uid),data.id,all_msgs);
    // alert('?????????')
    // cm_removeChat(focusroom,data);
  };
  
  const [lists, setList] = useState([]);

  useEffect(() => {
    console.log('[??????]Message.js');
    const m_focus_list = all_msgs.filter((item) => item.attributes.name === focusroom)[0];
    if(m_focus_list){
      console.log('???????????? ???????????? ???????????????',m_focus_list.attributes.list)
      setList(m_focus_list.attributes.list);
    }else{
      setList([]);
    }
    scrollToMyRef();

    return () => {
      setList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all_msgs,focusroom]);
//????????? ???????????????[]?????????

  useEffect(() => {

    socket.on('joinMsg', function(join_data) {
      setOpen(true);
      setAlertmsg(`${join_data.Room}?????? ${join_data.NickName}?????? ?????????`);
    });
    socket.on('leaveMsg', function(join_data) {
      setOpen(true);
      setAlertmsg(`${join_data.Room}?????? ${join_data.NickName}?????? ?????????`);
    });


    return () => {
      setOpen(false);
      socket.emit('leaveRoom',{
        Room: focusroom,
        NickName: me.username
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      setTimeout(() => {
        scrollToMyRef();
      }, 500);
    }, [tabindex]);

  return (
    <Box
      className={classes.root}
    >
      <div className={classes.title}>
        {me && me.username} {focusroom > 0 && (<div style={{ fontSize:'12px' }}>(????????? {focusroom})</div>)}
        <Button onClick={() => {
            cm_logout(rx_authenticated,me,rx_loading2);
          }}>????????????</Button>
      </div>
      <ListSubheader
        component="div"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        ?????????
        {/* {focusroom !== 0 && <FriendAdd />} */}
      </ListSubheader>
      <List className={classes.listBox} ref={intervalId}>
        {lists.length > 0 ? (
          lists.map((data, index) => (
            <ListItem key={index} className={classes.listBoxItem}>
              <Box
                style={{
                  display: "flex",
                  flexDirection:
                    me.id === data.me_id
                      ? "row-reverse"
                      : "row",
                  textAlign:
                  me.id === data.me_id ? "right" : "left",
                }}
              >
                <ListItemAvatar
                  className={classes.listBoxItemavatar}
                  style={{
                    justifyContent:
                        me.id === data.me_id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primary={data.NickName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        style={{ wordBreak: "break-all" }}
                      >
                        {data.Input}
                      </Typography>
                      <br />
                      {data.timestamp && dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")}
                      {/* {dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")} */}
                    </React.Fragment>
                  }
                />
                <Button
                  style={{
                    display:
                        me.id !== data.me_id
                        ? "none"
                        : "inline-flex",
                  }}
                  onClick={() => hendle_msgRemove(data.uid)}
                >
                  ??????
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <li>????????????????????????.</li>
        )}
      </List>

      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message={alertmsg}
        key={"top center"}
      />


    </Box>
  );
};

const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  all_msgs: state.chats.all_msgs,
  me: state.chats.me,
  tabindex: state.chats.tabindex
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_loading2: (val) => {
    dispatch(rx_loading2(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);