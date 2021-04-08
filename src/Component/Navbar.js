import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  Logout = () => {
    localStorage.removeItem('siswa');
    localStorage.removeItem('nisn');
    window.location = '/login';
  };
  render() {
    return (
      <div>
        <header className="header">
          <h6 className="logo">PEMBAYARAN SPP</h6>
          <div>
            <Link to="/" className="link">
              Tagihan
            </Link>
            <Link to="/pembayaran" className="link">
              Pembayaran
            </Link>
            <Link to="/logout" className="link" onClick={() => this.Logout()}>
              Logout
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

export default Navbar;
