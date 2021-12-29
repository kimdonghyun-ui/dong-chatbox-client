
import { setCookie } from "../cookie";
import axios from "axios";



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
export const cm_signUp = async (member) => {
    try {
      const { data } = await axios.post('https://dongdong-api.herokuapp.com/api/auth/local/register', {
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
      }
    } catch (e) {
      console.log('회원가입 실패');
    } 
  }
//##########################################################

//##########################################################
//########### 로그인 ################
//##########################################################
export const cm_login = async (member,rx_authenticated) => {
    try {
      const { data } = await axios.post('https://dongdong-api.herokuapp.com/api/auth/local', {
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
        rx_authenticated(true);
      }
    } catch (e) {
      console.log('실패');

    } 
  }
//##########################################################
