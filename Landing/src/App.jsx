import './App.css'
import landingHero from './Images/Landing.png'

function App() {
  return (
    <>
      <header className="site-header" aria-label="Barra superior">
        <div className="header-bar">
          <img src={landingHero} alt="Barra superior Donaciones Seguras" className="header-image" />
          <a href="#hero" className="brand-hitbox" aria-label="Ir al inicio"></a>
          <nav className="nav-hitboxes" aria-label="Principal">
            <a href="#sobre-nosotros" aria-label="Ir a Sobre nosotros">Sobre nosotros</a>
            <a href="#contacto" aria-label="Ir a Contacto">Contacto</a>
            <a href="#registrate" className="primary" aria-label="Ir a Regístrate">Regístrate</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero" aria-label="Hero">
          <img src={landingHero} alt="Donaciones Seguras - Hero" className="hero-image" />
        </section>

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
