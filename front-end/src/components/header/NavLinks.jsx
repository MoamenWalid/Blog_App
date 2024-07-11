import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavLinks = ({ navStyle, ulStyle, liStyle }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className={`nav-links ${ navStyle }`}>
      <ul className={ `${ ulStyle }` }>
        <li className={ `text-dark ${ liStyle }` }><Link to='/'>Home</Link></li>
        <li className={ `text-dark ${ liStyle }` }><Link to='/posts'>Posts</Link></li>
        { user && <li className={ `text-dark ${ liStyle }` }><Link to='/posts/create-post'>Create</Link></li> }
        { user?.isAdmin  && <li className={ `text-dark ${ liStyle }` }><Link to='/admin-dashboard'>Admin dashboard</Link></li> }
      </ul>
    </div>
  );
};

export default NavLinks;