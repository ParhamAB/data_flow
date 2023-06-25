import styled from "styled-components";
import "./App.css";
import Main from "./components/main";

function App() {
  return (
    <Container>
      <Main></Main>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "iranSans";
  direction: rtl;
`;
