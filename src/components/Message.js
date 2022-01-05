import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
// import { rx_remove } from "../modules/chats";
// import { fireauth } from "../services/firebase";

// import * as dateFns from "date-fns";
import { cm_removeChat } from "../helpers/common";
import ListSubheader from "@material-ui/core/ListSubheader";

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

    // position: 'absolute',
    // top: '50px',
    // bottom: '72px',
    // left: '24px',
    // right: '25px',
    // overflowY: "scroll",
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

const Message = ({ msgs, me, btn_logout, focusroom, all_rooms }) => {
  const [count, setCount] = useState(0);

  const classes = useStyles();

  const intervalId = useRef(null);

  function scrollToMyRef() {
    const scroll =
      intervalId.current.scrollHeight - intervalId.current.clientHeight;
    intervalId.current.scrollTo(0, scroll);
  }

  const hendle_msgRemove = (uid) => {
    const clone_all_rooms = all_rooms;
    const msg = clone_all_rooms.filter((item) => item.id === focusroom )[0].attributes.msglist.filter((item) => item.uid !== uid );

    console.log(msg);
    const re_msg = all_rooms.map((item) => {
      if(item.id === focusroom){
         item.attributes.msglist = msg
      }
      return item
    } )
    console.log('re_msg',re_msg,focusroom);

    cm_removeChat(focusroom,msg,re_msg);
//     all_rooms.map((item) => item.id === focusroom && item.attributes.msglist.push(      {
//       uid:uuidv4(),
//       message:msg,
//       name:me.username,
//       timestamp:Date.now(),
//       userid:me.id
// }) 
  }


  useEffect(() => {
    console.log('#####Message')
    console.log(msgs[0] && msgs[0].attributes.msglist);
    setCount(msgs[0] ? msgs[0].attributes.msglist : 0 )

    console.log("[표시]Message.js");
    scrollToMyRef();
    console.log('#####Message')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  return (
    <Box
      className={classes.root}
    >
      <div className={classes.title}>
        {me && me.username} 
        <Button onClick={() => {
            btn_logout();
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
        {/* {focusroom !== "" && <FriendAdd />} */}
      </ListSubheader>
      <List className={classes.listBox} ref={intervalId}>
        {count.length > 0 ? (
          count.map((data, index) => (
            <ListItem key={index} className={classes.listBoxItem}>
              <Box
                style={{
                  display: "flex",
                  flexDirection:
                    me.id === data.userid
                      ? "row-reverse"
                      : "row",
                  textAlign:
                  me.id === data.userid ? "right" : "left",
                }}
              >
                <ListItemAvatar
                  className={classes.listBoxItemavatar}
                  style={{
                    justifyContent:
                        me.id === data.userid
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primary={data.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        style={{ wordBreak: "break-all" }}
                      >
                        {data.message}
                      </Typography>
                      <br />
                      {/* {dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")} */}
                    </React.Fragment>
                  }
                />
                <Button
                  style={{
                    display:
                        me.id !== data.userid
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
    </Box>
  );
};

const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  all_rooms: state.chats.all_rooms
//   me: state.chats.me[0],
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_remove: (val) => {
//     dispatch(rx_remove(val));
//   },
// });

export default connect(mapStateToProps, null)(Message);