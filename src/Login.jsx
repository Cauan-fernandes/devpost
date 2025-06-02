import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebaseConnection";
import { Link } from "react-router-dom";
import './login.css'
export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function hasLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('Login Efetuado com sucesso!', {
        autoClose: 900,
        pauseOnHover: false
      })
      navigate('/posts')

    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao fazer login', {
        autoClose: 900,
        pauseOnHover: false
      })
    }
  }
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Bem-Vindo ao DevPosts</h1>
      </div>
      <form onSubmit={hasLogin} className="login-form">
        <label className="login-label">Email</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="login-button"
          type="submit"
          value="Entrar"
        />

        <Link to={'/register'} className="login-link">Cadastrar-se</Link>
      </form>
    </div>
  )
}