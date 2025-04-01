"use-client";
export default function Button({
  className = undefined,
  textColor = "text-white",
  bgColor = "bg-main-purple",
  onClickFun,
  children,
}) {
  return (
    <button
      className={`${textColor} ${bgColor} rounded-full   m-3 p-1 ${className}`}
      onClick={onClickFun}
    >
      {children}
    </button>
  );
}
