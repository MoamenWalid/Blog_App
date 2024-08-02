import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";

const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/forms/Login'));
const SignUp = React.lazy(() => import('./pages/forms/SignUp'));
const PostsPage = React.lazy(() => import('./pages/posts-page/PostsPage'));
const Admin = React.lazy(() => import('./pages/admin/Admin'));
const CreatePost = React.lazy(() => import('./pages/create-post/CreatePost'));
const Profile = React.lazy(() => import('./pages/profiles/Profile'));
const NotFoundPage = React.lazy(() => import('./pages/notfound/NotFoundPage'));
const PostsBerCategory = React.lazy(() => import('./components/posts/PostsBerCategory'));
const SinglePost = React.lazy(() => import('./components/posts/SinglePost'));
const GetPosts = React.lazy(() => import('./pages/admin/GetPosts'));
const GetCategories = React.lazy(() => import('./pages/admin/GetCategories'));
const GetComments = React.lazy(() => import('./pages/admin/GetComments'));
const GetMembers = React.lazy(() => import('./pages/admin/GetMembers'));

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>

    </BrowserRouter>
  );
}

export default App;