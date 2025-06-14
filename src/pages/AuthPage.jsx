import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [errors, setErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let emailError = '';
        let passwordError = '';

        if (!email) {
            emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError = 'Email address is invalid';
        }
        if (!password) {
            passwordError = 'Password is required';
        } else if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
        }
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            let response;
            if (isLogin) {
                // Replace with your login API endpoint
                response = await axios.post('/api/login', { email, password });
                const { token } = response.data;
                if (typeof setToken === 'function') setToken(token);
                setIsLoggedIn(true);
                setIsLoading(false);
                navigate('/dashboard'); // Redirect after login
            } else {
                // Replace with your registration API endpoint
                response = await axios.post('/api/register', { email, password, role });
                alert('Registration successful. Please log in.');
                setIsLogin(true);
                setIsLoading(false);
            }
        } catch (error) {
            setErrors({ api: error.response?.data?.message || 'Authentication failed. Please try again.' });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
            </div>
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Slogan */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">
                        Raise Your Voice With
                    </h1>
                </div>

                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 backdrop-blur-sm bg-opacity-85 rounded-2xl p-6 mb-8 text-center shadow-2xl border border-green-400/20">
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">
                        TRASH-TRACKER
                    </h2>
                    <p className="text-green-50 text-sm font-medium">
                        (A citizen powered waste reporting system)
                    </p>
                </div>

                {/* Auth Container */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-3xl">
                    {!isLoggedIn ? (
                        <>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="text-center mb-8">
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                                        {isLogin ? 'Welcome Back' : 'Join Us'}
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"></div>
                                </div>
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 pl-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your email"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 pl-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your password"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Role Selection (Registration only) */}
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 pl-1">
                                            Select Role
                                        </label>
                                        <select 
                                            value={role} 
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-800"
                                        >
                                            <option value="user">User</option>
                                            <option value="committee">Committee</option>
                                        </select>
                                    </div>
                                )}

                                {/* API Error */}
                                {errors.api && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                        <p className="text-red-600 text-sm font-medium text-center">
                                            {errors.api}
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {isLogin ? 'Sign In' : 'Create Account'}
                                                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            {/* Toggle Button */}
                            <div className="mt-8 text-center">
                                <button 
                                    type="button"
                                    onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                                    className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                                >
                                    {isLogin 
                                        ? "Don't have an account? Create one here" 
                                        : "Already have an account? Sign in here"
                                    }
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h3>
                            <p className="text-gray-600">You have successfully logged in.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    );
};

export default AuthPage;
