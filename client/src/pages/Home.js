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
    <div className="card bg-white card-rounded w-50 mx-auto">
    <div className="card-header bg-dark text-center">
        <h1>Welcome Basement Bar Trivia!</h1>
      </div>
      <div className="card-body mx-auto m-5">
        <h2> Welcome Basement Bar Trivia! </h2>
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
      <div className="card-footer text-center m-3">
        <h2> Ready to unlock your knoweldge </h2>
        <div>
          {Auth.loggedIn() ? (
            <>
             <Link to="/question">
          <button className="btn btn-lg btn-danger"> Start Trivia! </button>
        </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
        
      </div>
    </div>
    </main>
  );
};

export default Home;
