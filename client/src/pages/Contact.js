import React from 'react';
const styles = {
  card: {
      marginTop: '100px',
      width: '80%',
  },
  show:{
    display:'block'
  },
  hide:
  {
    display:'none'
  }
};
export default function Contact() {
  return (
    <div>
     <section style={styles.card} className='card mx-auto bg-white p-5 rounded-lg shadow' >
    <div className="container wow fadeInUp text-center">
      <div className="row">
        <div className="col-md-12">
          <h3 className="section-title">Contact</h3>
        </div>
      </div>
<div style={styles.hide} id="sendmessage">Your message has been sent. Thank you!</div>
      <div className="row">
        <div className="col-md-5 col-md-push-2 mx-auto" id='formcard'>
          <div className="form">
            
            <div id="errormessage"></div>
            <form action="" method="post" role="form" className="contactForm">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" required />
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" required/>
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message" required></textarea>
                <div className="validation"></div>
              </div>
              <div>
                <h4 className='valid'></h4>
              </div>
               </form>
               <div className="text-center">
               <button
  onClick={() => {
    const formControls = document.querySelectorAll('.form-control');
    let allValid = true;
    let emailValid = true;
    const email = document.getElementById('email').value;
    function isValidEmail(email) {
      // This regular expression checks if an email is valid
      const regex = /.+@.+\..+/;
      return regex.test(email);
  }
    formControls.forEach((control) => {
      if (!control.value) {
        allValid = false;
        control.className = 'form-control is-invalid'
      } else  if (!isValidEmail(email)) {
        emailValid = false;
        control.className = 'form-control is-invalid'
        document.querySelector('.valid').textContent = 'Invalid Email :{';
      } else{
        control.className = 'form-control is-valid'
      }
    });

    if (allValid && emailValid) {
      document.querySelector('.valid').textContent = '';
      document.getElementById('sendmessage').style.display ="block"
      document.getElementById('formcard').style.display='none'
    } else if (!allValid) {
      document.querySelector('.valid').textContent = 'Complete form now!!!';
    } else if (!emailValid){
      formControls.forEach((control) => {
        control.className = 'form-control is-valid'
      })
      document.getElementById('email').className = 'form-control is-invalid'
    }
  }}
  className="btn btn-dark"
>
  Send Message
</button>

</div>

           
          </div>
        </div>

      </div>
    </div>
  </section>
    </div>
  );
}