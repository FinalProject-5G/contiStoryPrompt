
import React, { useState, useEffect } from "react";
import styles from "../styles/Joinbox.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import VaildPassword from "./VaildPassword";

const Joinbox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1");
  const [samePassword, setSamePassword] = useState("");
  const [vaildPasswordAlert, setVaildPasswordAlert] = useState(false)
  const [nickname, setNickname] = useState("");


  const sendJoin = () => {
    if (email != '' && password != '' && nickname != '' && password == samePassword) {
      axios
        .post("/userJoin/join", {
          email: email,
          password: password,
          nickname: nickname,
        })
        .then((res) => {
          if (res.data == "success") {
            navigate("/login");
            alert("회원가입 완료되었습니다");
          } else {
            alert('입력을 확인해주세요')
          }
        })
        .catch(function (error) {
          console.log(error.toJSON());
        });
    }

    else {
      alert('모든항목 입력해주세요')
    }
  }
  const vaildEmail = () => {
    axios.post("/userJoin/vaildEmail", { email: email }).then((res) => {
      if (res.data == "invaild") {
        window.location.href = '/join'
        alert("중복된 아이디가 존재합니다.");
      } else {
        alert("가입 가능한 아이디입니다.");
      }
    })
      .catch(function (error) {
        console.log(error.toJSON());
      });;
  };

  return (
    <section className={styles.joinBackground}>
      <div className={styles.joinBox}>
        <div style={{ marginBottom: "10px" }}>
          <img width="100px" src="images/logo.png" alt="logo" />
        </div>
        {/* <GoogleLoginButton /> */}
        <div className={styles.joinEmail}>
          <input
            className={styles.formItem}
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            className={styles.vaildEmail}
            onClick={
              vaildEmail
            }
          >
            확인
          </button>
        </div>
        <input
          className={styles.formItem}
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className={styles.formItem}
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setSamePassword(e.target.value)}
        ></input>
        <VaildPassword
          password={password}
          samePassword={samePassword}
          vaild={setVaildPasswordAlert}
        ></VaildPassword>
        <input
          className={styles.formItem}
          placeholder="닉네임"
          onChange={(e) => setNickname(e.target.value)}
        ></input>
        <button
          className={styles.joinBtn}
          type="submit"
          onClick={sendJoin}>
          회원가입
        </button>

        <div>
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Joinbox;
