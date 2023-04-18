import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';


const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  // export default function Navbar({defaultPage, handPageChange})
  return (
    <main>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        
    <a class="btn btn-outline-dark m-2" href="/contact">Contact</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="btn btn-outline-dark m-2" href="/">Home <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="btn btn-outline-dark m-2" href="/about">About</a>
      </li>
      <li>
          {Auth.loggedIn() ? (
            <>
            {/* for future dev */}
              {/* <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link> */}
              <button className="btn btn-outline-dark m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-dark m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-dark m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </li>
    </ul>
    </div>
    </div>
</nav>
</main>
  )
}

export default Navbar;
