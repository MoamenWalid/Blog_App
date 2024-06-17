import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import SignUp from "./pages/forms/SignUp";
import PostsPage from "./pages/posts-page/PostsPage";
import Admin from "./pages/admin/Admin";
import CreatePost from "./pages/create-post/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="/posts" element={ <PostsPage /> } />
        <Route path="/posts/create-post" element={ <CreatePost /> } />
        <Route path="/admin-dashboard" element={ <Admin /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;