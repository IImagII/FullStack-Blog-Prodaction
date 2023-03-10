import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const RegisterPage = () => {
   const [username, setUserName] = useState('') //делаем управляемые input
   const [password, setPassword] = useState('') //делаем управляемые input
   const dispatch = useDispatch()

   const { status } = useSelector(state => state.auth)

   //это делается для обработки ошибок мы получили status
   useEffect(() => {
      if (status) {
         toast(status)
      }
   }, [status])

   //создаем функцию для отправки данных на бекенд
   const handleSubmit = () => {
      try {
         dispatch(registerUser({ username, password })) //обязательно передаем объект с параметрами как мы и писали в thunk
         //очищаем наши формы
         setUserName('')
         setPassword('')
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <form
         onSubmit={e => e.preventDefault()}
         className='w-1/4 h-60 mx-auto mt-40'
      >
         <h1 className='text-lg text-white text-center'>Регистрация</h1>
         <label className='text-xs text-gray-400'>
            Username:
            <input
               type='text'
               value={username}
               onChange={e => setUserName(e.target.value)}
               placeholder='Username'
               className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
         </label>
         <label className='text-xs text-gray-400 '>
            Password:
            <input
               type='password'
               value={password}
               placeholder='Password'
               onChange={e => setPassword(e.target.value)}
               className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
         </label>
         <div className='flex gap-8 justify-center mt-4'>
            <button
               className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
               type='submit'
               onClick={handleSubmit} //так отправляем форму
            >
               Подтвердить
            </button>
            <Link
               to='/login'
               className='flex justify-center items-center text-xs text-white'
            >
               Уже зарегестрированы?
            </Link>
         </div>
      </form>
   )
}
