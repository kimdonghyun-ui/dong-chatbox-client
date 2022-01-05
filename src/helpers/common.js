
import { setCookie, delCookie } from "../cookie";
import axios from "axios";


import io from "socket.io-client";
// export const socket = io.connect("http://localhost:4001");
export const socket = io.connect("https://dong-chatbox-server.herokuapp.com");

// const api_url = "http://localhost:1337/";
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
//########### 로그아웃 ################
//##########################################################
export const cm_logout = (rx_authenticated,me) => {
  /*쿠키에 저장한 myToken,me를 제거 */
  delCookie('myToken');
  delCookie('me');
  
  /* authenticated 값을 false로해 로그아웃상태로 인지시켜줌 */
  rx_authenticated(false);

  /* 나의 접속상태 값 false */
  cm_contact(me.id,false);
}
//##########################################################








//##########################################################
//########### 유저리스트 ################
//##########################################################
export const cm_all_users = async () => {
  // rx_big_loading(true);
  try {
    const { data } = await axios.get(api_url+'api/users');
    console.log('cm_all_users성공 소켓에 알리기',data)
    socket.emit('all_users', data);
  } catch (e) {
    console.log('유저리스트 실패');
  }
  // rx_big_loading(false);
}
//##########################################################




//##########################################################
//########### 룸리스트 불러오기 ################
//##########################################################
export const cm_all_rooms = async () => {
  // rx_big_loading(true);
  try {
    const { data } = await axios.get(api_url+'api/rooms');
    console.log('cm_all_rooms성공 소켓에 알리기',data.data)
    socket.emit('all_rooms', data.data);
    socket.emit('msgs', data.data);
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
export function cm_roomadd(me, you, all_rooms, rx_tabindex, rx_focusroom) {
  if(me === you){
    alert('자신과는 대화 할수 없습니다.');
    return
  }
  const data = [me, you].sort();

  let clone_allroomlist = all_rooms.some(
    (element) =>
      JSON.stringify(element.attributes.roomuser.sort()) === JSON.stringify(data)
  );

  if (!clone_allroomlist) {
    console.log("방이없으니 새방생성됩니다. 슝");

    //방이 없는경우 새방을 만들어준다.
    roomadd(data[0], data[1],all_rooms);
    rx_tabindex(2);
  } else {
    console.log("방이있어요");

    //all_rooms으로 가공을하면 원본을 훼손하기에 클론하고나서 가공해준다.
    let clone_allroomlist2 = JSON.parse(JSON.stringify(all_rooms));
    clone_allroomlist2 = clone_allroomlist2.filter(
      (item) => JSON.stringify(item.attributes.roomuser.sort()) === JSON.stringify(data)
    )[0].id;

    rx_focusroom(clone_allroomlist2);
    rx_tabindex(2);
  };
}
//##########################################################






//##########################################################
//########### 룸 삭제 ################
//##########################################################
export const cm_removerooms = async (id,all_rooms) => {
  // rx_big_loading(true);
  try {
    await axios.delete(api_url+'api/rooms/'+id);
    //console.log(data);
    // rx_all_users(data);
    let remove = all_rooms.filter((item) => item.id !== id );
    socket.emit('all_rooms', remove);
  } catch (e) {
    console.log('룸 삭제 실패');
  }
  // rx_big_loading(false);
}
//##########################################################



//##########################################################
//########### 메시지 서버로 보내기 ################
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
    console.log('#####cm_sendChat성공#####');
    console.log('data',data);
    console.log('all_rooms', all_rooms);
    console.log('#####cm_sendChat성공#####');

    // rx_all_users(data);
    // let hello = all_rooms.filter((item) => item.id !== id );
    // socket.emit('all_rooms', hello);
  } catch (e) {
    console.log('#####cm_sendChat실패#####');
    console.log('메시지 전송 실패');
    console.log('all_rooms', all_rooms);
    console.log('#####cm_sendChat실패#####');
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


//##########################################################
//########### 메시지삭제 ################
//##########################################################
export const cm_removeChat = async (focusroom,hello) => {
  try {
    await axios.put(api_url+'api/rooms/'+focusroom, {
      "data":
        {
          "msglist":hello
        }
      });
      socket.emit('msgs', hello);

    console.log('#####cm_removeChat성공#####');
    console.log(hello);
    console.log('#####cm_removeChat성공#####');

  } catch (e) {
    console.log('#####cm_removeChat실패#####');
    console.log(hello);
    console.log('#####cm_removeChat실패#####');
  }
}
//##########################################################