'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"



export default function Header() {
    const [notDarkMode, setNotDarkMode] = useState(() => {
        const selectedTheme = localStorage.getItem("theme");
        console.log(selectedTheme)
        if (selectedTheme === "dark") {
            console.log(true)
            return true;
        } else if (selectedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            console.log(true)
            return true;
        }
        console.log(false)
        return false;   
    });

    useEffect(() => {
        let selectedTheme = localStorage.getItem("theme");
        console.log(selectedTheme);
        if (selectedTheme === "dark"){
            document.body.classList.add("dark")
            setNotDarkMode(true)
        } else {
            setNotDarkMode(false)
        }
        if (selectedTheme === "dark") {
            document.body.classList.add("dark")
            setNotDarkMode(true)
        } else if (selectedTheme === null) {
            if (window.matchMedia("(prefers-color-scheme:dark)")){
                selectedTheme = "dark"
                document.body.classList.add("dark")
                setNotDarkMode(true)
            } else {
                selectedTheme=""
            }
        }
    }, []);
    
    const onThemeChange = () => {
        const newDarkMode = !notDarkMode;
        setNotDarkMode(newDarkMode);
        
        if (!notDarkMode) {
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark")
        } else {
            localStorage.setItem("theme", "caca");
            document.body.classList.remove("dark")
        }
    };

    return(
        <div className="flex p-4 pl-8 bg-gradient-to-l from-primary to-primary-dark min-h-16 items-center shadow z-40 text-primary-foreground">
            <h1 className="text-xl font-bold ">MIMIR</h1>
            <span className="flex-1"></span>
            <span className="flex space-x-1">
              <SunIcon/>
              <Switch id="theme-mode"
                checked={notDarkMode}
                onCheckedChange={onThemeChange}/>
              <MoonIcon/>
            </span>
          </div>
    );
}