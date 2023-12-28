import {NavLink, useNavigate} from "react-router-dom";
import {clearUser, getUser} from "../utils/users";
import {ADDITIONAL_ROUTE, FEEDBACKS_ROUTE, HOME_ROUTE, MOVIES_ROUTE, NEWS_ROUTE} from "../utils/consts";

const NavBar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return <header>
    <h1>CineMagic</h1>
    <p>{timezone}
      {user && ` Hello, ${user.email}`}
    </p>

    <nav>
      <ul>
        <li><NavLink to={HOME_ROUTE}>Home</NavLink></li>
        <li><NavLink to={NEWS_ROUTE}>News</NavLink></li>
        <li><NavLink to={MOVIES_ROUTE}>Movies</NavLink></li>
        <li><NavLink to={FEEDBACKS_ROUTE}>Feedbacks</NavLink></li>
        <li><NavLink to={ADDITIONAL_ROUTE}>Additional</NavLink></li>

        {user && <li>
          <a onClick={() => {
            clearUser();
            navigate('/');
          }}>
            Log out
          </a>
        </li>}

        {!user && <>
          <li>
            <NavLink to="/sign_up">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/sign_in">Sign in</NavLink>
          </li>
        </>}

      </ul>
    </nav>
  </header>;
};

export default NavBar;