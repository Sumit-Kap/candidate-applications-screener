import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  padding-bottom: 5px;
`;
const RadioInput = ({ label, value, checked, setter, uniqueKey }) => {
  return (
    <Label key={uniqueKey}>
      <input
        type="radio"
        checked={checked === value}
        onChange={() => {
          setter(value);
        }}
      />
      <span>{label}</span>
    </Label>
  );
};

export default RadioInput;
