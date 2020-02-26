import React from "react";
import styled from "styled-components";

const Loader = ({ className }) => <div className={className}></div>;

export default styled(Loader)`
  border: 16px solid var(--dp-3);
  border-top: 16px solid var(--primary);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
