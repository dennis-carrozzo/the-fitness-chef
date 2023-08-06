import { useState } from 'react'
import { Formik } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ConfirmationModal from '@/components/Modal'

/* The code is defining a React functional component called `NewsLetterForm`.it renders a formik form component
with mui styling */
export default function NewsLetterForm ({ modalContent }) {
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({ title: '', content: '' })
  const initialValues = { email: '' }
  /**
   * The `submitHandler` function is an asynchronous function that handles the submission of a form by
   * making a POST request to an API endpoint and displaying a success or error message based on the
   * response.
   */
  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        setModalData(prev => ({
          title: modalContent.successTitle,
          content: modalContent.successContent
        }))
      } else {
        throw new Error('error while sending')
      }
    } catch (e) {
      console.log(e)
      setModalData(prev => ({
        title: modalContent.failureTitle,
        content: modalContent.failureContent
      }))
    } finally {
      toggleModal()
      setSubmitting(false)
    }
  }

  /**
   * The function `validateContactForm` is used to validate a contact form by checking if the email
   * field is empty or if it contains a valid email address.
   */
  const validateContactForm = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  /**
   * The toggleModal function toggles the state of the openModal variable.
   */
  const toggleModal = () => {
    setOpenModal(prev => !prev)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validateContactForm}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Stack
            component='form'
            onSubmit={handleSubmit}
            spacing={3}
            justifyContent='center'
            alignItems='center'
          >
            <TextField
              error={errors.email && touched.email}
              id='email'
              label='Your Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              color='accent'
              variant='filled'
              helperText={errors.email && touched.email ? errors.email : ''}
              sx={{
                width: 1,
                '.MuiInputBase-input': {
                  backgroundColor: 'light.main',
                  color: 'dark.light'
                },
                '.MuiFormLabel-root': {
                  color: 'light.dark'
                }
              }}
            />
            <Button
              type='submit'
              disabled={isSubmitting}
              variant='contained'
              color='accent'
            >
              Subscribe
            </Button>
          </Stack>
        )}
      </Formik>
      <ConfirmationModal
        open={openModal}
        handler={toggleModal}
        data={modalData}
      />
    </>
  )
}
