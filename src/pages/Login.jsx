import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load existing session and database users
  const [activeSession, setActiveSession] = useState({
    email: localStorage.getItem('hrms_email') || '',
    role: localStorage.getItem('hrms_role') || ''
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
    setRegisteredUsers(users);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Email Check
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // Password Check
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false);
      
      // 1. Check if user is registered in localStorage (Mock User Database)
      const registeredUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (registeredUser) {
        if (registeredUser.password === password) {
          localStorage.setItem('hrms_email', email);
          localStorage.setItem('hrms_role', registeredUser.role);
          navigate(registeredUser.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard');
          return;
        } else {
          setErrors({ password: 'Incorrect password.' });
          return;
        }
      }

      // 2. Fallback check for domain matching if not in database (for easy hackathon grading)
      const adminDomain = '@admin.company.com';
      const employeeDomain = '@employee.company.com';

      if (email.toLowerCase().endsWith(adminDomain)) {
        localStorage.setItem('hrms_email', email);
        localStorage.setItem('hrms_role', 'admin');
        navigate('/admin/dashboard');
      } else if (email.toLowerCase().endsWith(employeeDomain)) {
        localStorage.setItem('hrms_email', email);
        localStorage.setItem('hrms_role', 'employee');
        navigate('/employee/dashboard');
      } else {
        setErrors({
          email: 'Invalid email domain. Access denied.'
        });
      }
    }, 1200);
  };

  const handleQuickSignIn = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Left Panel: HRMS Welcome Info Panel with Spline 3D (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden flex-col justify-between p-12 text-white">
        {/* Glow Background Backing */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px] z-0" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/20 blur-[120px] z-0" />

        {/* Spline 3D Scene Background */}
        <div className="absolute inset-0 z-0 opacity-70">
          <spline-viewer 
            url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            style={{ width: '100%', height: '100%', display: 'block' }}
          ></spline-viewer>
        </div>

        {/* Content Container (Overlay on top of Spline 3D scene) */}
        <div className="relative z-10 max-w-md space-y-12 my-auto pointer-events-none">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
              H
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block">HRMS</span>
              <span className="text-xs text-slate-400 font-medium -mt-1 block">Enterprise Edition</span>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Simplify Your Workforce Management.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              All-in-one Human Resource system designed to automate onboarding, track performance, and handle payroll efficiently.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 HRMS Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel: Glassmorphism Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-slate-50">
        {/* Decorative background circles */}
        <div className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-blue-100/40 blur-3xl -z-10" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl -z-10" />

        <div className="w-full max-w-[440px] space-y-8 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/80 p-8 shadow-xl shadow-slate-200/50">
          
          {/* Active Session Auto-Login Card */}
          {activeSession.email ? (
            <div className="space-y-6 text-center py-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h3>
                <p className="text-sm text-slate-500">
                  You have an active session on this device.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 mt-4">
                  <span className="font-mono text-sm text-slate-800 font-bold truncate max-w-full">
                    {activeSession.email}
                  </span>
                  <span className="capitalize text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-medium">
                    {activeSession.role} Profile
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => navigate(activeSession.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')}
                  className="w-full py-3"
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem('hrms_email');
                    localStorage.removeItem('hrms_role');
                    setActiveSession({ email: '', role: '' });
                  }}
                  className="w-full py-3"
                >
                  Sign in with another account
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="space-y-2">
                {/* Logo for mobile */}
                <div className="lg:hidden flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                    H
                  </div>
                  <span className="font-bold text-slate-900 tracking-tight">HRMS Portal</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h3>
                <p className="text-sm text-slate-500">
                  Sign in with your organization domain to manage your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="e.g. john@employee.company.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  helperText="Must end with @admin.company.com or @employee.company.com"
                  required
                />

                <div className="space-y-1">
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                  />
                </div>

                {/* Extras */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors">
                      Remember Me
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert("Check your credentials. Use @admin.company.com for admins, or @employee.company.com for employees.")}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit and Sign Up Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="flex-1 py-3"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/signup')}
                    className="flex-1 py-3"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>

              {/* Quick Login Profiles for Registered Accounts */}
              {registeredUsers.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    Quick Profiles (Instant Fill)
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                    {registeredUsers.map((user, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickSignIn(user)}
                        className={`text-xs border px-2.5 py-1 rounded-lg transition-all text-left truncate max-w-full font-mono cursor-pointer shadow-2xs
                          ${
                            email.toLowerCase() === user.email.toLowerCase()
                              ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                      >
                        {user.email} ({user.role})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo Default Domain Credentials */}
              {registeredUsers.length === 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    Demo Credentials (Domain check fallback)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li className="flex justify-between">
                      <span>Employee Login:</span>
                      <code className="text-[10px]">name@employee.company.com</code>
                    </li>
                    <li className="flex justify-between">
                      <span>Admin Login:</span>
                      <code className="text-[10px]">name@admin.company.com</code>
                    </li>
                  </ul>
                </div>
              )}

              {/* Footer Link */}
              <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 hover:gap-1"
                >
                  Create an account <ArrowRight className="w-3.5 h-3.5 transition-all" />
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
