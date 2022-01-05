import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";


import * as dateFns from "date-fns";
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

const Message = ({ msgs, me, btn_logout, focusroom }) => {
  // const [count, setCount] = useState(0);

  const classes = useStyles();

  const intervalId = useRef(null);

  function scrollToMyRef() {
    const scroll =
      intervalId.current.scrollHeight - intervalId.current.clientHeight;
    intervalId.current.scrollTo(0, scroll);
  }

  /* 메시지 삭제 */
  const hendle_msgRemove = (uid) => {
    let data = msgs.filter((item) => item.uid !== uid);
    console.log('메시지 삭제',data);
    cm_removeChat(focusroom,data);
  };


  useEffect(() => {
    console.log('#####Message')
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
        {msgs.length > 0 ? (
          msgs.map((data, index) => (
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
                      {dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")}
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
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_remove: (val) => {
//     dispatch(rx_remove(val));
//   },
// });

export default connect(mapStateToProps, null)(Message);