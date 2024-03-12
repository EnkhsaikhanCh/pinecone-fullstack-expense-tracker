import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

const Context = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div>{theme}</div>
      <button onClick={toggleTheme} className="btn btn-neutral">
        toggle theme
      </button>
    </div>
  );
};

export default Context;
