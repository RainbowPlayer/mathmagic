import React from 'react'
import axios from "axios"
import './styles.css'
import {
  // JavaScriptIcon,
  AppleIcon,
  MacIcon,
  AndroidIcon,
  WindowsIcon,
} from '../../../assets/icons'

const HomeFooter = () => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [errorName, setErrorName] = React.useState('')
  const [errorEmail, setErrorEmail] = React.useState('')
  const [errorPhone, setErrorPhone] = React.useState('')
  const [isSending, setSending] = React.useState(false)
  const [inputName, setName] = React.useState('')
  const [inputEmail, setEmail] = React.useState('')
  const [inputPhone, setPhone] = React.useState('')

  function goTo(url: string, newWindow: boolean = true): React.MouseEventHandler<HTMLDivElement> | undefined {
    if (newWindow)
      window.open(url)
    else
      document.location = url
    return
  }
  function clearForm() {
    setName('')
    setEmail('')
    setPhone('')
  }
  function clearErrors() {
    setErrorName('')
    setErrorEmail('')
    setErrorPhone('')
  }
  function submitForm(e:any): void {
    clearErrors()
    if (inputName.trim() === '') {
      setErrorName('Please introduce yourself')
      return
    }
    if (inputEmail.trim() === '' && inputPhone.trim() === '') {
      setErrorPhone('Please provide an email address or contact phone number')
      return
    }
    if (inputEmail.trim() !== '' && !reEmail.test(inputEmail)) {
      setErrorEmail('The email address entered is incorrect')
      return
    }
    setSending(true)
    axios({ method: 'POST',
      url: 'https://bristar.studio/uk/services/contact_form',
      data: {
        'form-name': inputName,
        'form-contact-email': inputEmail,
        'form-contact-phone': inputPhone,
        'form-additional-info': ''
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(response => {
      setSending(false)
      if (response.data.result === 'success') {
        alert('Thank you for your interest in our game!')
        clearForm()
      } else {
        setErrorPhone('Error sending data. Please try again.')
        console.log('Error sending data. Please try again.', response.data)
      }
    }).catch(error => {
      setSending(false)
      setErrorPhone('Error sending data. Please try again.')
    })
    return
  }

  return (
    <div className="home-footer-container">
      <div className="home-footer-left">
        <h2 className="home-footer-title">
          We bring math to life - making it simple, fun, and truly educational!
        </h2>

        <div className="home-footer-icons-row">
          {/*
          <div className="home-footer-icon-block">
            <JavaScriptIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">Web</span>
          </div>*/}


          <div className="home-footer-icon-block" onClick={() => goTo("https://apps.apple.com/us/app/heroes-of-math-and-magic/id6467421035")}>
            <AppleIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">iOS</span>
          </div>

          <div className="home-footer-icon-block" onClick={() => goTo("https://apps.apple.com/us/app/heroes-of-math-and-magic/id6467421035")}>
            <MacIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">macOS</span>
          </div>

          <div className="home-footer-icon-block" onClick={() => goTo("https://play.google.com/store/apps/details?id=com.Bristar.MathMagic")}>
            <AndroidIcon className="home-footer-icon"/>
            <span className="home-footer-icon-label">Android</span>
          </div>

          <div className="home-footer-icon-block" onClick={() => goTo("https://ugs3experiment.bristar.studio/builds/mathmagic.exe", false)}>
            <WindowsIcon className="home-footer-icon"/>
            <span className="home-footer-icon-label">Windows</span>
          </div>
        </div>
      </div>

      <div className="home-footer-right">
        <input disabled={isSending} value={inputName} onChange={e => setName(e.target.value)} type="text" placeholder="Name" className="home-footer-input" />
        <div className="home-form-error" style={errorName.trim() === '' ? {display:'none'} : {}}>{errorName}</div>
        <input disabled={isSending} value={inputEmail} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="home-footer-input" />
        <div className="home-form-error" style={errorEmail.trim() === '' ? {display:'none'} : {}}>{errorEmail}</div>
        <input disabled={isSending} value={inputPhone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Phone" className="home-footer-input" />
        <div className="home-form-error" style={errorPhone.trim() === '' ? {display:'none'} : {}}>{errorPhone}</div>

        <button className="home-footer-button" onClick={submitForm}>Contact Us</button>
      </div>
    </div>
  );
};

export default HomeFooter;
