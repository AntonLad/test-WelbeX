import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { useSelector, useDispatch  } from 'react-redux'
import  { ButtonAdd } from './styles/Button.styled'
import  { Input }  from './styles/Input.styled'
import  { InputWidth }  from './styles/Input.styled'
import  { Label } from './styles/Label.styled'
import  { Select } from './styles/Input.styled'
import  { ButtonSend } from './styles/Button.styled'
import  { ButtonSendActive } from './styles/Button.styled'
import  { LabelInfo } from './styles/Label.styled'
import arrowDown from '../components/pictures/arrowDown.svg'
import arrowUp from '../components/pictures/arrowUp.svg'
import { makeForm } from '../redux/reducers/forms.js'

export default function Form() {
  const dispatch = useDispatch()
  const arrayOfForms = useSelector((s) => s.forms.arrayOfForms)
  const [value, setValue] = useState({
    name: '',
    phone: '',
    profile: '',
    company: '',
    email: '',
    city: '',
    surname: '', 
    sourceOfInfo: '',
  })
  const [loading, setLoading] = useState(false)
  const [correctName, setCorectName] = useState(false)
  const [correctMail, setCorectMail] = useState(false)
  const [correctProfile, setCorectProfile] = useState(false)
  const [correctPhone, setCorectPhone] = useState(false)

  const handleChange = (event) => {
    const name  = event.target.name
    setValue(() => {
      const newValue= {[name]: event.target.value }
      return { ...value,  ...newValue }})
  }

  const [arrayOfCities, setArrayOfCities] = useState([])
  const [arrayOfSource, setArrayOfSource] = useState([])
  const [check, setCheck] = useState(true)

  useEffect (() => {
    if (value.name !== '') {setCorectName(!/.{2}/.test(value.name))}
    if (value.phone !== '') {setCorectPhone(!/^\d{11,11}$/.test(value.phone))} 
    if (value.email !== '') {setCorectMail(!/.+@.+\..+/.test(value.email))}
    if (value.profile !== '') {setCorectProfile(!/.{3}/.test(value.profile))}    
  }, [value.name, value.email, value.profile, value.phone])

  const getArrayOfCities = async () => {
    const result = await axios('http://localhost:8080/api/v1/cities')
    setArrayOfCities(result.data)
    return result.data
  }
  
  const getArrayOfSource = async () => {
    const result = await axios('http://localhost:8080/api/v1/source')
    setArrayOfSource(result.data)
    return result.data
  }
 
  useEffect (() => {
    getArrayOfCities()
    getArrayOfSource()
  }, [])

  const citySelected = document.getElementById("city")
  const changeCity = () => {
    setValue({ ...value, city:  citySelected?.options[citySelected?.selectedIndex]?.value })
  }

  const sourceSelected = document.getElementById("sourceOfInfo")
  const changeSource = () => {
    setValue({ ...value, sourceOfInfo: sourceSelected?.options[sourceSelected?.selectedIndex]?.value })
  }

  const resetCity = document.getElementById("city")
  const resetSource = document.getElementById("sourceOfInfo")
  const reset = () => {
    if (resetCity) {resetCity.options[0].selected = true}
    if (resetSource) {resetSource.options[0].selected = true}
  }
    
  useEffect(() => {
    dispatch(makeForm(value))
  })

  const sendForm = async () => {
    setTimeout(async() => {
      await axios ({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/form',
        data: arrayOfForms
      })
      console.log('Data from Redux:', arrayOfForms)
      setValue({
        name: '',
        phone: '',
        profile: '',
        company: '',
        email: '',
        city: '',
        surname: '', 
        sourceOfInfo: '',
      })
      reset()
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="form">
      <div style={{ position: 'relative' }}>
        <Label>Ваше имя *</Label>
        {correctName && <LabelInfo>Введите минимум 2 символа</LabelInfo>}  
        <Input type="text" placeholder="Иван" name="name" required
          value={value?.name}
          onChange={e => {handleChange(e)}}
        />
      </div>
      <div style={{ position: 'relative' }}>
        <Label>Номер телефона *</Label>
        {correctPhone && <LabelInfo>Не корректный номер</LabelInfo>}
        <Input type="tel" placeholder="7(000) 000-00-00" name="phone" required
          value={value?.phone}
          onChange={e => {handleChange(e)}}
        />  
      </div>
      <div style={{ position: 'relative' }}>
        <Label>e-mail *</Label>
        {correctMail && <LabelInfo>Введите корректный e-mail</LabelInfo>}
        <Input type="email" placeholder="example@skdesign.ru" name="email" required
          value={value?.email}
          onChange={e => {handleChange(e)}}
        />  
      </div>
      <div style={{ position: 'relative' }}>
        <Label>Ссылка на профиль *</Label>
        {correctProfile && <LabelInfo>Введите ссылку на профиль</LabelInfo>}
        <Input type="text" placeholder="example@instagram.com/skde…" name="profile" required
          value={value?.profile}
          onChange={e => {handleChange(e)}} 
        />
      </div>
      <Select defaultValue="Выберите город *" id="city" name="city" 
        onClick={changeCity}
      >
        <option value="Выберите город *" disabled>Выберите город *</option>
        {arrayOfCities.map((it) => {
          return (
            <option key={it.id} value={it.name}>{it.name}</option>
          )
        })}
      </Select>  
      <div style={{ position: 'relative' }}>
        <Label>Название организации/студии</Label>
        <InputWidth type="text" placeholder="SK Design" name="company"
          value={value?.company}
          onChange={e => {handleChange(e)}}
        />
      </div>
      {check 
        ? <ButtonAdd onClick={() => setCheck(!check)}>
            Показать дополнительные поля <img src={arrowDown} alt='arrowDown'></img>
          </ButtonAdd>
        : <ButtonAdd onClick={() => setCheck(!check)}>
            Скрыть дополнительные поля <img src={arrowUp} alt='arrowUp'></img>
          </ButtonAdd>
      }
      {!check && (
        <>
          <div style={{ position: 'relative' }}>
            <Label>
              Получатель
            </Label>
            <InputWidth type="text" placeholder="ФИО" name="surname"
              value={value?.surname}
              onChange={e => {handleChange(e)}}/>  
          </div>
          <Select defaultValue="Откуда узнали про нас?" id="sourceOfInfo"
            onClick={changeSource}
          >
            <option value="Откуда узнали про нас?" disabled>Откуда узнали про нас?</option>
            {arrayOfSource.map((it) => {
              return (
                <option key={it} value={it}>{it}</option>
              )
            })}
          </Select> 
        </>
      )}
      {(!correctName && !correctMail && !correctProfile && !correctPhone) 
        && (value.name && value.email && value.profile && value.phone && (value.city && value.city !== "Выберите город *")) 
        ? <ButtonSendActive onClick={()=> {
            setLoading(true)  
            sendForm()
          }}>
            {!loading ? 'Отправить заявку' : <ClipLoader color="#fff" size={10} /> }
          </ButtonSendActive> 
        : <ButtonSend>Отправить заявку</ButtonSend>
      }
    </div>
  )
}
