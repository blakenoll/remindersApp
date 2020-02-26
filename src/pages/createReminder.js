import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "../utils/globalState";
import Container from "../components/container";
import Button from "../components/button";

const CreateReminderPage = ({ className }) => {
  const [{ session }, dispatch] = useGlobalState();
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });
  let history = useHistory();

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = async event => {
    event.preventDefault();
    const userDetailsResponse = await fetch(
      "https://blakesreminders.auth.us-west-2.amazoncognito.com/oauth2/userInfo",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${session.credentials.accessToken}`
        }
      }
    );
    const userDetails = await userDetailsResponse.json();
    console.log(userDetails);
    dispatch({
      type: "setSession",
      session: { ...session, userDetails }
    });
    const response = await fetch("http://localhost:8080/api/reminders", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${session.credentials.accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        phone: userDetails["phone_number"]
      })
    });
    const json = await response.json();

    if (json.status === "added") {
      history.push("/");
    }
  };

  return (
    <Container>
      <div className={className}>
        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              onChange={onChange}
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="due">Due Date: </label>
            <input
              type="date"
              name="date"
              onChange={onChange}
              value={formData.date}
            />
          </div>
          <div>
            <label htmlFor="time">Due Time: </label>
            <input
              type="time"
              name="time"
              onChange={onChange}
              value={formData.time}
            />
          </div>
          <Button onClick={submit}>Submit</Button>
        </form>
      </div>
    </Container>
  );
};

export default styled(CreateReminderPage)`
  form {
    background: var(--dp-2);
    color: var(--med-emph);
    padding: 10px;
    border-radius: 10px;
    div:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  input {
    background: var(--dp-6);
    border: none;
    padding: 5px;
    color: var(--hi-emph);
  }
`;
