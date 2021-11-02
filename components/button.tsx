export default function Button({ onClick, children, className, type, disabled }:any) {
    return (
      <button
        className={`border rounded-full text-sm text-centre py-2 px-4 my-4 ${className}`}
        type={type}
        onClick={onClick}
        disabled = {disabled}
      >
        {children}
      </button>
    );
  }
  