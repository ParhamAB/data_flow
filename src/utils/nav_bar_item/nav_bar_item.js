import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../theme/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useLocation, useNavigate } from "react-router-dom";

function NavBarItem({
  title,
  iconInActive,
  iconActive,
  subButtons = [],
  router,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const toggleHover = () => setIsHovered(!isHovered);
  const navigator = useNavigate();

  useEffect(() => {
    if (subButtons.length === 0) {
      if (location.pathname === router) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      if (location.pathname.includes(router)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <Container>
      <Button
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={
          subButtons.length > 0
            ? () => {
                if (!location.pathname.includes(router)) {
                  setIsOpen(!isOpen);
                }
              }
            : () => {
                navigator(router);
              }
        }
        isOpen={isOpen}
      >
        <Border style={{ opacity: isOpen ? "1" : "0" }} />
        <IconContainer>
          {isOpen || isHovered ? iconActive : iconInActive}
        </IconContainer>
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
            <SubButton
              isOpen={location.pathname === e.router}
              onClick={() => {
                navigator(e.router);
              }}
            >
              <FiberManualRecordIcon
                style={{
                  color:
                    location.pathname === e.router
                      ? Theme.purpleColorLight
                      : Theme.fontColorInActive,
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

  &:hover ${TextNavBar}, &:hover .arrowDown {
    color: ${Theme.fontColor};
  }

  .arrowDown {
    position: absolute;
    top: 22px;
    left: 10px;
    color: ${Theme.fontColorInActive};
    font-size: 18px;
  }
`;

const IconContainer = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  width: 100%;
  background-color: ${Theme.secondBackGround};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-starts;
  transition: 300ms;
  overflow: hidden;
`;

const SubButton = styled.div`
  width: fit-content;
  margin-right: 40px;
  font-size: 13px;
  color: ${Theme.fontColorInActive};
  font-weight: 500;
  color: ${(props) => (props.isOpen ? Theme.fontColor : "none")};
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
