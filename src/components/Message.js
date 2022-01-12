import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";


import * as dateFns from "date-fns";
import { cm_msg_remove } from "../helpers/common";
import {ListSubheader, Snackbar} from "@material-ui/core";
// import { socket } from "../helpers/common";
import { cm_logout } from "../helpers/common";

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

const Message = ({ all_msgs, me, focusroom }) => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState('');
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  // msgs={msgbox} me={me} btn_logout={hendle_logout}  



  const [datas, setData] = useState([]);

  const classes = useStyles();

  const intervalId = useRef(null);

  function scrollToMyRef() {
    const scroll =
      intervalId.current.scrollHeight - intervalId.current.clientHeight;
    intervalId.current.scrollTo(0, scroll);
  }




  /* 메시지 삭제 */
  const hendle_msgRemove = (msg_uid) => {
    let data = all_msgs.filter((item) => item.attributes.name === focusroom)[0]
    console.log('메시지 삭제',data.id );
    console.log('메시지 삭제',data.attributes.list.filter((i) => i.uid !== msg_uid),data.id,all_msgs );
    cm_msg_remove(data.attributes.list.filter((i) => i.uid !== msg_uid),data.id,all_msgs);
    // alert('미완성')
    // cm_removeChat(focusroom,data);
  };
  
  const [lists, setList] = useState([]);

  useEffect(() => {
    console.log('[표시]Message.js');
    const m_focus_list = all_msgs.filter((item) => item.attributes.name === focusroom)[0];
    if(m_focus_list){
      console.log('메시지가 있으니까 셋팅해주기',m_focus_list.attributes.list)
      setList(m_focus_list.attributes.list);
    }else{
      setList([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all_msgs,focusroom]);


  useEffect(() => {



    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return (
    <Box
      className={classes.root}
    >
      <div className={classes.title}>
        {me && me.username} 
        <Button onClick={() => {
            cm_logout();
          }}>로그아웃</Button>
      </div>
      <ListSubheader
        component="div"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        채팅방
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
                  삭제
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <li>리스트가없습니다.</li>
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
  me: state.chats.me
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_remove: (val) => {
//     dispatch(rx_remove(val));
//   },
// });

export default connect(mapStateToProps, null)(Message);