import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { LogOut, CheckSquare, LogIn } from "lucide-react";
import { logout } from "../Features/todos/todoSlice";
import { toast } from "react-toastify";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.todos.currentUser); // 👈 check user

  const handleLogout = async () => {
  try {
    await signOut(auth);
    dispatch(logout());
    navigate("/sign-in");
    toast.success("Logged out successfully! 👋");
  } catch (error) {
    
    toast.error(`Logout failed: ${error.message}`);
  }
};

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-wide">
            TaskVibe
          </span>
        </Link>

        <ul className="flex items-center space-x-4">
          {user ? (
           
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </li>
          ) : (
         
            <li>
              <Link
                to="/sign-in"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
