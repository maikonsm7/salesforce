import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Message } from "./Message";

export const Nav = () => {
  const { logout } = useContext(AuthContext)

  return (
    <nav>
      <Link onClick={logout}>Sair</Link>
      <Message />
    </nav>
  )
}