import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Homepage } from 'pages/Homepage';
import { About } from 'pages/Aboutpage';
import { Blogpage, blogLoader } from 'pages/Blogpage';
import { Singlepage, postLoader } from 'pages/Singlepage';
import { Createpost, createPostAction } from 'pages/Createpost';
import { Editpost, updatePostAction } from 'pages/Editpost';
import { Notfoundpage } from 'pages/Notfoundpage';
import { Loginpage } from 'pages/Loginpage';

import { Layout } from 'components/Layout';

import { RequireAuth } from 'hoc/RequireAuth';
import { AuthProvider } from 'hoc/AuthProvider';
import { Errorpage } from 'pages/Errorpage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="/about" element={<About />}>
        <Route path="contacts" element={<p>Our Contacts</p>} />
        <Route path="team" element={<p>Our team</p>} />
      </Route>
      <Route path="/about-us" element={<Navigate to="/about" replace />} />
      <Route
        path="/posts"
        element={<Blogpage />}
        loader={blogLoader}
        errorElement={<Errorpage />}
      />
      <Route path="/posts/:id" element={<Singlepage />} loader={postLoader} />
      <Route
        path="/posts/:id/edit"
        element={<Editpost />}
        loader={postLoader}
        action={updatePostAction}
      />
      <Route
        path="/posts/new"
        element={
          <RequireAuth>
            <Createpost />
          </RequireAuth>
        }
        action={createPostAction}
      />
      <Route path="/login" element={<Loginpage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
export default App;
// import { Routes, Route, Navigate } from 'react-router-dom';

// import { Homepage } from './pages/Homepage';
// import { About } from './pages/Aboutpage';
// import { Blogpage } from './pages/Blogpage';
// import { Createpost } from './pages/Createpost';
// import { Editpost } from './pages/Editpost';
// import { Singlepage } from './pages/Singlepage';
// import { Notfoundpage } from './pages/Notfoundpage';
// import { LoginPage } from './pages/Loginpage';

// import { Layout } from './components/Layout'

// import { RequireAuth } from './hoc/RequireAuth'
// import { AuthProvider } from './hoc/AuthProvider'

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Homepage />} />
//           <Route path="about" element={<About />}>
//             <Route path="contacts" element={<p>Our contact</p>} />
//             <Route path="team" element={<p>Our team</p>} />
//           </Route>
//           <Route path="about-us" element={<Navigate to="/about" replace />} />
//           <Route path="posts" element={<Blogpage />} />
//           <Route path="posts/:id" element={<Singlepage />} />
//           <Route path="posts/:id/edit" element={<Editpost />} />
//           <Route path="posts/new" element={
//             <RequireAuth>
//               <Createpost />
//             </RequireAuth>
//           } />
//           <Route path="login" element={<LoginPage />} />
//           <Route path="*" element={<Notfoundpage />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;
