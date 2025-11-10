
import Todos from "./pages/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Componets/ProtectedRoute";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./Componets/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>      
        <Route path="/" element={<ProtectedRoute Component={Todos} />}></Route>
        <Route path="/edit-todo/:id" element={<ProtectedRoute Component={Todos} />}></Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
