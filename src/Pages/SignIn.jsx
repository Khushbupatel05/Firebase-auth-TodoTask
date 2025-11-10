import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser, signInWithGoogle } from "../newfeature/todos/todoSlice.js";
import { toast } from "react-toastify";

const SignIn = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.email.trim() === "" || input.password.trim() === "") {
            toast.error("Enter all details !");
            setInput({ email: "", password: "" });
            return;
        }

        try {
            await dispatch(signInUser({ email: input.email, password: input.password }));
            toast.success("Sign In successful!");
            setInput({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            toast.error("Invalid credentials. Please try again.");
            setInput({ email: "", password: "" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200 px-4 sm:px-6">
            <form  onSubmit={handleSubmit}  className="w-full max-w-md sm:max-w-lg bg-white/80 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#04265d] mb-6 sm:mb-8 tracking-tight">
                    Welcome Back ✨
                </h2>
                <p className="text-center text-gray-500 mb-8 text-sm">Sign in to manage your daily tasks</p>    

                <div className="mb-5 sm:mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm sm:text-base  font-semibold text-gray-700">
                        Email
                    </label>
                    <input type="email" onChange={handleChange} value={input.email} id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 sm:p-3 transition-all duration-200"
                        placeholder="Enter your email"/>
                </div>

                <div className="mb-5 sm:mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm sm:text-base  font-semibold text-gray-700">
                        Password
                    </label>
                    <input type="password" onChange={handleChange} value={input.password} id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 sm:p-3 transition-all duration-200"
                        placeholder="Enter your password"/>
                </div>

                <div className="mb-5 sm:mb-6">
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-indigo-600 hover:to-blue-700 text-white font-medium rounded-xl text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300">
                        Sign In
                    </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                    <span className="w-full border-t border-gray-300"></span>
                    <span className="absolute bg-white px-3 text-gray-500 text-sm">or</span>
                </div>

                <div className="mb-5 sm:mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(signInWithGoogle());
                            toast.success("Login with Google successfully...!");
                            setInput({ email: "", password: "" });
                            navigate("/");
                        }}
                        className="w-full text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 sm:gap-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 font-medium text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300"
                    >
                        <img
                            src='https://www.svgrepo.com/show/475656/google-color.svg'
                            alt='Google'
                            className='w-5 h-5'
                        />
                        Sign in with Google
                    </button>
                </div>

                <p className="text-md text-center text-gray-700 mt-5">
                    Create Your Account here{" "}
                    <Link
                        to={"/sign-up"}
                        className="font-medium text-blue-700 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
