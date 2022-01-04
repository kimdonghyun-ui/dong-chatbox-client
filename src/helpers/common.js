
import { setCookie, delCookie } from "../cookie";
import axios from "axios";


import io from "socket.io-client";
const socket = io.connect("http://localhost:4001");

//const api_url = "http://localhost:1337/";
const api_url = "https://dongdong-api.herokuapp.com/";











//##########################################################
//########### 접속유무 확인 ################
//##########################################################
export const cm_contact = async (id,state) => {
  // rx_big_loading(true);
  try {
    await axios.put(api_url+'api/users/'+id, {
      confirmed: state,
    });
    // socket.emit('all_users', all_users);
    cm_all_users(socket);
  } catch (e) {
    console.log('접속유무 확인 실패');
  }
  // rx_big_loading(false);
}
//##########################################################









//##########################################################
//########### 회원가입 ################
//##########################################################
export const cm_signUp = async (member,rx_authenticated,rx_big_loading,rx_me) => {
    rx_big_loading(true);
    try {
      const { data } = await axios.post(api_url+'api/auth/local/register', {
          username: member.name,
          email: member.email,
          password: member.password
      });
      
      if(data.jwt){
        console.log('회원가입 성공 쿠키저장');
        setCookie('myToken', data.jwt,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setCookie('me', data.user,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        rx_authenticated(true);
        rx_me(data.user);
        cm_contact(data.user.id,true);
      }
    } catch (e) {
      console.log('회원가입 실패');
    }
    rx_big_loading(false);
  }
//##########################################################

//##########################################################
//########### 로그인 ################
//##########################################################
export const cm_login = async (member,rx_authenticated,rx_big_loading,rx_me) => {
    rx_big_loading(true);
    try {
      const { data } = await axios.post(api_url+'api/auth/local', {
        identifier: member.email,
        password: member.password,
      });
      console.log(data.jwt);
      if(data.jwt){
        setCookie('myToken', data.jwt,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setCookie('me', data.user,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        rx_authenticated(true);
        rx_me(data.user);
        cm_contact(data.user.id,true);
      }
    } catch (e) {
      console.log('실패');
    }
    rx_big_loading(false);
  }
//##########################################################


//##########################################################
//########### 유저리스트 ################
//##########################################################
export const cm_all_users = async (socket) => {
  // rx_big_loading(true);
  try {
    const { data } = await axios.get(api_url+'api/users');
    // console.log(data);
    // rx_all_users(data);
    socket.emit('all_users', data);
  } catch (e) {
    console.log('유저리스트 실패');
  }
  // rx_big_loading(false);
}
//##########################################################







//##########################################################
//########### 로그아웃 ################
//##########################################################
export const cm_logout = (rx_authenticated,me,rx_all_users,all_users) => {
  delCookie('me');
  delCookie('myToken');
  rx_authenticated(false);
  cm_contact(me.id,false);
}
//##########################################################













//##########################################################
//########### 룸리스트 ################
//##########################################################
export const cm_all_room = async (socket) => {
  // rx_big_loading(true);
  try {
    const { data } = await axios.get(api_url+'api/rooms');
    //console.log(data);
    // rx_all_users(data);
    socket.emit('all_rooms', data.data);
  } catch (e) {
    console.log('룸리스트 실패');
  }
  // rx_big_loading(false);
}
//##########################################################












const roomadd = async (me,you,all_rooms) => {
  console.log('시발'+me,you)
  try {
    const { data } = await axios.post(api_url+'api/rooms/', {
      "data":
        {
          "msglist":[
          //   {
          //   uid:uuidv4(),
          //   message:`${me+you}님 입장`,
          //   name:"헬로우123",
          //   timestamp:1638161877523,
          //   userid:
          // }
        ],
          "roomuser":[me,you]
        }
      });
      console.log(data);

      all_rooms.push(data.data);
      socket.emit('all_rooms', all_rooms);

  } catch (e) {
    console.log('실패');
  }
}




//##########################################################
//########### 내 룸 개설 ################
//##########################################################
export function cm_roomadd(me, you, all_rooms, rx_focusroom, rx_tabindex) {
  if(me === you){
    alert('자신과는 대화 할수 없습니다.');
    return
  }
  const data = [me, you].sort();
  // const clone_data = [me.uid, you].sort();
  console.log("handleFriend", data[0], data[1]);

  let clone_allroomlist = all_rooms.some(
    (element) =>
      JSON.stringify(element.attributes.roomuser.sort()) === JSON.stringify(data)
  );

  if (!clone_allroomlist) {
    console.log("방이없으니 새방생성됩니다. 슝");

    //방이 없는경우 새방을 만들어준다.
    roomadd(data[0], data[1],all_rooms);
    
  } else {
    console.log("방이있어요");
    //이미 방이 있는경우 포커스룸만 현재꺼로 채워준다.
    // let clone_allroomlist2 = JSON.parse(JSON.stringify(allroomlist));
    // clone_allroomlist2 = clone_allroomlist2.filter(
    //   (item) => JSON.stringify(item.uid.sort()) === JSON.stringify(clone_data)
    // )[0].msg_key;

    // console.log("이미 방이 있습니다. 현재룸", clone_allroomlist2);
    // rx_focusroom(clone_allroomlist2);
  }















  // console.log(allroomlist);
  // let clone_allroomlist = JSON.parse(JSON.stringify(allroomlist));
  // clone_allroomlist = clone_allroomlist.some(
  //   (element) =>
  //     JSON.stringify(element.uid.sort()) === JSON.stringify(clone_data)
  // );

  // rx_tabindex(2);
  // if (!clone_allroomlist) {
  //   //방이 없는경우 새방을 만들어준다.
  //   var newPostKey = firedatabase.ref("room").push().key;
  //   rx_focusroom(newPostKey);
  //   var postData = {
  //     uid: [me.uid, you],
  //     name: [],
  //     avatar: me.avatar,
  //     msg_key: newPostKey,
  //   };
  //   var updates = {};
  //   updates["/room/" + newPostKey] = postData;
  //   return firedatabase.ref().update(updates);
  // } else {
  //   //이미 방이 있는경우 포커스룸만 현재꺼로 채워준다.
  //   let clone_allroomlist2 = JSON.parse(JSON.stringify(allroomlist));
  //   clone_allroomlist2 = clone_allroomlist2.filter(
  //     (item) => JSON.stringify(item.uid.sort()) === JSON.stringify(clone_data)
  //   )[0].msg_key;

  //   console.log("이미 방이 있습니다. 현재룸", clone_allroomlist2);
  //   rx_focusroom(clone_allroomlist2);
  // }
}
//##########################################################






//##########################################################
//########### 룸리스트 ################
//##########################################################
export const cm_removerooms = async (id,all_rooms) => {
  console.log(id)
  // rx_big_loading(true);
  try {
    await axios.delete(api_url+'api/rooms/'+id);
    //console.log(data);
    // rx_all_users(data);
    let hello = all_rooms.filter((item) => item.id !== id );
    socket.emit('all_rooms', hello);
  } catch (e) {
    console.log('룸삭제 실패');
  }
  // rx_big_loading(false);
}
//##########################################################



//##########################################################
//########### 메시지 서버로 보내기(firebase) ################
//##########################################################
export const cm_sendChat = async(room,focusroom,all_rooms) => {
  try {
    const { data } = await axios.put(api_url+'api/rooms/'+focusroom, {
      "data":
        {
          "msglist":room[0].attributes.msglist
        }
      });
      socket.emit('all_rooms', all_rooms);
    console.log('data',data);



    console.log('all_rooms', all_rooms);

    // rx_all_users(data);
    // let hello = all_rooms.filter((item) => item.id !== id );
    // socket.emit('all_rooms', hello);
  } catch (e) {
    console.log('메시지 전송 실패');
    console.log('all_rooms', all_rooms);

  }



  // if (focusroom !== "") {
  //   var newPostKey = firedatabase.ref(`msg/${focusroom}`).push().key;

  //   var postData = {
  //     message: msg.message,
  //     timestamp: msg.timestamp,
  //     uid: msg.uid,
  //     avatar: msg.avatar,
  //     key: newPostKey,
  //     name: msg.name,
  //   };

  //   var updates = {};
  //   updates[`msg/${focusroom}/${newPostKey}`] = postData;
  //   return firedatabase.ref().update(updates);
  // } else {
  //   alert("방을 선택해주세요");
  // }
} //cm_sendChat
//##########################################################