import React, { useState } from "react";
import styled from "styled-components";
import Theme from "../../theme/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Text } from "../widgets/widgets";

function NavBarItem({ title, icon, subButtons = [], onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Button
        onClick={
          subButtons.length > 0
            ? () => {
                setIsOpen(!isOpen);
              }
            : onClick
        }
        isOpen={isOpen}
      >
        <Border style={{ opacity: isOpen ? "1" : "0" }} />
        {icon}
        <TextNavBar style={{ color: isOpen ? Theme.fontColor : null }}>
          {title}
        </TextNavBar>
        {subButtons.length > 0 ? (
          <KeyboardArrowDownIcon
            className="arrowDown"
            style={{
              transform: isOpen ? "rotate(180deg)" : "none",
              color: isOpen ? Theme.fontColor : null,
            }}
          />
        ) : null}
      </Button>
      <SubContainer
        style={{
          height: isOpen ? subButtons.length * 50 + "px" : "0px",
          opacity: isOpen ? "1" : "0",
        }}
      >
        {subButtons.map((e) => {
          return (
            <SubButton onClick={e.onClick}>
              <FiberManualRecordIcon
                style={{
                  color: Theme.fontColorInActive,
                  marginLeft: "15px",
                  fontSize: "10px",
                }}
              />
              {e.title}
            </SubButton>
          );
        })}
      </SubContainer>
    </Container>
  );
}

export default NavBarItem;

const Container = styled.div`
  width: 100%;
  transition: 300ms;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TextNavBar = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-family: "iranSans";
  color: ${Theme.fontColorInActive};
`;

const Button = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-right: 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isOpen ? Theme.backGroundColorGrey : "none"};
  cursor: pointer;

  &:hover {
    background-color: ${Theme.backGroundColorGrey};
  }

  &:hover ${TextNavBar}, &:hover .icons,
  &:hover .arrowDown {
    color: ${Theme.fontColor};
    transition: 300ms;
  }

  .icons {
    color: ${(props) =>
      props.isOpen ? Theme.fontColor : Theme.fontColorInActive};
    font-size: 30px;
    margin-left: 10px;
  }

  .arrowDown {
    position: absolute;
    top: 22px;
    left: 10px;
    color: ${Theme.fontColorInActive};
    font-size: 18px;
  }
`;

const SubContainer = styled.div`
  width: 100%;
  background-color: ${Theme.secondBackGround};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-starts;
  transition: 500ms;
  overflow: hidden;
`;

const SubButton = styled.div`
  width: fit-content;
  margin-right: 40px;
  font-size: 13px;
  color: ${Theme.fontColorInActive};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${Theme.fontColor};
  }
`;

const Border = styled.div`
  width: 7px;
  height: 60%;
  border-radius: 20px;
  background-color: ${Theme.purpleColorLight};
  margin-left: 5px;
  transition: 300ms;
`;
