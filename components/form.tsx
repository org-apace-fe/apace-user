export default function Form({ children, className, onSubmit, style }: any) {
  return (
    <form
      className={`flex flex-col mx-auto mt-8 w-full p-4   ${className}`}
      onSubmit={onSubmit}
      style={style}
    >
      {children}
    </form>
  );
}
