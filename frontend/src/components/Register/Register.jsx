import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import axios from 'axios';

import { ActiveStatus } from '../../ActiveStatus';
const Register = () => {
  const navigate = useNavigate()
  const { API, login, isActive } = useContext(ActiveStatus)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const inputs = [
    {
      id: 'firstName',
      type: 'text',
      field: 'firstName',
      valie: formData.firstName,
      maxSymbols: 15,
      label: 'First Name',
    },
    {
      id: 'lastName',
      type: 'text',
      field: 'lastName',
      valie: formData.lastName,
      maxSymbols: 15,
      label: 'Last Name',
    },
    {
      id: 'email',
      type: 'email',
      field: 'email',
      valie: formData.email,
      maxSymbols: 30,
      label: 'Email',
      icon: MdEmail,
    },
    {
      id: 'phone',
      type: 'tel',
      field: 'phone',
      valie: formData.phone,
      maxSymbols: 12,
      label: 'Phone',
      icon: FaPhone,
    },
    {
      id: 'niki100GamesPassword',
      type: 'password',
      field: 'password',
      valie: formData.password,
      maxSymbols: 30,
      label: 'Password',
      icon: IoMdLock,
    },
  ]

  const handleChangeValue = (field, e, maxSymbols) => {
    let value = e.target.value
    if (field === 'phone') {
      value = value.replace(/\D/g, '')
    }
    value = value.length > maxSymbols ? value.slice(0, maxSymbols) : value

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const [usedEmail, setUsedEmail] = useState(false)

  const [validForm, setValidForm] = useState({})
  const checkData = () => {
    setUsedEmail(false)
    const addValidation = {}
    inputs.forEach(input => {
      addValidation[input.field] = input.valie.length < 3 || input.valie === ''
    });
    setValidForm(addValidation)

    return Object.values(addValidation).every(value => value === false)
  }

  const handleAddData = async () => {
    if (checkData()) {
      try {
        const response = await axios.post(`${API}/register`, {formData})
        if (response.status === 201) {
          login(response.data)
          navigate('/')
        } else if (response.status === 200) {
          setUsedEmail(true)
        }
      } catch (error) {
        console.error(error);   
      }
    }
  }

  useEffect(() => {
    if (isActive) {
      navigate('/')
    }
  })

  return (
    <>
    <div className='Register'>
      <div className='con'>
        {inputs.map((input, index) => (
          <div className='input' key={index}>
            <input 
              id={input.id}
              type={input.type}
              value={input.valie}
              onChange={(e) => handleChangeValue(input.field, e, input.maxSymbols)}
              placeholder=''
              autoComplete='false'
            />
            <label htmlFor={input.id}>{input.icon && <input.icon className='icon'/>}{input.label}</label>
            {validForm[input.field] && <p>Please enter a value.</p>}
            {(usedEmail && input.field === 'email') && <span className='comp'>Already have user with this Email</span>}
          </div>
        ))}
        {usedEmail && <span className='mobile'>Already have user with this Email</span>}
        <button className={`${usedEmail && 'error'}`} onClick={handleAddData}>Continue</button>
      </div>
    </div>
    </>
  )
}

export default Register
