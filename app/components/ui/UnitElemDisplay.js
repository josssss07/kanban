export default function UnitElemDisplay({ styles, children }) {
  return (
    <div className={`border-b-2 border-b-[var(--color-lineborder)] ${styles}`}>
      {children}
    </div>
  );
}
