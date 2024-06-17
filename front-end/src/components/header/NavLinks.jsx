import { Link } from "react-router-dom";

const NavLinks = ({ navStyle, ulStyle, liStyle }) => {
  return (
    <div className={`nav-links ${ navStyle }`}>
      <ul className={ `${ ulStyle }` }>
        <li className={ `text-dark ${ liStyle }` }><Link to='/'>Home</Link></li>
        <li className={ `text-dark ${ liStyle }` }><Link to='/posts'>Posts</Link></li>
        <li className={ `text-dark ${ liStyle }` }><Link to='/posts/create-post'>Create</Link></li>
        <li className={ `text-dark ${ liStyle }` }><Link to='/admin-dashboard'>Admin dashboard</Link></li>
      </ul>
    </div>
  );
};

export default NavLinks;