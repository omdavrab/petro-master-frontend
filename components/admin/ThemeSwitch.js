import { useState, useEffect } from 'react';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [localTheme, setLocalTheme] = useState(currentTheme);

  useEffect(() => {
    setLocalTheme(currentTheme);
  }, [currentTheme]);

  return (
    <button
      onClick={() => {
        const newTheme = localTheme === 'light' ? 'dark' : 'light';
        setLocalTheme(newTheme);
        setTheme(newTheme);
      }}
    >
      {localTheme === 'light' ? (
        <BsMoonStarsFill className="text-slate-600 text-[14px]" />
      ) : (
        <BsFillSunFill className="text-yellow-500" />
      )}
    </button>
  );
}

export default ThemeSwitch;