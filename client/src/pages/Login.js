import React, { useState, useContext } from "react";
import MainNav from "../components/MainNav";
import { useHistory } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import axios from "axios";
import { MyContext } from "../contexts/Store";
axios.defaults.withCredentials = true;

function Login() {
  const history = useHistory();
  const { handleResponseSuccess } = useContext(MyContext);
  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
  });
  console.log(userinfo);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState(""); // 가입이 되지 않은 경우 에러
  const [testEmail, setTestEmail] = useState("");
  const [testPassword, setTestPassword] = useState("");

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  const emailValidation = (e) => {
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regExp.test(e.target.value)) {
      setEmailErrMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailErrMsg("");
    }
  };

  const handleLogin = () => {
    const { email, password } = userinfo;
    if (email === "" || password === "") {
      setErrMsg("필수 정보입니다.");
    } else {
      setErrMsg("");
      axios
        .post("http://localhost:80/signin", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log("login success ??", res.statusText);
          // 로그인이 성공했으니 유저 정보를 불러오고, 로그인 상태를 변경해야한다.
          handleResponseSuccess();
        })
        .catch((err) => {
          setLoginErrMsg("이메일과 비밀번호를 다시 확인해 주세요.");
          console.log("login err message=>", err);
        });
    }
  };

  // 사이트 체험하기
  const handleExperienceSite = () => {
    axios
      .post("http://localhost:80/signin", {
        email: "test@test.com",
        password: "Abcd1234!",
      })
      .then((res) => {
        console.log("login success ??", res.statusText);
        handleResponseSuccess();
      })
      .catch((err) => {
        console.log("login err message=>", err);
      });
  };
  const GOOGLE_LOGIN_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=123608818142-seg1ni8901s8u5ci2hhhk3rd2tj0o8v1.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/userinfo.email";

  const googleLoginHandler = () => {
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  const url = `https://kauth.kakao.com/oauth/authorize?client_id=a87651345b7491d42793ae30327c6fb0&redirect_uri=http://localhost:3000&response_type=code`;
  const socialLoginHandler = () => {
    window.location.assign(url);
  };

  return (
    <div>
      <MainNav />
      <div className="login">
        <div className="loginwrap">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="lin-title">로그인</div>
            <div className="lin-email">
              <div className="lin-email-title">이메일</div>
              <input
                onBlur={emailValidation}
                onChange={handleInputValue("email")}
                className="lin-email-input"
              ></input>
              {userinfo.email === "" ? (
                <div className="lin-email-warning">{errMsg}</div>
              ) : (
                <div className="lin-email-warning">{emailErrMsg}</div>
              )}
            </div>
            <div className="lin-password">
              <div className="lin-password-title">비밀번호</div>
              <input
                onChange={handleInputValue("password")}
                className="lin-password-input"
                type="password"
              ></input>
              {userinfo.password === "" ? (
                <div className="lin-password-warning">{errMsg}</div>
              ) : null}
            </div>
            <button type="submit" id="lin-btnLogin" onClick={handleLogin}>
              로그인
            </button>
            {/* <Link to="signup"> */}
            <div className="lin-signup">
              <div
                onClick={() => history.push("/signup")}
                className="lin-signup-text"
              >
                회원가입
              </div>
            </div>
            {/* </Link> */}
            <div className="lin-experience">
              <div
                className="lin-experience-text"
                onClick={handleExperienceSite}
              >
                체험하기
              </div>
            </div>
            <div className="lin-divider"></div>
            <div>
              <button
                className="lin-kakao"
                onClick={socialLoginHandler}
              ></button>
            </div>
            <div>
              <button className="lin-google" onClick={googleLoginHandler}>
                <div className="lin-google-logo"></div>
                <div className="lin-google-text">구글 로그인</div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Login;
