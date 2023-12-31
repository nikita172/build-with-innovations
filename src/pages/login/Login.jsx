import React, { useEffect, useRef, useState } from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import "./login.css"
import Header from '../../components/header/Header';
import hero from "../../assets/images/innovation.jpg";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const storage = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (storage) {
      navigate("/")
    }
  }, [])
  const handleClick = async (e) => {
    setLoading(true);
    setIsFetching(true)
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.current.value,
          password: password.current.value,
        })
      });
      const result = await response.json();
      if (result.message) {
        setError(result.message)
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2000)
      } else {
        localStorage.setItem('token', JSON.stringify(result.token))
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false)
    setIsFetching(false)
  }

  return (
    <div className='loginSection'>
      <Header login={true} />
      {loading ? <div className="loadingStatus">
        <h2>
          Loading...

        </h2>
      </div> :
        <section id="loginContainer">
          <div className="loginContainerLeft">
            <form id="loginForm" onSubmit={handleClick}>
              <h2 className='loginHeading'>Login</h2>
              <div className="inputGroup inputEmail">
                <AlternateEmailIcon className='icons' />
                <input type="text" name="username" required placeholder="username" ref={username} />
              </div>
              <div className="inputGroup inputPassword">
                <LockIcon className='icons' />
                <input type="password" required name="password" minLength='6' placeholder="Password" ref={password} />
              </div>
              <div className="buttonGroup">
                <button type="submit" className="primary" id="loginBtn" disabled={isFetching}>
                  {isFetching ? "Loading..." : "LogIn"}
                </button>
              </div>
            </form>
          </div>
          <div className="loginContainerRight">
            <img className='rightImg' src={hero} />
          </div>
          <div className={`errorMsg ${isError ? "error" : ""} `}>{error} !</div>
        </section>
      }
    </div>
  )
}
