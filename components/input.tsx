export default function Input({
  className,
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
  defaultValue,
  disabled,
  pattern,
}: any) {
  return (
    <input
      className={`border border-gray-600 text-white bg-transparent outline-none rounded-md h-10 px-4 text-base  ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      pattern={pattern}
    />
  );
}
