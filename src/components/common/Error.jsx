import React from "react";
import styled from "styled-components";
import error from "../../assets/error.jpeg";
import { Cards } from "../../pages/Homepage";
const LoaderWrapper = styled.div`
  display: flex;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999;
`;
export const MessageDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 29px;
  font-weight: bold;
`;
const ErrorBoundary = (props) => {
  return (
    <LoaderWrapper>
      <Cards>
        <img src={error} alt="logo" data-testid="application-error" />
        <MessageDiv>{props.children} :(</MessageDiv>
      </Cards>
    </LoaderWrapper>
  );
};

export default ErrorBoundary;
