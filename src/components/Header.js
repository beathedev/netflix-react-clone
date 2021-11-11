import React from 'react';
import './Header.css';

const Header = ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
        <div className="header--logo" >
                    <a href="/">
                        <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix" />
                    </a>
                </div>
                <div className="header--user">
                    <a href="/">
                        <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Usuário" />
                    </a>
        </div>
        </header>
    );
}

export default Header;