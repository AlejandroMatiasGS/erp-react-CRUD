"use client";

import miAxios from "@/axiosConfig";
import NavBar from "@/components/NavBar";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Alert } from "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";

export default function Products() {
    const [data, setData] = useState([])
    const [selRow, setSelRow] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: ""
    })

    const searchProducts = (e) => {
        e.preventDefault();

        const { elements } = e.currentTarget
        const nombre = elements.namedItem('bNombre').value

        miAxios.post('/searchProducts', { nombre }).then((res) => {
            setData(res.data)
        }).catch(err => {
            //Message
        })

        document.getElementById('bNombre').value = ""
    }

    const createAlert = (type, message, modal) => {
        const row = document.getElementById('alert' + modal)

        const alert = document.createElement('div')
        alert.classList.add('alert', 'fade', 'text-center', 'show')
        alert.setAttribute('role', 'alert')

        if (row) {
            const strong = row.childNodes[0].childNodes[0]
            row.removeChild(row.childNodes[0])
            strong.innerHTML = message
            alert.appendChild(strong)
            alert.classList.add(type)
            row.appendChild(alert)
        } else {
            const contModalCreate = document.getElementById('con' + modal)
            const row = document.createElement('div')
            row.classList.add('row', 'mt-5')
            row.setAttribute('id', 'alert' + modal)

            const strong = document.createElement('strong')
            strong.innerHTML = message
            alert.classList.add(type)
            alert.appendChild(strong)
            row.appendChild(alert)
            contModalCreate.appendChild(row)
        }
    }

    const reDoModalCreate = (e) => {
        document.getElementsByName('cNombre')[0].value = ""
        document.getElementsByName('cDesc')[0].value = ""
        document.getElementsByName('cPrecio')[0].value = ""
        document.getElementsByName('cCant')[0].value = ""

        const conModalCreate = document.getElementById('conModalCreate')
        if (conModalCreate.childNodes.length > 1) conModalCreate.removeChild(conModalCreate.childNodes[1])
    }

    const createProduct = (e) => {
        e.preventDefault();

        const { elements } = e.currentTarget
        const nombre = elements.namedItem('cNombre').value
        const desc = elements.namedItem('cDesc').value
        const _precio = elements.namedItem('cPrecio').value
        const _cant = elements.namedItem('cCant').value

        if (nombre === "" || desc === "" || _precio === "" || _cant === "") {
            createAlert('alert-danger', 'Debe ingresar todos los datos', 'ModalCreate')
            return
        }

        const precio = Number(_precio);
        const cant = Number(_cant);

        if (isNaN(precio) || isNaN(cant)) {
            createAlert('alert-danger', 'Precio y Cantidad deben ser sólo números', 'ModalCreate')
            return
        }

        miAxios.post('/createProduct', { nombre, desc, precio, cant }).then((res) => {
            const data = res.data;
            createAlert('alert-success', data.message, 'ModalCreate')
        }).catch((err) => {
            createAlert('alert-danger', err.response.data.message, 'ModalCreate')
        })
    }

    const reDoModalEdit = (e) => {
        document.getElementsByName('nombre')[0].value = ""
        document.getElementsByName('descripcion')[0].value = ""
        document.getElementsByName('precio')[0].value = ""
        document.getElementsByName('cantidad')[0].value = ""

        const conModalCreate = document.getElementById('conModalEdit')
        if (conModalCreate.childNodes.length > 1) conModalCreate.removeChild(conModalCreate.childNodes[1])
    }

    const editProduct = (e) => {
        e.preventDefault();

        const { elements } = e.currentTarget
        const id = selRow._id
        const nombre = selRow.nombre
        const descripcion = selRow.descripcion
        const _precio = selRow.precio
        const _cant = selRow.cantidad

        if (nombre === "" || descripcion === "" || _precio === "" || _cant === "") {
            createAlert('alert-danger', 'Debe ingresar todos los datos', 'ModalEdit')
            return
        }

        const precio = Number(_precio);
        const cantidad = Number(_cant);

        if (isNaN(precio) || isNaN(cantidad)) {
            createAlert('alert-danger', 'Precio y Cantidad deben ser sólo números', 'ModalEdit')
            return
        }

        miAxios.post('/editProduct', { id, nombre, descripcion, precio, cantidad }).then((res) => {
            const data = res.data;
            createAlert('alert-success', data.message, 'ModalEdit')
        }).catch((err) => {
            createAlert('alert-danger', err.message, 'ModalEdit')
        })
    }

    const reDoModalDelete = (e) => {    
        const conModalCreate = document.getElementById('conModalDelete')
        if (conModalCreate.childNodes.length > 1) conModalCreate.removeChild(conModalCreate.childNodes[1])
    }

    const deleteProduct = (e) => {
        const id = selRow._id

        miAxios.post('/deleteProduct', { id }).then((res) => {
            createAlert('alert-success', res.data.message, 'ModalDelete')
        }).catch((err) => {
            createAlert('alert-danger', err.response.data.message, 'ModalDelete')
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelRow(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5 pt-5" style={{ width: 85 + "%" }}>
                <div className="row">
                    <form method="POST" onSubmit={searchProducts} className="d-flex justify-content-center">
                        <div className="col col-6 d-flex flex-row">
                            <span className="input-group-text pl-2">Buscar por nombre</span>
                            <input id="bNombre" name="bNombre" className="form-control me-2" type="search" placeholder="Product name" aria-label="Buscar" />
                            <button className="btn btn-outline-light" type="submit">Buscar</button>
                        </div>
                    </form>
                </div>

                <div className="row d-flex justify-content-center mt-5">
                    <div className="col col-6 text-center">
                        <h1>Lista de productos</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-end mt-5">
                        <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modalCreate"><i className="bi bi-plus-circle" style={{ width: 24 + "px" }}><span className="ps-2">Crear producto</span></i></button>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mt-2">
                    <div className="col col-12">
                        <table className="table table-bordered text-center align-middle">
                            <thead>
                                <tr>
                                    <th scope="col" className="col-3">Nombre</th>
                                    <th scope="col" className="col-6">Descripción</th>
                                    <th scope="col" className="col-1">Precio</th>
                                    <th scope="col" className="col-1">Cantidad</th>
                                    <th scope="col" className="col-1">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((row, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{row.nombre}</td>
                                            <td>{row.descripcion}</td>
                                            <td>{row.precio}</td>
                                            <td>{row.cantidad}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={(e) => { setSelRow(row); }}><i className="bi bi-pencil-square" style={{ fontSize: 24 + "px" }}></i></button>
                                                    <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={(e) => { setSelRow(row); }}><i className="bi bi-trash" style={{ fontSize: 24 + "px" }}></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg" id="modalEdit">
                <div className="modal-dialog modal-dialog-centered">
                    <div id="conModalEdit" className="container">
                        <div className="row">
                            <div className="modal-content">
                                <form method="POST" onSubmit={editProduct}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Editar producto</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reDoModalEdit}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Nombre</span>
                                                    <input name="nombre" type="text" className="form-control" value={selRow.nombre} onChange={handleChange} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Descripción</span>
                                                    <textarea name="descripcion" type="text" className="form-control" value={selRow.descripcion} onChange={handleChange} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Precio</span>
                                                    <input name="precio" type="text" className="form-control" value={selRow.precio} onChange={handleChange} />
                                                </div>

                                                <div className="input-group">
                                                    <span className="input-group-text">Cantidad</span>
                                                    <input name="cantidad" type="text" className="form-control" value={selRow.cantidad} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reDoModalEdit}>Cerrar</button>
                                        <button type="submit" className="btn btn-primary">Editar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg" id="modalDelete">
                <div className="modal-dialog modal-dialog-centered">
                    <div id="conModalDelete" className="container">
                        <div className="row">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Eliminar producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reDoModalDelete}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col col-12 text-center">
                                                <h2>¿Seguro que desea eliminar este producto?</h2>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-center mt-4">
                                            <div className="col col-12 text-center">
                                                <h3>{selRow.nombre}</h3>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reDoModalDelete}>Cerrar</button>
                                    <button type="button" className="btn btn-primary" onClick={deleteProduct}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg" id="modalCreate">
                <div className="modal-dialog modal-dialog-centered">
                    <div id="conModalCreate" className="container">
                        <div className="row">
                            <div className="modal-content">
                                <form method="POST" onSubmit={createProduct}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Crear producto</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reDoModalCreate}></button>
                                    </div>

                                    <div className="modal-body p-5">
                                        <div className="container">
                                            <div className="row d-flex justify-content-center">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Nombre</span>
                                                    <input name="cNombre" type="text" className="form-control" />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Descripción</span>
                                                    <textarea name="cDesc" type="text" className="form-control" />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Precio</span>
                                                    <input name="cPrecio" type="text" className="form-control" />
                                                </div>

                                                <div className="input-group">
                                                    <span className="input-group-text">Cantidad</span>
                                                    <input name="cCant" type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reDoModalCreate}>Cerrar</button>
                                        <button type="submit" className="btn btn-primary">Crear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}