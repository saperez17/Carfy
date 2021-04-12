
const Register = ()=> {
  const handleChange = ()=>{

  }
  const handleSubmit =()=>{

  }
      return (
        <div className='wrapper'>
          <div className='form-wrapper'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} noValidate >
                
              <div className='fullName'>
                <label htmlFor="fullName">Full Name</label>
                <input  type='text' name='fullName' onChange={handleChange} autoComplete="new-password" noValidate  />
              </div>
              <div className='email'>
                <label htmlFor="email">Email</label>
                <input type='email' name='email' onChange={handleChange} noValidate />
              </div>
              <div className='password'>
                <label htmlFor="password">Password</label>
                <input type='password' name='password' onChange={handleChange} noValidate />
              </div>
              <div className='info'>
                <small>Password must be eight characters in length.</small>
              </div>
              <div className='submit'>
                <button>Create</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
 
  
ReactDOM.render(<Register />, document.querySelector("#app"));