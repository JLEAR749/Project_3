import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import Auth from '../utils/auth';
const Home = () => {
  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const matchupList = data?.matchups || [];

  return (
    <main>
    <div className="container">
    <div className="row">
    <div className="col-md-6">
    <div className="card bg-white card-rounded">
    <div className="card-header text-center m-2">
        <h1>Welcome to Basement Bar Trivia!</h1>
      </div>
      <div className="card-body text-center m-2">
        <h2> Ready to unlock your knowledge? </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {matchupList.map((matchup) => {
              return (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-2">
        <div>
          {Auth.loggedIn() ? (
            <>
             <Link to="/question">
          <button className="btn btn-lg btn-danger m-2" to="/question"> Start Trivia! </button>
        </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-danger m-2" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
        
      </div>
    </div>
    </div>
    <div className="col-md-6">
    <div className="card bg-white card-rounded">
      <div className="card-body">
        <img src="../Hero.png" alt="Hero" className="img-fluid" />
      </div>
    </div>
    </div>
    </div>
    </div>
    </main>
  );
};

export default Home;
