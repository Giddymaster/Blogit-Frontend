import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Blogs from './pages/Blogs';
import WriteBlog from './pages/WriteBlog';
import Profile from './pages/Profile';
import BlogDetail from './pages/BlogDetail';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/writeblog" element={<WriteBlog />} />
      <Route path="/profile" element= {<Profile />}/>
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
    </Routes>
  );
}

export default App;
