import "./App.css";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Sidebar } from "./components/Sidebar";
function App() {
  return (
    <>
      <h1>Blog</h1>
      <Header></Header>
      <Content></Content>
      <Sidebar></Sidebar>
    </>
  );
}

export default App;
