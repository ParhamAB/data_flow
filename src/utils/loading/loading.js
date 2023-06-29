import React from "react";
import Theme from "../../theme/theme";
import styled from "styled-components";

function Loading() {
  return (
    <Center>
      <span class="loader"></span>
      <TextLoading>{"در حال دریافت اطلاعات..."}</TextLoading>
    </Center>
  );
}

export default Loading;

const Center = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const TextLoading = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-family: "iranSans";
  color: ${Theme.fontColor};
`;
