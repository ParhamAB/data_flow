import React from "react";
import styled from "styled-components";
import { Text } from "../utils/widgets/widgets";
import Theme from "../theme/theme";
import NavBarItem from "../utils/nav_bar_item/nav_bar_item";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function Main() {
  return (
    <Container>
      <Header>
        <Text text={"سامانه پردازش پیام"} fontSize="22px" fontWeight={"700"} />
        <AccountBox></AccountBox>
      </Header>
      <LowerContainer>
        <NavBar>
          <NavBarItem
            title={"صفحه اصلی"}
            icon={<HomeOutlinedIcon className="icons" />}
          ></NavBarItem>
          <NavBarItem
            title={"پردازش های من"}
            icon={<HomeOutlinedIcon className="icons" />}
          ></NavBarItem>
          <NavBarItem
            title={"عملیات رویداد ها"}
            subButtons={[
              { title: "ایجاد پردازش جدید", onClick: () => {} },
              { title: "مشاهده پردازش ها", onClick: () => {} },
            ]}
            icon={<HomeOutlinedIcon className="icons" />}
          ></NavBarItem>
          <NavBarItem
            title={"عملیات جریان شناسی"}
            subButtons={[
              { title: "ایجاد پردازش جدید", onClick: () => {} },
              { title: "مشاهده پردازش ها", onClick: () => {} },
            ]}
            icon={<HomeOutlinedIcon className="icons" />}
          ></NavBarItem>
          <NavBarItem
            title={"تحلیل آماری پایگاه داده"}
            icon={<HomeOutlinedIcon className="icons" />}
          ></NavBarItem>
        </NavBar>
        <MainContent></MainContent>
      </LowerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 20px;
  background-color: ${Theme.backGroundColorGreyLight};
`;

const AccountBox = styled.div`
  width: 200px;
  height: 100%;
`;

const LowerContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NavBar = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${Theme.backGroundColorGreyLight};
`;

const MainContent = styled.div`
  width: calc(100% - 230px);
  height: 100%;
  background-color: ${Theme.backGroundColorGrey};
`;
