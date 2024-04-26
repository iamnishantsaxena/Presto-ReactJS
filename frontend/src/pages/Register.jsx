import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = React.useState();
  const navigate = useNavigate();
  const flexColumn = { display: ('flex'), flexDirection: ('column'), justifyContent: ('center'), alignItems: ('center') }
  const flexrow = { margin: ('0'), padding: ('0'), display: ('flex'), flexDirection: ('row'), justifyContent: ('center'), alignItems: ('center') }
  const Inputfield = { margin: ('0 0 16px 0'), padding: ('10px'), width: ('100%'), border: '1px solid #ccc', borderRadius: '34px' }
  const labelField = { margin: ('0'), padding: ('0 40px 0 0'), fontSize: ('1rem') }
  const submit = { padding: ('10px'), width: ('100%'), border: 'none', borderRadius: '34px', backgroundColor: '#007bff', color: '#fff' }
  const heading = { fontSize: '4rem', margin: '0' }
  const form = { width: '100%', padding: '30px', borderRadius: '1rem' }
  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }

  const register = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password, name);
      const res = await axios.post('http://localhost:5005/admin/auth/register', {
        name,
        email,
        password
      });
      console.log(res.data);
      setTokenFunction(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response.data.error);
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="card bg-dark text-white" style={form}>
          <div className="card-body p-5 text-center" style={flexColumn}>
              <h1 style = {heading} className="fw-bold mb-2 text-uppercase">Register</h1>
              <h4 className="text-white-50">Please enter your details to create an account!</h4>
              <form>
                <div style= {{ flexrow }} className="form-outline form-white">
                  <label style={labelField} className="form-label" htmlFor="typeNameX">Name</label>
                  <input type="text" style={Inputfield} id="typeNameX" className="form-control form-control-lg" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br/>
                <div style= {{ flexrow }} className="form-outline form-white">
                  <label style={labelField} className="form-label" htmlFor="typeEmailX">Email</label>
                  <input type="email" style={Inputfield} id="typeEmailX" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <br/>
                <div style= {{ flexrow }} className="form-outline form-white">
                  <label style={labelField} className="form-label" htmlFor="typePasswordX">Password</label>
                  <input style={Inputfield} type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </form>
              <p className="mb-0">Already have an account? <a href="#!" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-white-50 fw-bold">Login</a></p>
              <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={register} style={submit}>Register</button>
            <div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default Register;
