import React,{useState} from 'react'

import { Head, usePage, Link, router } from '@inertiajs/react';
import Auth from '../../Layout/Auth';
import { FaTwitter,FaGithub } from "react-icons/fa";


const Register = () => {
    //destruct props "errors"
    const { errors } = usePage().props;

    //define state
    const [name, setName]   = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    
    //method "storeRegister"
    const storeRegister = async(e) => {
            e.preventDefault();
            router.post('/register', {
                //data
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });
        } 
        return (
            <>
            <Head>
                <title>Register New Account</title>
            </Head>
            <Auth images="https://i.vgy.me/WxULMi.jpg">
        <form className="w-full" onSubmit={storeRegister}>
          <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Create account
          </h1>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Full Name</span>
            <input
              className="block w-full mt-2 text-sm form-input"
              placeholder="John Doe" type="text" onChange={(e)=>setName(e.target.value)}
            />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Email</span>
            <input
              className="block w-full mt-2 text-sm form-input"
              placeholder="example@example.com" type="email" onChange={(e)=> setEmail(e.target.value)}
            />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Password</span>
            <input
              className="block w-full mt-2 text-sm form-input"
              placeholder="***************"
              type="password" onChange={(e)=>setPassword(e.target.value)}
            />
          </label>
          <label className="block mt-4 mb-8 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Confirm password
            </span>
            <input
              className="block w-full mt-2 text-sm form-input"
              placeholder="***************"
              type="password" onChange={(e)=>setPasswordConfirmation(e.target.value)}
            />
          </label>
            <input className="hover:cursor-pointer block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center  transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple text-white"
             type="submit" value="Register Account" />
          <hr className="my-8" />
          <button disabled className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
          <FaGithub className="w-4 h-4 mr-2" />
            Github
          </button>
          <button disabled className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
          <FaTwitter className="w-4 h-4 mr-2" />
            Twitter
          </button>
          <p className="mt-4">
            <Link
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              href="/login"
            >
              Already have an account? Login
            </Link>
          </p>
        </form>
    </Auth>
    </>
  )
}

export default Register