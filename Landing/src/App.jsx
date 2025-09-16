import './App.css'
import NavBar from './Components/NavBar.jsx'

function App() {
  return (
    <>
      <header className="site-header" aria-label="Barra superior">
        <NavBar />
      </header>

      <main>
        <section id="hero" className="hero" aria-label="Hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line1">TUS DONACIONES</span>
              <span className="hero-title-line2">LLEGAN.</span>
            </h1>
            <p className="hero-description">
              Descubrí una nueva manera de organizar campañas de donación.
            </p>
          </div>
        </section>

        <section id="sobre-nosotros" className="sobre-nosotros" aria-label="Sobre nosotros">
          <div className="sobre-content">
            <div className="sobre-left">
              <h2 className="sobre-title">
                <span className="sobre-title-line1">Sobre</span>
                <span className="sobre-title-line2">nosotros.</span>
              </h2>
              <div className="sobre-text">
                <p>Donaciones Seguras es la solución a la deshonestidad en campañas de donación y la mejor manera de asegurar que tendrás el producto que necesitas al momento de una emergencia. La tecnología nos ha permitido armar una página que ayuda tanto a las ONGs como a los afectados por distintos problemas que necesitan de una mano.</p>
                <p>Así nace Donaciones Seguras, tu espacio de confianza para la organización y reserva de donaciones.</p>
              </div>
            </div>
            <div className="sobre-right">
              <div className="sobre-image-container">
                <img src="./src/Images/Donadoresempacando.png" alt="Voluntarios empacando donaciones" className="sobre-image" />
              </div>
            </div>
          </div>
          <div className="sobre-chevron">▼</div>
        </section>
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
