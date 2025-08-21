import clsx from "clsx";
import { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errormessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: "text" | "password";
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errormessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  loading = false,
  clearable = false,
  className,
}) => {
  const [showpassword, setshowpassword] = useState(false);

  const inputsize = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const inputvariant = {
    filled: "bg-gray-100 dark:bg-gray-800 border-none",
    outlined: "border border-gray-300 dark:border-gray-600",
    ghost: "bg-transparent border-b border-gray-300 dark:border-gray-600",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        
        <input
          type={type === "password" && showpassword ? "text" : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(
            "rounded-md w-full focus:outline-none transition-all",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            disabled &&
              "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-70",
            invalid && "border-red-500 focus:ring-red-500 focus:border-red-500",
            inputsize[size],
            inputvariant[variant],
            className
          )}
        />

       
        {clearable && value && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            ✕
          </button>
        )}

      
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setshowpassword((prev) => !prev)}
          >
            {showpassword ? "hid" : "sh"}
          </button>
        )}

        
        {loading && (
          <div className="absolute right-2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4" />
        )}
      </div>

    
      {invalid && errormessage ? (
        <span className="text-xs text-red-500">{errormessage}</span>
      ) : helperText ? (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
