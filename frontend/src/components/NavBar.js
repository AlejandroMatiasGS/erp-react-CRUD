"use client";

import miAxios from "@/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function NavBar({isAdmin}) {
    const router = useRouter();

    const goToProducts = () => router.push('/products')

    const goToUsers = () => router.push('/users')

    const cerrarSesion = () => {
        miAxios.get('/logout').then((res)=> {
            router.push('/')    
        }).catch((err) => {
            alert("Error al cerrar sesión")
        })
    }

    return (
        <>
            <div className="navbar">
                <div className="p-3 border container-fluid">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvasWithBothOptionsLabel" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" id="offcanvas" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menú</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body d-flex flex-column align-items-center">
                            {isAdmin ? (<>
                                <div className="row w-75 pt-3">
                                    <button className="btn btn-secondary w-100" type="button" onClick={goToUsers}>Usuarios</button>
                                </div>
                                <div className="row w-75 pt-3">
                                    <button className="btn btn-secondary w-100" type="button" onClick={goToProducts}>Productos</button>
                                </div>
                            </>) : (<>
                                <div className="row w-75 pt-3">
                                    <button className="btn btn-secondary w-100" type="button" onClick={goToProducts}>Productos</button>
                                </div>
                            </>)}

                            <div className="row w-75 pt-5">
                                <button className="btn btn-secondary w-100" type="button" onClick={cerrarSesion}>Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
