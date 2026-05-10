import axios from '../api/apiBase';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = () => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [phNo, setPhNo] = useState ('');
  const [address, setAddress] = useState ('');
  const [answer , setAnswer] = useState('');

  let navigate = useNavigate ();
  

  const handleSubmit = async e => {
    e.preventDefault ();
    const data = {name, email, password, phNo, address,answer};

    try {
      const res = await axios.post ('user/register', data);
      console.log (res);
      if (res.status == 200) {
        navigate ('/login');
      }
    } catch (error) {
      console.log (error);
    }

    toast.success ('Registration Completed!');
  };

  // common input class
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4F46E5] transition-colors placeholder-gray-400';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e => setName (e.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail (e.target.value)}
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword (e.target.value)}
            placeholder="Password"
            className={inputClass}
          />
          <input
            type="tel"
            value={phNo}
            onChange={e => setPhNo (e.target.value)}
            placeholder="Phone"
            className={inputClass}
          />
          <input
            type="text"
            value={address}
            onChange={e => setAddress (e.target.value)}
            placeholder="Address"
            className={inputClass}
          />
          <input
            type="text"
            value={answer}
            onChange={e => setAnswer (e.target.value)}
            placeholder="What is your Fav Sports"
            className={inputClass}
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-semibold hover:bg-[#4338CA] transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
