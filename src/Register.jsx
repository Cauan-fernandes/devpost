import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseConnection";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  async function handleNewUser(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success("Usuário cadastrado!", {
        autoClose: 900,
        pauseOnHover: false
      })
      navigate("/")
    }
    catch (error) {
      console.log(error)
      toast.error("Houve um erro ao cadastrar um novo usuário!", {
        autoClose: 900,
        pauseOnHover: false
      })
    }
  }
  return (
    <>
      <h1>Register Now</h1>
      <form onSubmit={handleNewUser}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Cadastrar" />
      </form>
    </>
  )
}