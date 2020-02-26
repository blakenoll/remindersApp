import React from "react";
import Button from "./button";
import styled from "styled-components";

const ReminderForm = ({ className, onChange, formData, onSubmit }) => {
  return (
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
        <Button onClick={onSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default styled(ReminderForm)`
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
