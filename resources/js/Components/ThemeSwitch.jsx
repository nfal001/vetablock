import React from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import themeHook from '../Hook/themeHook'

const ThemeSwitch = () => {
    const [colorTheme,setTheme] = themeHook();
    console.log(colorTheme);
    const [darkSide, setDarkSide] = React.useState(colorTheme === 'dark'?true:false
    );  
    const toggleDarkMode = (checked) =>{
        setTheme(colorTheme);
        setDarkSide(checked);
    }

    return (
        <>
        <DarkModeSwitch sunColor='rgb(147, 51, 234)' checked={darkSide} onChange={toggleDarkMode} className="w-5 h-5 rounded-md focus:outline-none focus:shadow-outline-purple" />
        </>
        )
}

export default ThemeSwitch