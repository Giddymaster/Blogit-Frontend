import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Blogs from './pages/Blogs';
import WriteBlog from './pages/WriteBlog';
import BlogEntry from './pages/BlogEntry';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/writeblog" element={<WriteBlog />} />
      <Route path="/blog/:blogId" element={<BlogEntry />} />
    </Routes>
  );
}

export default App;
