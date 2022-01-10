import React, { useEffect, useState } from "react";


import { makeStyles } from '@material-ui/core/styles';
import {TextField,Button,Snackbar } from '@material-ui/core';
import io from "socket.io-client";
export const socket = io.connect("http://localhost:4001");

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


const Gogogo = () => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };



    const classes = useStyles();



    
    const [member, setMember] = useState({
        Room: "",
        NickName: "",
        Input: "",
    });
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };


    const [datas, setData] = useState([]);


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (member.Room !== "" && member.NickName !== "" && member.Input) {
            console.log(member);
            
            socket.emit('SendChat',member);
            setMember({ ...member, Input: '' });
        }
    };

    const roomGo = (room_name) => {

      setMember({ ...member, Room: room_name });

      socket.emit('joinRoom',{
        Room: room_name,
        NickName: member.NickName
      });
      setOpen(true);
    }


    useEffect(() => {
      socket.on('joinMsg',(data) => {
        console.log('joinMsg',data);
        setAlertmsg(data);
      })

        socket.on('ChatResult',(data) => {
        console.log('ChatResult',data);

          setData(datas => [...datas, data]);
        })
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);





    return (
        <div className={classes.root}>
            <TextField
              label="NickName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="NickName"
              name="NickName"
              autoComplete="NickName"
              autoFocus
              value={member.NickName}
              onChange={handleOnChange}
            />
      <h2>{member.Room && `${member.Room} 님의 방`}</h2>
      <div>
        <Button onClick={() => roomGo("금주")}>금주방</Button>
        <Button onClick={() => roomGo("동동")}>동동방</Button>
        <Button onClick={() => roomGo("세천")}>세천방</Button>
      </div>

<br />
<br />
<br />
        {
          member.Room !== "" && (
            <div>

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
              value={member.Input}
              onChange={handleOnChange}
            />
            <Button
            onClick={handleOnSubmit}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>
          </div>
          )
        }


        <ul>
          {datas.length > 0 ? (
            datas.map((item, index) => (
              <div key={index}>
                {item.NickName} : {item.Input}
                <br />
                <br />
              </div>
            ))
          ) : (
            <li>리스트가없습니다.</li>
          )}
        </ul>


        <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}

        message={alertmsg}
        key={"top center"}
      />

      </div>
    );
};

export default Gogogo;