export default function PageSection({
  styles,
  param,
  onChange = undefined,
  children,
}) {
  return (
    <button
      className={`p-3 w-full text-left text-body-l rounded-r-full focus:bg-main-purple hover:bg-main-purple hover:text-white focus:text-white mr-3 ${styles}`}
      onClick={() => {
        console.log("clicked");
        onChange(param);
      }}
    >
      {children}
    </button>
  );
}
