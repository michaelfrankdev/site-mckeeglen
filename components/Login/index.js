import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

const LoginPanel = () => {
  const { login } = useAuth()
  const router = useRouter()
  const errors = {}

  // INITIALIZE STATE FOR FORM DATA
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // INITIALIZE STATE FOR FORM ERRORS
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    emailValid: '',
    passwordValid: '',
  })

  // INITIALIZE STATE FOR SUBMIT STATUS
  const [isSubmit, setIsSubmit] = useState(false)

  // PROCESS LOGIN INPUT & DATA
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('form submission attempted ...')

    setFormErrors(validate(formData))

    setIsSubmit(true)

    if (Object.keys(errors).length === 0) {
      try {
        console.log('form transmission attempted ...')
        await login(formData.email, formData.password)
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        console.log(error.code)
        console.log(error.message)
        switch (error.code) {
          case 'auth/user-not-found':
            setFormErrors({
              ...formErrors,
              email: 'Firebase: Email address not found.',
              password: '',
              emailValid: false,
              passwordValid: true,
            })
            break
          case 'auth/invalid-email':
            setFormErrors({
              ...formErrors,
              email: 'Firebase: The email address is not valid.',
              password: '',
              emailValid: false,
              passwordValid: true,
            })
            errors.break
          case 'auth/wrong-password':
            setFormErrors({
              ...formErrors,
              email: '',
              password: 'Firebase: Incorrect password. Please try again.',
              emailValid: true,
              passwordValid: false,
            })

            break
          case 'auth/too-many-requests':
            alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)')
            break
          default:
            alert('A critical error has occured. Please notify an administrator.')
        }
      }
    } else {
      console.log('form submission canceled ...')
    }
  }

  // VALIDATE LOGIN INPUT VALUES
  const validate = (formDataInput) => {
    const regExr = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g
    if (!formDataInput.email.match(regExr)) {
      // if (!formDataInput.email) {
      errors.email = 'An email address is required.'
      errors.emailValid = false
    }
    if (!formDataInput.password) {
      errors.password = 'A password is required.'
      errors.passwordValid = false
    }
    return errors
  }

  // UPDATE FORM ERRORS WHEN THE DOM IS CHANGED
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, formData, isSubmit])

  return (
    <div className="input-form">
      {/* <pre>{JSON.stringify(formErrors, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
      <h5 className="page-heading">Login</h5>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className={formErrors.emailValid === false ? 'error-control' : 'form-control'}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            value={formData.email}
            type="text"
            placeholder="Enter email"
          />
          <div id="loginEmailError" className="error-message">
            {formErrors.email}
          </div>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={formErrors.passwordValid === false ? 'error-control' : 'form-control'}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            value={formData.password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div id="loginEmailError" className="error-message">
          {formErrors.password}
        </div>
        <Button className="formSubmitButton" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginPanel