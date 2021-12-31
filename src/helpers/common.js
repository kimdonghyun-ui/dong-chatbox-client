
import { setCookie } from "../cookie";
import axios from "axios";

const api_url = "http://localhost:1337/";
// const api_url = "https://dongdong-api.herokuapp.com/";


//##########################################################
//########### 로그인 여부를 판단해주는 함수(firebase) ################
//##########################################################
export function CM_login_state(rx_authenticated) {
//   fireauth.onAuthStateChanged((user) => {
//     if (user) {
//       //로그인상태---
//       console.log("App/로그인", user);
//       //#########################
//       //connected(true);
//       rx_authenticated(true); //현재 로그인 여부 파악을 위한 값
//       //#########################
//     } else {
//       //로그아웃상태---
//       console.log("App/로그아웃", user);
//       //#########################
//       //connected(false);
//       rx_authenticated(false); //현재 로그인 여부 파악을 위한 값
//       //#########################
//     }
//   });
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
export const cm_all_users = async (rx_all_users,socket) => {
  // rx_big_loading(true);
  try {
    const { data } = await axios.get(api_url+'api/users');
    // console.log(data);
    rx_all_users(data);
    socket.emit('all_users', data);
  } catch (e) {
    console.log('유저리스트 실패');
  }
  // rx_big_loading(false);
}
//##########################################################




