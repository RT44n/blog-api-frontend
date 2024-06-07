import "./App.css";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./utilities/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Dashboard></Dashboard>
      </AuthProvider>
    </>
  );
}

export default App;
