import React from "react";

/* redux */
import { connect } from "react-redux";

/* material-ui */
import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Badge
} from "@material-ui/core";

/* function */
import { cm_removerooms } from "../helpers/common";


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
  avatar,
  all_users,
  all_rooms,
  event
}) => {


//인자값으로 들어온 id를 가진 유저데이터를 찾아서 이름을 꺼내기
function id_name(names) {
  return (
    names !== undefined &&
    all_users.length > 0 &&
    all_users.filter((data) => data.id === names)[0].username
  );
}

  return (
    <li style={{ display: "flex" }}>
      <ListItem button onClick={() => event(room.id)}>
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
        <ListItemText primary={
                          Array.isArray(room.attributes.roomuser)
                          ? room.attributes.roomuser.map((item, index) =>
                              index > 0 ? `/${id_name(item)}` : id_name(item)
                            )
                          : id_name(room.attributes.roomuser)
        } secondary="1:1대화방" />
      </ListItem>
      <Button
        onClick={() =>
          cm_removerooms(room.id,all_rooms)
        }
      >
        삭제
      </Button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  all_rooms: state.chats.all_rooms,
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_focusroom: (val) => {
//     dispatch(rx_focusroom(val));
//   },
//   rx_focusmsg: (val) => {
//     dispatch(rx_focusmsg(val));
//   },
// });

export default connect(mapStateToProps, null)(RoomItem);