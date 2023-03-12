import React from 'react'

export default function themeHook() {
    const [theme,setTheme] = React.useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    React.useEffect(()=>{
        const root = window.document.documentElement;
        root.classList = '';
        root.classList.add(colorTheme);
        localStorage.setItem('theme',theme);
    },[theme,colorTheme]);

    return [colorTheme, setTheme];
};