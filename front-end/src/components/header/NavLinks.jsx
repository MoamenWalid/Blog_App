const NavLinks = ({ navStyle, ulStyle, liStyle }) => {
  return (
    <div className={`nav-links ${ navStyle }`}>
      <ul className={ `${ ulStyle }` }>
        <li className={ `text-dark ${ liStyle }` }><a href="/">Home</a></li>
        <li className={ `text-dark ${ liStyle }` }><a href="/">Posts</a></li>
        <li className={ `text-dark ${ liStyle }` }><a href="/">Create</a></li>
        <li className={ `text-dark ${ liStyle }` }><a href="/">Admin dashboard</a></li>
      </ul>
    </div>
  );
};

export default NavLinks;
