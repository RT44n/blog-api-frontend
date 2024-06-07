import "./App.css";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Sidebar } from "./components/Sidebar";
import AuthProvider from "./utilities/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="container mx-auto px-4 lg:px-0 max-w-7xl">
          <Content />
          <Sidebar />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
