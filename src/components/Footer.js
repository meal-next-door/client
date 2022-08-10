import { NavLink } from "react-router-dom";

function Footer() {

    return (
        <footer className="text-center text-lg-start bg-light text-muted" style={{ marginTop: '6rem', bottom: '0', left: '0', right: '0' }}>
            <div className="text-center p-4" style={{ backgroundColor: '#EDE1E1' }}>
                <p>© 2022 Copyright:</p>
                <NavLink className="text-reset fw-bold" to="https://github.com/Stephanie-Tovar">Stephanie Tovar</NavLink>
                <span> & </span>
                <NavLink className="text-reset fw-bold" to='https://github.com/Virgule09'>Alexandre Coma</NavLink>
            </div>
        </footer>
    );
}

export default Footer;