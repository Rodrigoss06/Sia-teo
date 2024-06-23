import Link from "next/link";
import React, { useState } from "react";
function Logo({ className }: { className: string }) {
  return (
    <svg className={className} width="300" height="300" viewBox="0 0 200 161">
      <defs>
        <linearGradient id="a" x1="48.9" x2="127.1" y1="40" y2="40"
          gradientTransform="scale(1.25056 .79964)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#2a3b8f" />
          <stop offset="1" stop-color="#29abe2" />
        </linearGradient>
        <linearGradient id="b" x1="126.9" x2="48.7" y1="124.8" y2="124.8"
          gradientTransform="scale(1.2532 .79796)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b4d44e" />
          <stop offset="1" stop-color="#e7f716" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd" stroke-width=".3">
        <path fill="#166da5" d="m197 80.2-21.4 36-30-36.5 30-35.6z" />
        <path fill="#8fdb69" d="m173.3 122.4-32.6-39L121 116l30.4 44.4z" />
        <path fill="#166da5" d="m172.9 37.8-32.2 39L121 44.2l30.5-44z" />
        <path fill="url(#a)" d="M61.1 31.4H141L123.4.7H78.7zm53.7 31.9H159l-15.9-26.8H98.8" opacity=".9" transform="translate(-.5 -.9) scale(1.22972)"/>
        <path fill="url(#b)" d="M141.3 100.3H61l17.6 30.5h45zm-26.5-31.9H159l-15.9 26.8H98.8" opacity=".9" transform="translate(-.5 -.9) scale(1.22972)"/>
        <path fill="#010101" d="M96.2 160 49.9 80 96.8.2H46L0 80.1 46.1 160z" />
      </g>
    </svg>
  );
}
function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative ">
      <div className=" grid grid-cols-[minmax(30px,_2fr)_minmax(220px,_2fr)] px-8 py-4 backdrop-blur bg-[#D9D9D9]">
        <Link href="/"><Logo className="w-12 h-12 mt-2" /></Link>
        <div className="hidden md:flex md:justify-between md:items-center space-x-4 text-xl font-medium ">
          <Link href="/empresas/list" className="hover:text-blue-600">Empresas</Link>
          <Link href="/" className="hover:text-blue-600">Empleados</Link>
          <Link href="/boletas_de_pago/list" className="hover:text-blue-600">Boletas de Pago</Link>
          {/* <a href="/" className="hover:text-blue-600">Reportes</a> */}
          {/* <a href="/" className="hover:text-blue-600">Configuración</a> */}
          {/* <a href="/" className="hover:text-blue-600">Perfil del Administrador</a> */}
          {/* <a href="/" className="hover:text-blue-600">Cerrar Sesión</a> */}
        </div>
        <button
          className="md:hidden text-2xl p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed left-0 top-0 h-full bg-white z-20 p-6 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-2xl mb-4 focus:outline-none"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>
        <nav className="flex flex-col space-y-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Empresas</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Empleados</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Boletas de Pago</Link>
          {/* <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Reportes</a> */}
          {/* <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Configuración</a> */}
          {/* <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Perfil del Administrador</a> */}
          {/* <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Cerrar Sesión</a> */}
        </nav>
      </div>
    </section>
  );
}

export default NavigationBar;
