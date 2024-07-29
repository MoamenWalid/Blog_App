import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavLinks = ({ navStyle, ulStyle, liStyle, reverseToggle }) => {
  const { user } = useSelector(state => state.auth);

  const handleClick = () => {
    if (reverseToggle) reverseToggle(false);
  }

  return (
    <div className={`nav-links ${ navStyle }`}>
      <ul className={ `${ ulStyle }` }>
        <li onClick={ handleClick } className={ `text-dark ${ liStyle }` }><Link to='/'>Home</Link></li>
        <li onClick={ handleClick } className={ `text-dark ${ liStyle }` }><Link to='/posts'>Posts</Link></li>
        { user && <li onClick={ handleClick } className={ `text-dark ${ liStyle }` }><Link to='/posts/create-post'>Create</Link></li> }
        { user?.isAdmin  && <li onClick={ handleClick } className={ `text-dark ${ liStyle }` }><Link to='/admin-dashboard'>Admin dashboard</Link></li> }
      </ul>
    </div>
  );
};

export default NavLinks;