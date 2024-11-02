import { UseFormRegister, RegisterOptions, FieldError } from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: FieldError;
}

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  register,
  rules,
  error
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className="w-full h-[47px] px-4 border border-[#E8E9EB] rounded-lg focus:outline-none"
      />
      {error && (
        <p className="text-red-500 text-xs">{error.message}</p>
      )}
    </div>
  );
}; 