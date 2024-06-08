import Main from "./components/Main";
import Container from "@mui/material/Container";
import "./index.css";
function App() {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Main />
      </Container>
    </div>
  );
}

export default App;
