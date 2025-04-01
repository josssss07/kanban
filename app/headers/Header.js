import { DisplayNavContext } from "../helpers/DisplayNavContext";
import { useContext } from "react";


export default function Header({ children }) {
  
const [displayNav, setDisplayNav] = useContext(DisplayNavContext);
const general = "flex gap-5 w-full h-16";
  return (
    <div
    className = {(displayNav == true? general+" ml-36":general)}
    >
      {children}
    </div>
  );
}
