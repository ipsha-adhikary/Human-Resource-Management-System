import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable Input Component for HRMS Module
 * Features focus styling, icons, password show/hide, and error states
 */
const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon: Icon,
  className = '',
  value,
  onChange,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-700 tracking-wide uppercase select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {required && <span className="text-red-500 text-sm leading-none">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none transition-colors duration-200">
            <Icon className="w-[18px] h-[18px]" />
          </div>
        )}
        
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 
            ${Icon ? 'pl-11' : 'px-3.5'} 
            ${isPassword ? 'pr-11' : 'pr-3.5'}
            ${
              error 
                ? 'border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-red-200' 
                : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100 bg-white'
            }`}
          {...props}
        />
        
        {isPassword && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none select-none transition-colors duration-150"
            tabIndex="-1"
          >
            {showPassword ? (
              <EyeOff className="w-[18px] h-[18px]" />
            ) : (
              <Eye className="w-[18px] h-[18px]" />
            )}
          </button>
        )}
      </div>
      
      {error ? (
        <span className="text-xs font-medium text-red-500 mt-0.5 leading-none transition-opacity duration-150">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 mt-0.5 leading-none">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
