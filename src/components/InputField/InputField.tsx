// import React, { useId, useState, useEffect } from "react";
// import { FiX, FiAlertCircle } from "react-icons/fi";
// import "./InputField.css";

// export interface InputFieldProps {
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   label?: string;
//   placeholder?: string;
//   helperText?: string;
//   errorMessage?: string;
//   disabled?: boolean;
//   invalid?: boolean;
//   variant?: "filled" | "outlined" | "ghost";
//   size?: "sm" | "md" | "lg";
// }

// const sizeClasses: Record<NonNullable<InputFieldProps["size"]>, string> = {
//   sm: "if-sm",
//   md: "if-md",
//   lg: "if-lg",
// };

// const variantClasses: Record<NonNullable<InputFieldProps["variant"]>, string> = {
//   filled: "if-filled",
//   outlined: "if-outlined",
//   ghost: "if-ghost",
// };

// export const InputField: React.FC<InputFieldProps> = ({
//   value,
//   onChange,
//   label,
//   placeholder,
//   helperText,
//   errorMessage,
//   disabled = false,
//   invalid = false,
//   variant = "outlined",
//   size = "md",
// }) => {
//   const uid = useId();
//   const id = label ? `${uid}-${label.replace(/\s+/g, "-").toLowerCase()}` : `${uid}-input`;
//   const descId = `${id}-desc`;

//   // internal state for uncontrolled mode
//   const [internalValue, setInternalValue] = useState<string>(value ?? "");
//   // keep internal in-sync when a controlled value prop changes
//   useEffect(() => {
//     if (value !== undefined) setInternalValue(value);
//   }, [value]);

//   const [focused, setFocused] = useState(false);

//   // decide whether controlled or uncontrolled: if value prop is provided, treat as controlled
//   const isControlled = value !== undefined;
//   const inputValue = isControlled ? (value as string) : internalValue;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!isControlled) setInternalValue(e.target.value);
//     onChange?.(e);
//   };

//   const handleClear = () => {
//     if (disabled) return;
//     if (isControlled) {
//       // synthesize change to notify parent a cleared value is desired
//       const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
//       onChange?.(ev);
//     } else {
//       setInternalValue("");
//       // also call onChange if provided (some stories pass onChange only)
//       const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
//       onChange?.(ev);
//     }
//   };

//   return (
//     <div
//       className={[
//         "if-wrapper",
//         sizeClasses[size],
//         variantClasses[variant],
//         disabled ? "if-disabled" : "",
//         invalid ? "if-invalid" : "",
//       ].join(" ")}
//     >
//       <div className="if-field">
//         <input
//           id={id}
//           className="if-input"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder={placeholder ?? (label ? " " : "")}
//           disabled={disabled}
//           aria-invalid={invalid ? "true" : undefined}
//           aria-describedby={descId}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           autoComplete="off"
//         />

//         {label && (
//           <label htmlFor={id} className={`if-label ${focused || (inputValue && inputValue.length > 0) ? "if-label-floating" : ""}`}>
//             {label}
//           </label>
//         )}

//         <span
//           className={[
//             "if-underline",
//             focused ? "if-underline-active" : "",
//             invalid ? "if-underline-error" : "",
//           ].join(" ")}
//         />

//         {!disabled && inputValue && (
//           <button
//             type="button"
//             className="if-clear"
//             onClick={handleClear}
//             aria-label="Clear input"
//             title="Clear"
//           >
//             <FiX />
//           </button>
//         )}

//         {invalid && (
//           <span className="if-error-icon" aria-hidden>
//             <FiAlertCircle />
//           </span>
//         )}
//       </div>

//       <div id={descId} className="if-meta" role="status" aria-live="polite">
//         {invalid && errorMessage ? (
//           <span className="if-error-text">{errorMessage}</span>
//         ) : helperText ? (
//           <span className="if-helper-text">{helperText}</span>
//         ) : (
//           <span className="if-helper-placeholder" aria-hidden />
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useId, useState, useEffect } from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";
import "./InputField.css";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeCls = { sm: "if-sm", md: "if-md", lg: "if-lg" };
const variantCls = { filled: "if-filled", outlined: "if-outlined", ghost: "if-ghost" };

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
}) => {
  const uid = useId();
  const id = `${uid}-input`;
  const [text, setText] = useState(value ?? "");
  const [focus, setFocus] = useState(false);
  const controlled = value !== undefined;
  const val = controlled ? value! : text;

  useEffect(() => { if (controlled) setText(value!); }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setText(e.target.value);
    onChange?.(e);
  };

  const clear = () => {
    if (disabled) return;
    const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
    if (!controlled) setText("");
    onChange?.(ev);
  };

  return (
    <div className={`if-wrapper ${sizeCls[size]} ${variantCls[variant]} ${disabled ? "if-disabled" : ""} ${invalid ? "if-invalid" : ""}`}>
      <div className="if-field">
        <input
          id={id}
          className="if-input"
          value={val}
          onChange={handleChange}
          placeholder={placeholder ?? (label ? " " : "")}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoComplete="off"
        />

        {label && (
          <label htmlFor={id} className={`if-label ${focus || val ? "if-label-floating" : ""}`}>
            {label}
          </label>
        )}

        <span className={`if-underline ${focus ? "if-underline-active" : ""} ${invalid ? "if-underline-error" : ""}`} />

        {!disabled && val && (
          <button type="button" className="if-clear" onClick={clear} title="Clear">
            <FiX />
          </button>
        )}

        {invalid && <span className="if-error-icon"><FiAlertCircle /></span>}
      </div>

      <div className="if-meta">
        {invalid && errorMessage
          ? <span className="if-error-text">{errorMessage}</span>
          : helperText && <span className="if-helper-text">{helperText}</span>}
      </div>
    </div>
  );
};
