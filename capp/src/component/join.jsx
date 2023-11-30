import React from 'react'
// import './join.css'
import logo from '../chat.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
let username;
const Join = () => {
    const [name, setname] = useState('');
    const setusername = () => {
        username = name;
    }
    // console.log(name);
    return (
        <div className="loginbox bg-gray-800 text-white h-screen flex items-center justify-center">
          <div className="login container mx-auto text-center">
            <img src={logo} alt="Logo" className="w-40 mb-4 mx-auto" />
    
            <h1 className="text-2xl font-semibold mb-4">Chat App</h1>
    
            <form className="flex flex-col items-center">
              <input
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter your name"
                type="text"
                className="bg-gray-700 text-white px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
    
              <Link
                onClick={(e) => {
                  name === '' ? e.preventDefault() : console.log('');
                }}
                to="/chat"
              >
                <button
                  onClick={setusername}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      );
}
export default Join
export { username }
