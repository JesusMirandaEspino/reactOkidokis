import Login from "../login/login.tsx";
import CreateAccount from "../createAccount/createAccount.tsx";
import { Outlet, Link } from "react-router-dom";
import "./home.css"
import { useSelector, useDispatch } from "react-redux";

interface RootState {
  session: {
    bearer: string;
    active: boolean;
    roles: string[];
  };
}




function Home() {

    const { active } = useSelector((state: RootState) => state.session);
    console.log(active)

  return (
    <>
      <h2>Bienvenido</h2>
      <nav className="basic-nav">
        
        {active ? (
          <Link className="basic-nav" to="/logout">
            Logout
          </Link>
        ) : (
           <>
          <Link className="basic-nav" to="/login">
            Login
          </Link>

          <Link className="basic-nav" to="/create">
            Create Account
          </Link>
           </>

        )}

      </nav>
      <Outlet />
    </>
  );
}

export default Home;
