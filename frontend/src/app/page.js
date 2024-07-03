"use client";

import { useEffect, useState } from 'react';
import miAxios from '../axiosConfig.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/navigation.js';

export default function Index() {
  const router = useRouter();

  const createAlert = (type, message) => {
    const row = document.getElementById('alert')

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
      const container = document.getElementById('container')
      const row = document.createElement('div')
      row.classList.add('row', 'mt-5')
      row.setAttribute('id', 'alert')

      const strong = document.createElement('strong')
      strong.innerHTML = message
      alert.classList.add(type)
      alert.appendChild(strong)
      row.appendChild(alert)
      container.appendChild(row)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const inputRun = elements.namedItem('run')
    const inputPass = elements.namedItem('password')

    miAxios.post('/login', {
      "run": inputRun.value ? inputRun.value : "",
      "pass": inputPass.value ? inputPass.value : ""
    }).then((res) => {
      const data = res.data;

      if (data.auth == true) {
        router.push("/home")
      }

    }).catch((err) => {
      createAlert('alert-danger', err.response.data.message)
    });
  }

  useEffect(() => {
    miAxios.post("/auth").then((res) => {
      const data = res.data;
      console.log(data)
      if (data.auth == true) router.push('/home')
    }).catch((err) => { })
  }, [])

  return (
    <main>
      <div id='container' className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className='m-5'>Mi React ERP</h1>

        <div className="card text-center p-5" style={{ width: 30 + "rem" }}>

          <h2>Inicia Sesión</h2>

          <div className="car-body mt-5">

            <form method='POST' onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" name='run' className="form-control" placeholder="Ingresa tu Run" />
              </div>

              <div className="mb-3">
                <input type="password" name='password' className="form-control" placeholder="Contraseña" />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-secondary">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
