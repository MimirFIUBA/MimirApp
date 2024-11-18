'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { BellIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { SidebarTrigger } from "@/components/ui/sidebar"
import AlertButton from "./alert-button"


export default function Header() {
    const [notDarkMode, setNotDarkMode] = useState(() => {
        if (typeof localStorage !== 'undefined') {
            const selectedTheme = localStorage.getItem("theme");
            if (selectedTheme === "dark") {
                return true;
            } else if (selectedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return true;
            }
        }
        return false;
    });

    useEffect(() => {
        let selectedTheme = localStorage.getItem("theme");
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
            localStorage.setItem("theme", " ");
            document.body.classList.remove("dark")
        }
    };

    return(
        <div className="flex p-4 pl-8 min-h-16 
        bg-gradient-to-l from-primary to-primary-dark text-primary-foreground shadow
        items-center z-40 ">
            <SidebarTrigger/>
            <h1 className="text-xl font-bold pl-2">MIMIR</h1>
            <span className="flex-1"></span>
            <span>
                <AlertButton count={50}></AlertButton>
            </span>
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