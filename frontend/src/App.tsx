import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import { Login } from "./pages/Login"
import SignUp from "./pages/SignUp"
import Chat from "./pages/Chat"
import { NotFound } from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"
import './App.css';

function App() {

  const auth = useAuth();
  console.log(useAuth()?.isLoggedIn);
  
  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {
          auth?.isLoggedIn && auth.user && (
            <Route path="/chat" element={<Chat/>}/>
          )
        }
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
