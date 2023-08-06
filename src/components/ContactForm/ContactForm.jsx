import { useState } from 'react'
import { Formik } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ConfirmationModal from '@/components/Modal'
import validateContactForm from '@/utils/validateContactForm'

export default function ContactForm () {
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({ title: '', content: '' })
  const initialValues = { name: '', email: '', message: '' }

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        setModalData(prev => ({
          title: 'Thank You for Subscribing! ✨✨✨',
          content:
            "Congratulations! You're now part of this vibrant community. Get ready to embark on a journey of inspiration, insights, and exclusive content straight to your inbox. I'm thrilled to have you on board. Keep an eye on your email for exciting updates and occasional surprises. Welcome on board!"
        }))
      } else {
        throw new Error('error while sending')
      }
    } catch (e) {
      console.log(e)
      setModalData(prev => ({
        title: 'Subscription Unsuccessful',
        content:
          'I apologize for the inconvenience. It seems there was an issue processing your subscription request. Please check your network connection and try again. If the problem persists, kindly contact me for assistance. I appreciate your interest and hope to resolve this issue promptly. Thank you for your understanding.'
      }))
    } finally {
      toggleModal()
      setSubmitting(false)
    }
  }

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
          /* and other goodies */
        }) => (
          <Stack
            component='form'
            onSubmit={handleSubmit}
            spacing={3}
            justifyContent='center'
            alignItems='center'
          >
            <TextField
              error={!!errors.name && touched.name}
              id='name'
              label='Your Name'
              value={values.name}
              color='accent2'
              variant='standard'
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.name && touched.name ? errors.name : ''}
              fullWidth
            />
            <TextField
              error={errors.email && touched.email}
              id='email'
              label='Your Email'
              value={values.email}
              color='accent2'
              variant='standard'
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.email && touched.email ? errors.email : ''}
              fullWidth
            />
            <TextField
              error={errors.message && touched.message}
              id='message'
              placeholder='Tell me about your project idea'
              label='Your Message'
              multiline
              minRows={5}
              value={values.message}
              color='accent2'
              variant='standard'
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                errors.message && touched.message ? errors.message : ''
              }
              fullWidth
            />
            <Button
              type='submit'
              variant='outlined'
              color='light'
              size='large'
              sx={{ width: 1 }}
              disabled={isSubmitting}
            >
              Submit
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
