import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TECH } from '../utils/queries';
import { CREATE_MATCHUP } from '../utils/mutations';

const Matchup = () => {
  const { loading, data } = useQuery(QUERY_TECH);

  const techList = data?.tech || [];

  const [formData, setFormData] = useState({
    tech1: 'JavaScript',
    tech2: 'JavaScript',
  });
  let navigate = useNavigate();

  const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createMatchup({
        variables: { ...formData },
      });

      navigate(`/matchup/${data.createMatchup._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      tech1: 'JavaScript',
      tech2: 'JavaScript',
    });
  };
  const handleAnswerClick = (answer) => {
    console.log(answer);
  };
  const choices = ['Apple', 'Cheese', 'Milk', 'Grapes'];

  return (
    
       <main>
            <div className="card bg-white p-5 rounded-lg shadow">
                <div className="card-header questions-header">
            <h1>Category</h1>
            <p>00:00:00</p>
            </div>
            {loading ? (
         <div class="card-body">
         <h5 class="card-title placeholder-glow">
           <span class="placeholder col-6"></span>
         </h5>
         <p class="card-text placeholder-glow">
           <span class="placeholder col-7"></span>
           <span class="placeholder col-4"></span>
           <span class="placeholder col-4"></span>
           <span class="placeholder col-6"></span>
           <span class="placeholder col-8"></span>
         </p>
         <a class="btn btn-primary disabled placeholder col-6"></a>
       </div>
        ) : (
            <div className="card-body questionscard">
              <h3 className="card-title">Questions</h3>
              <ul className='multiplechoice'>
                {choices.map((choice) => (
                  <li key={choice}><a onClick={() => handleAnswerClick(choice)}>{choice}</a></li>
                ))}
              </ul>
              <a href="#" class="btn btn-primary" id='submitbtn'>Submit</a>
            </div>
        )}
              {error && <div>Something went wrong...</div>}

        </div>
            </main>

        )}
  
  

export default Matchup;