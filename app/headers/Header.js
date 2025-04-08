import { DisplayNavContext } from "../Home/AllContext";
import { useContext } from "react";

export default function Header({ children }) {
  const [displayNav, setDisplayNav] = useContext(DisplayNavContext);
  const general = "flex gap-5 w-full h-16 ";
  return (
    <div className={displayNav == true ? general + " ml-40" : general}>
      {children}
    </div>
  );
}
