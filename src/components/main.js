import React from "react";
import styled from "styled-components";
import { Text } from "../utils/widgets/widgets";
import Theme from "../theme/theme";
import NavBarItem from "../utils/nav_bar_item/nav_bar_item";
import HomeIcon from "../utils/icons/navbar_icons/home_icon";
import ActivityIcon from "../utils/icons/navbar_icons/activity_icon";
import CategoryIcon from "../utils/icons/navbar_icons/category_icon";
import SwapIcon from "../utils/icons/navbar_icons/swap_icon";
import GraphIcon from "../utils/icons/navbar_icons/graph_icon";
import Router from "../router/router";

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
            key={"nav1"}
            title={"صفحه اصلی"}
            iconActive={<HomeIcon color={Theme.fontColor} />}
            iconInActive={<HomeIcon color={Theme.fontColorInActive} />}
            router={"/main-menu"}
          ></NavBarItem>
          <NavBarItem
            key={"nav2"}
            title={"پردازش های من"}
            iconActive={<ActivityIcon color={Theme.fontColor} />}
            iconInActive={<ActivityIcon color={Theme.fontColorInActive} />}
            router={"/my-process"}
          ></NavBarItem>
          <NavBarItem
            key={"nav3"}
            title={"عملیات رویداد ها"}
            iconActive={<CategoryIcon color={Theme.fontColor} />}
            iconInActive={<CategoryIcon color={Theme.fontColorInActive} />}
            router={"/events"}
            subButtons={[
              { title: "ایجاد پردازش جدید", router: "/events/new-process" },
              { title: "مشاهده پردازش ها", router: "/events/all-process" },
            ]}
          ></NavBarItem>
          <NavBarItem
            key={"nav4"}
            title={"عملیات جریان شناسی"}
            iconActive={<SwapIcon color={Theme.fontColor} />}
            iconInActive={<SwapIcon color={Theme.fontColorInActive} />}
            router={"/flow"}
            subButtons={[
              { title: "ایجاد پردازش جدید", router: "/flow/new-process" },
              { title: "مشاهده پردازش ها", router: "/flow/all-process" },
            ]}
          ></NavBarItem>
          <NavBarItem
            key={"nav5"}
            title={"تحلیل آماری پایگاه داده"}
            iconActive={<GraphIcon color={Theme.fontColor} />}
            iconInActive={<GraphIcon color={Theme.fontColorInActive} />}
            router={"/statistical-analysis-of-database"}
          ></NavBarItem>
        </NavBar>
        <MainContent>
          <Router></Router>
        </MainContent>
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
  box-sizing: border-box;
  overflow: auto;
`;
