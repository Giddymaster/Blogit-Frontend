import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Blogs from "./pages/Blogs";
import Read from "./pages/Read";
import WritePage from "./pages/WritePage";
import { Publish } from "@mui/icons-material";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/read" element={<Read />} />
      <Route path="/writeblog" element={<WritePage />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
}

export default App;
