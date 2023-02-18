import { Outlet } from 'react-router-dom';
import { CustomLink } from './CustomLink';

// const setActive = ({ isActive }) => (isActive ? 'active-link' : '');
// const setActive2 = ({ isActive }) => ({
//   color: isActive ? 'var(--color-active)' : 'white',
// });

const Layout = () => {
  return (
    <>
      <header>
        <CustomLink
          to="/"
          //   style={setActive2}
        >
          Home
        </CustomLink>
        <CustomLink
          to="/posts"
          //   className={setActive}
        >
          Blog
        </CustomLink>
        <CustomLink
          to="/about"
          //   className={setActive}
        >
          About
        </CustomLink>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="container">SashaMaslak © 2023</footer>
    </>
  );
};

export { Layout };
