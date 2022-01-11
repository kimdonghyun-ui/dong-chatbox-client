import React from "react";
// import PropTypes from "prop-types";
// import { firedatabase } from "../services/firebase";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { connect } from "react-redux";
import { cm_roomfriend } from "../helpers/common";

import { blue } from "@material-ui/core/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data, focusroom, all_rooms } = props;

  const handleClose = () => {
    onClose(selectedValue);
    console.log("까르르르궁", data);
  };

  const handleListItemClick = (id) => {
    let data = all_rooms.filter((item) => item.id === focusroom)[0].attributes.roomuser
    if(!data.includes(id)){
        data.push(id);
      cm_roomfriend(data,focusroom,all_rooms)

    }else{
        alert('이미 있는 유저입니다.');
    }
    onClose(false);
  };

  console.log("까르르르궁", data);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">친구 리스트</DialogTitle>
      <List>
        {data.length > 0 ? (
          data.map((item, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item.id)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.username} />
            </ListItem>
          ))
        ) : (
          <li>리스트가없습니다.</li>
        )}
      </List>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

const FriendAdd = ({ all_users, focusroom, all_rooms }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        친구추가
      </Button>
      <SimpleDialog
        data={all_users}
        all_rooms={all_rooms}
        focusroom={focusroom}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  all_users: state.chats.all_users,
  all_rooms: state.chats.all_rooms,
  focusroom: state.chats.focusroom,
});

export default connect(mapStateToProps, null)(FriendAdd);