import './App.css'
import NavBar from './Components/NavBar.jsx'

function App() {
  return (
    <>
      <header className="site-header" aria-label="Barra superior">
        <NavBar />
      </header>

      <main>
        <section id="sobre-nosotros" className="section" aria-label="Sobre nosotros"></section>
        <section id="section-3" className="section" aria-label="Sección 3"></section>
        <section id="section-4" className="section" aria-label="Sección 4"></section>
        <section id="registrate" className="section" aria-label="Regístrate"></section>
        <section id="contacto" className="section" aria-label="Contacto"></section>
        <section id="section-7" className="section" aria-label="Sección 7"></section>
      </main>
    </>
  )
}

export default App
