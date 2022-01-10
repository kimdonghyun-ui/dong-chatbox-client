
import { setCookie, delCookie } from "../cookie";
import axios from "axios";


import io from "socket.io-client";
// import { Title } from "@material-ui/icons";
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
export const cm_signUp = async (member,rx_authenticated,rx_loading1,rx_me) => {
  rx_loading1(true);
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
    rx_loading1(false);
  }
//##########################################################

//##########################################################
//########### 로그인 ################
//##########################################################
export const cm_login = async (member,rx_authenticated,rx_loading1,rx_me) => {
  rx_loading1(true);
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
  rx_loading1(false);
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
  // rx_loading2(true);
  try {
    const { data } = await axios.get(api_url+'api/users');
    console.log('cm_all_users성공 소켓에 알리기',data)
    socket.emit('all_users', data);
  } catch (e) {
    console.log('유저리스트 실패');
  }
  // rx_loading2(false);
}
//##########################################################










//##########################################################
//########### 룸리스트 불러오기 ################
//##########################################################
export const cm_all_rooms = async (rx_loading3) => {
  rx_loading3(true);
  try {
    const { data } = await axios.get(api_url+'api/rooms');
    console.log('cm_all_rooms성공 소켓에 알리기',data.data)
    socket.emit('all_rooms', data.data);
    // socket.emit('msgs', data.data);
  } catch (e) {
    console.log('룸리스트 실패');
  }
  rx_loading3(false);
}
//##########################################################









  const msgadd = async (id) => {
    console.log('msgadd'+id);
    try {
      await axios.post(api_url+'api/msglists/', {
          "data":
          {
            "name":id,
            "list":[]
          }
        });
        console.log('메시지묶음도 추가 성공');
    } catch (e) {
      console.log('메시지묶음도 추가 실패'+e);
    }
  }

//##########################################################
//########### 내 룸 개설 ################
//##########################################################
const roomadd = async (me,you,all_rooms) => {
  console.log(`me : ${me} / you : ${you}`);
  try {
    const { data } = await axios.post(api_url+'api/rooms/', {
      "data":
        {
          "roomuser":[me,you]
        }
      });

      console.log('api서버에 새룸 추가 성공');
      msgadd(data.data.id);
      all_rooms.push(data.data);
      socket.emit('all_rooms', all_rooms);
  } catch (e) {
    console.log('api서버에 새룸 추가 실패',e);
  }
}

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
    console.log("방이 있으므로 ");

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
export const cm_sendChat = async(msg) => {
  try {
    await axios.post(api_url+'api/rooms/', {
      "data":
        {
          "name":msg.room,
          "list":[msg]
        }
      });
      // socket.emit('msgs', room);
      // socket.emit('SendChat',member);

      // console.log(`room : ${room} / all_rooms : ${all_rooms}`);
      console.log('#####cm_sendChat성공#####');
  } catch (e) {
    console.log('에러 메시지',e);
    // console.log(`room : ${room} / all_rooms : ${all_rooms}`);
    console.log('#####cm_sendChat실패#####');
  }
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
    console.log(`msgs : ${hello}`);
    console.log('#####cm_removeChat성공#####');
  } catch (e) {
    console.log(`msgs : ${hello}`);
    console.log('#####cm_removeChat실패#####');
  }
}
//##########################################################


















//##########################################################
//########### 룸에 친구추가 ################
//##########################################################
export const cm_roomfriend = async(data,focusroom,all_rooms) => {

  

  let dd  = all_rooms.filter((item) => item.id === focusroom)[0].attributes.roomuser;
  console.log(dd)


  try {
    await axios.put(api_url+'api/rooms/'+focusroom, {
      "data":
        {
          "roomuser":data
        }
      });
      socket.emit('all_rooms', all_rooms);
      console.log('#####cm_roomfriend성공#####');


      
  } catch (e) {
    console.log('에러 메시지',e);
    console.log('#####cm_roomfriend실패#####');
  }
} //cm_sendChat
//##########################################################








//##########################################################
//########### 메시지 저장및 셋팅 ################
//##########################################################
export const cm_getmsg = async () => {
  // console.log(msg);
  try {
    const { data } = await axios.get(api_url+'api/msglists');
    console.log('cm_getmsg성공 소켓에 알리기',data.data)
    socket.emit('get_msgs', data.data);
    // socket.emit('msgs', data.data);
  } catch (e) {
    console.log('cm_getmsg 실패');
  }
}
export const cm_setmsg = async (msg,all_msgs,focusroom) => {
  console.log('cm_setmsg',msg);
  console.log('all_msgs',all_msgs);
  let clone_all_msgs = all_msgs;
  let m_id = clone_all_msgs.filter((item) => item.attributes.name === focusroom );
  // m_id.length > 0 ? m_id[0].attributes.list.push(msg) : [];
  // m_id[0].attributes.list.push(msg);

if(m_id.length > 0){
  m_id[0].attributes.list.push(msg);
}else{
  return
}

  console.log('all_msgs_list',m_id);
  console.log('all_msgs_id',m_id.id);



  try {
    await axios.put(api_url+'api/msglists/'+m_id[0].id, {
      "data":
        {
          "list":m_id[0].attributes.list,
        }
      });
      console.log('api서버에 새룸 추가 성공');

      // all_rooms.push(data.data);
      socket.emit('get_msgs', clone_all_msgs);
  } catch (e) {
    console.log('api서버에 새룸 추가 실패',e);
  }
}
//##########################################################