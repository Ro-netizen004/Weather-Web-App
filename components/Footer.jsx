import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer id={theme} className="footer">
      <p>Contact me at <a href="mailto:rg21@usf.edu">rg21@usf.edu</a></p>
      <p>&copy; {new Date().getFullYear()} Rodela Ghosh</p>
    </footer>
  );
}