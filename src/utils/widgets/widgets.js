import React from "react";
import styled from "styled-components";
import Theme from "../../theme/theme";

/// Text Widget ///
export function Text({
  text,
  color = Theme.fontColor,
  fontSize = "15px",
  fontWeight = 500,
}) {
  return (
    <TextContainer color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {text}
    </TextContainer>
  );
}

const TextContainer = styled.p`
  font-family: "iranSans";
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;
/// **********///
export function SizedBox({ width, height }) {
  return <SizedBoxContainer width={width} height={height} />;
}

const SizedBoxContainer = styled.p`
  font-family: "iranSans";
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

/// SizedBox ///
