import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import SignUp from "./pages/forms/SignUp";
import PostsPage from "./pages/posts-page/PostsPage";
import Admin from "./pages/admin/Admin";
import CreatePost from "./pages/create-post/CreatePost";
import Profile from "./pages/profiles/Profile";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import { useSelector } from "react-redux";
import PostsBerCategory from "./components/posts/PostsBerCategory";
import SinglePost from "./components/posts/SinglePost";
import GetPosts from "./pages/admin/GetPosts";
import GetCategories from "./pages/admin/GetCategories";
import GetComments from "./pages/admin/GetComments";
import GetMembers from "./pages/admin/GetMembers";

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ !user ? <Login /> : <NotFoundPage /> } />
        <Route path="/sign-up" element={ !user ? <SignUp /> : <NotFoundPage /> } />
        
        <Route path="posts">
          <Route index element={ <PostsPage /> } />
          <Route path="create-post" element={ user ? <CreatePost /> : <NotFoundPage /> } />
          <Route path=":category" element={ <PostsBerCategory title="Posts" /> } />
          <Route path="details/:id" element={ <SinglePost /> } />
        </Route>

        <Route path="/profile/:id" element={ user ? <Profile /> : <NotFoundPage /> }/>
        
        <Route path="admin-dashboard">
          <Route index element={ user?.isAdmin ? <Admin /> : <NotFoundPage /> } />
          <Route path="users" element={ user?.isAdmin ? <GetMembers /> : <NotFoundPage /> } />
          <Route path="posts" element={ user?.isAdmin ? <GetPosts /> : <NotFoundPage /> } />
          <Route path="categories" element={ user?.isAdmin ? <GetCategories /> : <NotFoundPage /> } />
          <Route path="comments" element={ user?.isAdmin ? <GetComments /> : <NotFoundPage /> } />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;