'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { BellIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { SidebarTrigger } from "@/components/ui/sidebar"
import AlertButton from "./alert-button"
import mimirLogo from "@/images/mimir_logo.svg";
import Image from 'next/image';
import Link from "next/link"


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
        <header className="sticky top-0 flex p-4 pl-8 min-h-16 
        bg-gradient-to-r from-header-background to-header-dark text-primary-foreground shadow
        items-center z-40 ">
            <div className="relative top-8 -left-12">
                <SidebarTrigger className="bg-white rounded border w-7 h-7 text-black"/>
            </div>
            <Link href="/">
                <div className="relative p-1 mr-2 rounded-full bg-white ">
                        <div className="relative p-4 ">
                            <Image priority fill={true} src="/images/mimir_logo.svg" alt="mimir logo"></Image>
                        </div>
                </div>
            </Link>
            <h1 className="text-xl font-bold pl-2">
                <Link href="/">
                    MIMIR
                </Link>
            </h1>
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
          </header>
    );
}