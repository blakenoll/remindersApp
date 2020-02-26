import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalState } from "../utils/globalState";
import cognitoUtils from "../utils/cognitoUtils";
import Button from "../components/button";

const Navbar = ({ className }) => {
  const [{ session }, dispatch] = useGlobalState();
  // check if user has logged in and set as logged in if info is cached
  useEffect(() => {
    const checkSession = async () => {
      try {
        const cachedSession = await cognitoUtils.getCognitoSession();
        const response = await fetch(
          "https://blakesreminders.auth.us-west-2.amazoncognito.com/oauth2/userInfo",
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${cachedSession.credentials.accessToken}`
            }
          }
        );
        // move this to create create to alway have details
        const userDetails = await response.json();
        dispatch({
          type: "setSession",
          session: { ...cachedSession, userDetails }
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkSession();
  }, [dispatch]);

  // logout functionality
  const logout = () => {
    cognitoUtils.signOutCognitoSession();
    dispatch({ type: "setSession", session: null });
  };

  // show usename in navabar if logged in
  return (
    <nav className={className}>
      <a href="/">Reminders</a>
      {session != null ? (
        <div className="flex">
          <span>{session.user.userName}</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default styled(Navbar)`
  height: 60px;
  background: var(--dp-2);
  color: var(--hi-emph);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  a {
    font-size: 22px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 24px;
      margin-right: 10px;
    }
  }
  span {
    font-size: 28px;
    margin-right: 10px;
  }
`;
