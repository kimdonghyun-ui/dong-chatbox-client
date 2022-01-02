import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
// import { CM_removeRooms } from "../helpers/common";
import { connect } from "react-redux";
// import { fireauth } from "../services/firebase";

// import { rx_focusroom, rx_focusmsg } from "../modules/chats";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const RoomItem = ({
  room,
  avatar
}) => {

  return (
    <li style={{ display: "flex" }}>
      <ListItem button onClick={() => console.log('이벤트')}>
        <ListItemAvatar>
          <Badge color="secondary" badgeContent={0}>
            <StyledBadge
              invisible={true}
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={avatar} />
            </StyledBadge>
          </Badge>
        </ListItemAvatar>
        <ListItemText primary="ㅇㅇ" secondary="1:1대화방" />
      </ListItem>
      {true && (
        <Button
          onClick={() =>
            // CM_removeRooms(msg_key, me, rx_focusroom, rx_focusmsg, all_users)
          console.log('삭제')
          }
        >
          삭제
        </Button>
      )}
    </li>
  );
};

// const mapStateToProps = (state) => ({
//   all_users: state.chats.all_users,
//   msglength: state.chats.msglength,
//   msglength2: state.chats.msglength2,
// });

// const mapDispatchToProps = (dispatch) => ({
//   rx_focusroom: (val) => {
//     dispatch(rx_focusroom(val));
//   },
//   rx_focusmsg: (val) => {
//     dispatch(rx_focusmsg(val));
//   },
// });

export default connect(null, null)(RoomItem);