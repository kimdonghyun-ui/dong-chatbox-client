
import { setCookie, delCookie } from "../cookie";
import axios from "axios";


import io from "socket.io-client";
const socket = io.connect("http://localhost:4001");

const api_url = "http://localhost:1337/";
// const api_url = "https://dongdong-api.herokuapp.com/";


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