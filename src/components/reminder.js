import React, { useState } from "react";
import { useGlobalState } from "../utils/globalState";
import styled from "styled-components";
import Modal from "./modal";
import deleteReminder from "../utils/deleteReminder";
import EditIcon from "./icons/editIcon";
import CheckIcon from "./icons/checkIcon";

//pass in reminder and then use a portal to open a from to submit edited data
const Reminder = ({ reminder, className }) => {
  const [{ session }] = useGlobalState();
  const [open, setOpen] = useState(false);
  // useState to open and close modal
  const date = new Date(reminder.due);

  const callDeleteReminder = async () => {
    const response = await deleteReminder(reminder._id, session);
    if (response.deleted) {
      window.location.reload();
    }
  };
  return (
    <div className={className}>
      <button onClick={() => callDeleteReminder(reminder._id, session)}>
        Complete <CheckIcon />
      </button>
      <div className="info">
        <p>{reminder.name}</p>
        <span>
          Due: {date.toLocaleDateString()}{" "}
          {date.toLocaleTimeString().replace(/:\d\d([ ap]|$)/, "$1")}
        </span>
      </div>
      <button onClick={() => setOpen(true)}>
        Edit <EditIcon />
      </button>
      {open && <Modal reminder={reminder} setOpen={setOpen} />}
    </div>
  );
};

export default styled(Reminder)`
  background: var(--dp-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 300px;
  button {
    color: var(--med-emph);
    background: transparent;
    border: none;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    color: var(--med-emph);
    p {
      font-size: 18px;
      margin: 0 0 5px 0;
    }
    span {
      font-size: 16px;
    }
  }
  .modal {
    width: 300px;
  }
`;
