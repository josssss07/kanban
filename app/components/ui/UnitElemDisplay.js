export default function UnitElemDisplay({ styles, children }) {
  return (
    <div className={` ${styles}`}>
      {children}
    </div>
  );
}
