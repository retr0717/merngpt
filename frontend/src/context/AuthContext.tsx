import { createContext,ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, userLogout, userSignUp } from "../helpers/apiCalls.js";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email : string, password : string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth| null>(null);

export const AuthProvider = ({children} : {children : ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        //check for cookie to skip login.
        const checkStatus = async () => {
            const data = await checkAuthStatus();
            if(data)
            {
                setUser({email: data.email, name: data.name});
                setIsLoggedIn(true);
            }
        }

        checkStatus();
    },[]);

    const login = async(email:string, password: string) => {
        const data = await loginUser(email,password);
        if(data)
        {
            setUser({email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
    }

    const signup = async(name : string, email: string, password : string) => {
        const data = await userSignUp(name, email, password);
        if(data)
        {
            setUser({name:data.name, email: data.email});
            setIsLoggedIn(true);
        }
    }

    const logout = async () => {
        await userLogout();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);