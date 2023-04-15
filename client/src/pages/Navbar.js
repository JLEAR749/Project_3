const Navbar = () => {

  return (
    <div class="container py-3">
      <div class="row">
      <div class="col text-start">
      <a href ="#"><img src ="favicon.ico"></img></a>
    </div>
    <div class="col-6 text-end font-family">
      <h1>Basement Bar Trivia</h1>
    </div>
    <div class="col text-center">
    </div>
    <div class="col text-end">
    <button type="button" class="btn btn-outline-info btn-lg">
        Login
      </button>
    </div>
    </div>
  </div>
);
};

export default Navbar;
