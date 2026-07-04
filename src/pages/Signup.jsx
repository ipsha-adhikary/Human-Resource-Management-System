import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw, BadgeInfo, Check } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

// Password suggestions generator helper
const generateMockPasswords = () => {
  const prefixes = ['HRMS', 'Secure', 'Employee', 'Admin', 'Staff', 'Portal', 'Shield', 'Manager', 'Work', 'System'];
  const symbols = ['@', '#', '$', '!', '&', '*'];
  
  const suggestions = [];
  for (let i = 0; i < 3; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const number = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const suffix = symbols[Math.floor(Math.random() * symbols.length)];
    suggestions.push(`${prefix}${symbol}${number}${suffix}`);
  }
  return suggestions;
};

// Auto-generated mock User IDs based on role
const generateMockUserId = (role) => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return role === 'admin' ? `ADM-${num}` : `EMP-${num}`;
};

const Signup = () => {
  const navigate = useNavigate();

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee'); // Default role: employee
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Auxiliary States
  const [userId, setUserId] = useState('');
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState({ label: 'Weak', score: 1, color: 'bg-red-500', text: 'text-red-500' });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionMessage, setSuggestionMessage] = useState('');

  // Generate User ID and initial password suggestions on role change
  useEffect(() => {
    setUserId(generateMockUserId(role));
  }, [role]);

  useEffect(() => {
    const initialSuggestions = generateMockPasswords();
    setPasswordSuggestions(initialSuggestions);
  }, []);

  // Update password strength live
  useEffect(() => {
    evaluatePasswordStrength(password);
  }, [password]);

  const handleRegeneratePasswords = () => {
    const newSuggestions = generateMockPasswords();
    setPasswordSuggestions(newSuggestions);
    setSuggestionMessage('');
  };

  const handleSuggestAndAutofill = () => {
    const newSuggestions = generateMockPasswords();
    setPasswordSuggestions(newSuggestions);
    const selectedSuggestion = newSuggestions[0];
    setPassword(selectedSuggestion);
    setConfirmPassword(selectedSuggestion);
    setSuggestionMessage('Strong password auto-suggested and applied!');
    setTimeout(() => setSuggestionMessage(''), 3000);
  };

  const evaluatePasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength({ label: 'Weak', score: 0, color: 'bg-slate-200', text: 'text-slate-400' });
      return;
    }

    let score = 0;
    
    // Length check
    if (pass.length >= 8) score += 2;
    else if (pass.length >= 5) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) {
      setPasswordStrength({ label: 'Weak', score: 1, color: 'bg-red-500', text: 'text-red-500' });
    } else if (score <= 4) {
      setPasswordStrength({ label: 'Medium', score: 2, color: 'bg-amber-500', text: 'text-amber-500' });
    } else {
      setPasswordStrength({ label: 'Strong', score: 3, color: 'bg-emerald-500', text: 'text-emerald-500' });
    }
  };

  const selectSuggestion = (suggestion) => {
    setPassword(suggestion);
    setConfirmPassword(suggestion); // Sync automatically for convenience
    setSuggestionMessage('Suggested password applied!');
    setTimeout(() => setSuggestionMessage(''), 2000);
  };

  const validateForm = () => {
    const newErrors = {};

    // Name Check
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    // Email Check
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      } else {
        // Domain rules
        const employeeDomain = '@employee.company.com';
        const adminDomain = '@admin.company.com';

        if (role === 'employee' && !email.toLowerCase().endsWith(employeeDomain)) {
          newErrors.email = `Employee email must end with ${employeeDomain}`;
        } else if (role === 'admin' && !email.toLowerCase().endsWith(adminDomain)) {
          newErrors.email = `Admin email must end with ${adminDomain}`;
        }
      }
    }

    // Password Checks
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate database signup and save to localStorage
    setTimeout(() => {
      setIsLoading(true);

      const newUser = {
        fullName,
        email,
        role,
        userId,
        password
      };

      const existingUsers = JSON.parse(localStorage.getItem('hrms_users') || '[]');
      const userIndex = existingUsers.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userIndex > -1) {
        existingUsers[userIndex] = newUser;
      } else {
        existingUsers.push(newUser);
      }

      localStorage.setItem('hrms_users', JSON.stringify(existingUsers));
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Left Panel: HRMS Info Panel with Spline 3D (Hidden on mobile) */}
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
            <Link to="/login" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
                H
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight block">HRMS</span>
                <span className="text-xs text-slate-400 font-medium -mt-1 block">Enterprise Edition</span>
              </div>
            </Link>
          </div>

          {/* Welcome Header */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Set Up Your HR Ecosystem.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Create an account within your domain to access centralized tools, payroll management, shifts, and team collaboration.
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

      {/* Right Panel: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-slate-50">
        {/* Decorative background gradients */}
        <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-blue-100/40 blur-3xl -z-10" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl -z-10" />

        <div className="w-full max-w-[480px] space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/80 p-8 shadow-xl shadow-slate-200/50">
          
          {/* Header */}
          <div className="space-y-2 relative">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-2 focus:outline-none">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h3>
            <p className="text-sm text-slate-500">
              Get started by filling out the details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            
            {/* Full Name */}
            <Input
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="e.g. John Doe"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            {/* Role Selection Cards */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase select-none">
                Select Your Role
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Card */}
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-28 relative focus:outline-none hover:shadow-md
                    ${
                      role === 'employee'
                        ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className={`p-2 rounded-lg ${role === 'employee' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      <User className="w-4 h-4" />
                    </div>
                    {role === 'employee' && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Employee</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Staff workspace portal</p>
                  </div>
                </button>

                {/* Admin Card */}
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-28 relative focus:outline-none hover:shadow-md
                    ${
                      role === 'admin'
                        ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className={`p-2 rounded-lg ${role === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {role === 'admin' && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Admin</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Control & settings hub</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Auto Generated User ID Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs select-none">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <BadgeInfo className="w-4 h-4 text-slate-400" />
                Generated User ID:
              </span>
              <span className="font-mono font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-xs">
                {userId}
              </span>
            </div>

            {/* Email Address */}
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder={role === 'employee' ? 'name@employee.company.com' : 'name@admin.company.com'}
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={`Only allows domain: @${role}.company.com`}
              required
            />

            {/* Password */}
            <div className="space-y-2">
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Create password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <span>Strength</span>
                    <span className={passwordStrength.text}>{passwordStrength.label}</span>
                  </div>
                  
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}

              {/* Password Suggestions */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Password Helper
                  </span>
                  <div className="flex gap-2.5">
                    <button
                      key="autofill-btn"
                      type="button"
                      onClick={handleSuggestAndAutofill}
                      className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 focus:outline-none"
                    >
                      Suggest & Autofill
                    </button>
                    <span className="text-slate-300 text-[10px]">|</span>
                    <button
                      key="regen-btn"
                      type="button"
                      onClick={handleRegeneratePasswords}
                      className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 focus:outline-none"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh Suggestions
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {passwordSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      className={`text-xs font-mono border px-2 py-1 rounded-lg transition-all cursor-pointer shadow-2xs
                        ${
                          password === suggestion
                            ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
                            : 'bg-white hover:bg-blue-50/30 hover:text-blue-600 border-slate-200 hover:border-blue-200 text-slate-600'
                        }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                {suggestionMessage && (
                  <p className="text-[10px] font-medium text-emerald-600 mt-1 select-none animate-pulse">
                    {suggestionMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />

            {/* Submit / Sign Up Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full py-3"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-6 text-center transform transition-all scale-100">
            {/* Icon */}
            <div className="mx-auto w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-950">Account Created Successfully</h4>
              <p className="text-slate-500 text-sm">
                Your credentials have been securely provisioned in the HRMS directory. You can now sign in to access your profile.
              </p>
            </div>

            {/* Details Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Name:</span>
                <span className="font-semibold text-slate-900">{fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">User ID:</span>
                <span className="font-mono font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">{userId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Email:</span>
                <span className="font-mono text-slate-800">{email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Role:</span>
                <span className="capitalize font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                  {role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  {role}
                </span>
              </div>
            </div>

            {/* Button */}
            <Button
              variant="primary"
              className="w-full py-3"
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/login');
              }}
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
