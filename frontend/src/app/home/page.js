"use client";

import miAxios from "@/axiosConfig";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState({})

    useEffect(() => {
        const  _user = Cookies.get('user');

         if (!_user) {
            miAxios.get('/logout')
            router.push('/')
            return
        }
        
        setUser(JSON.parse(_user.substring(2, _user.length)))
    }, [])

    return (
        <>
            <NavBar isAdmin={user.admin} />

            <div className="d-flex flex-column justify-content-center align-items-center pt-5 mt-5">
                <h2 className="mb-3">Bienvenid@</h2>

                <h1>{user.nombres + " " + user.apellidos}</h1>
            </div>
        </>
    );
}