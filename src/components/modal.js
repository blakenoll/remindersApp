import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useGlobalState } from "../utils/globalState";
import styled from "styled-components";
import ReminderForm from "./reminderForm";

const Modal = ({ reminder, className, setOpen }) => {
  const [formData, setFormData] = useState({
    name: reminder.name,
    date: new Date(reminder.due).toLocaleDateString(),
    time: reminder.due
  });

  const [{ session }] = useGlobalState();

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const submit = async event => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/reminders", {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${session.credentials.accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        phone: session.userDetails["phone_number"],
        id: reminder._id
      })
    });
    const json = await response.json();

    if (json.status === "updated") {
      window.location.reload();
    }
  };

  return ReactDOM.createPortal(
    <div className={className}>
      <div className="form">
        <div className="align-right">
          <button onClick={() => setOpen(false)}>close</button>
        </div>
        <ReminderForm
          formData={formData}
          onChange={onChange}
          onSubmit={submit}
        />
      </div>
    </div>,
    document.body
  );
};

export default styled(Modal)`
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.2);
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  margin: 0 auto;
  backdrop-filter: blur(3px);
  .form {
    width: 300px;
    margin: 0 auto;
  }
  .align-right {
    text-align: right;
  }
`;
