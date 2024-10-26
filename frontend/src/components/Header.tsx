import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth = useAuth();
  return (
   <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
    <Toolbar sx={{display: "flex"}}>
        <Logo/>
        <div>
            {
                auth?.isLoggedIn ?
                (
                    <>
                         <NavigationLink
                            bg="#57cac1"
                            to="/chat"
                            text="Go To Chat"
                            textColor="black"
                        />
                        <NavigationLink
                            bg="#320eb0"
                            textColor="white"
                            to="/"
                            text="logout"
                            onClick={auth.logout}
                        />
                    </>
                )
                :
                (
                    <>
                        <NavigationLink
                            bg="#57cac1"
                            to="/login"
                            text="Login"
                            textColor="black"
                            onClick={auth?.login}
                        />
                        <NavigationLink
                            bg="#320eb0"
                            textColor="white"
                            to="/signup"
                            text="Signup"
                            onClick={auth?.signup}
                        />
                    </>
                )
            }
        </div>
    </Toolbar>
   </AppBar>
  )
}

export default Header