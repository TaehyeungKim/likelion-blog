import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Home from "./routes/Home";
import { Header } from "@/shared/components";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import { UserContextProvider } from "@/shared/context";
function AppContent() {
  const location = useLocation();

  const HIDE_HEADER_PATHS = ["/signin", "/signup"];

  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);

  return (
    <UserContextProvider>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </UserContextProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
