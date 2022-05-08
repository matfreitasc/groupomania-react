import { React, useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import Navbar from '../../Components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';

export default function Profile() {
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState(auth?.username);
  const [userId, setUserId] = useState(auth?.userId);
  const [userAvatar, setUserAvatar] = useState(auth?.profilePicture);
  const [userEmail, setUserEmail] = useState(auth?.email);
  const [password, setPassword] = useState(auth?.password);
  const [name, setName] = useState(auth?.name);

  const handleSubmit = (e) => {
    console.log(auth);
    axiosPrivate
      .put(`/auth/users/${userId}`, {
        userId,
        username,
        password,
        name,
        email: userEmail,
      })
      .then((res) => {
        setAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <section className='h-screen bg-gray-100 bg-opacity-50'>
        <form className='container max-w-2xl mx-auto shadow-md md:w-3/4'>
          <div className='p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5'>
            <div className='max-w-sm mx-auto md:w-full md:mx-0'>
              <div className='inline-flex items-center space-x-4'>
                <a href='#' className='block relative'>
                  <img
                    alt='profile'
                    src='https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip'
                    className='mx-auto object-cover rounded-full h-16 w-16 '
                  />
                </a>
              </div>
            </div>
          </div>
          <div className='space-y-6 bg-white'>
            <div className='items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
              <h2 className='max-w-sm mx-auto md:w-1/3'>Personal info</h2>
              <div className='max-w-sm mx-auto space-y-5 md:w-2/3'>
                <div>
                  <div className=' relative '>
                    <input
                      type='text'
                      id='user-info-name'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                      placeholder='Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className=' relative '>
                    <input
                      type='text'
                      id='user-info-phone'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className=' relative '>
                    <input
                      type='text'
                      id='user-info-email'
                      className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                      placeholder='Email'
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0'>
              <h2 className='max-w-sm mx-auto md:w-4/12'>Change password</h2>
              <div className='w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex'>
                <div className=' relative '>
                  <input
                    type='password'
                    id='user-info-password'
                    className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='text-center md:w-3/12 md:pl-6'>
                <button
                  type='button'
                  className='py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Change
                </button>
              </div>
            </div>
            <hr />
            <div className='w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3'>
              <button
                type='submit'
                className='py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
