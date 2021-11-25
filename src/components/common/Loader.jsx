import React from "react";
import styled from "styled-components";
import loader from "../../assets/loader.svg";
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
const Loader = () => {
  return (
    <LoaderWrapper>
      <img src={loader} alt="logo" data-testid="image-loader" />
    </LoaderWrapper>
  );
};

export default Loader;
