export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Blog Articoli. Tutti i diritti riservati.</p>
                <p>Creato con ❤️ e React</p>
                <nav className="footer-nav">
                    <a href="#">Privacy Policy</a> |
                    <a href="#">Termini e Condizioni</a> |
                    <a href="#">Contattaci</a>
                </nav>
            </div>
        </footer>
    );
}