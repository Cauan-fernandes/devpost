import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Login"
import Posts from "../pages/Posts"
import Register from "../Register"
export default function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}