"use client";

import { useEffect } from "react";

export default function InstallBootstrap() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.js")
    }, [])
    
    return(<></>);
}