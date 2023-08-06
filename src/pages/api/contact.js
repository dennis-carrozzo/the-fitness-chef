import validateContactForm from '@/utils/validateContactForm'
import sgMail from '@sendgrid/mail'

// TODO: create contact reply email template and set env variable id

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler ({ method, body }, res) {
  // validating request method
  if (method !== 'POST') {
    res.status(405).json({ message: 'Invalid Method' })
  }
  // validating request body
  const errors = validateContactForm(body)
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ message: 'Invalid body' })
  }
  // emailing admin
  try {
    const response = await emailAdmin(body)
    if (!response) {
      throw new Error('error sending message')
    }
    const responseUser = await emailUser(body)
    if (!responseUser) {
      throw new Error('error sending message')
    }
  } catch (e) {
    return res.status(500).json({ message: 'Something Went Wrong' })
  }
  res.status(200).json({ message: 'successful' })
}

async function emailAdmin (body) {
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.ADMIN_EMAIL,
    subject: `contact form message from ${body.name}`,
    text: `${body.message}\n\t${body.email}`,
    html: `<p>${body.message}</p><p>from: ${body.email}</p>`
  }
  try {
    const response = await sgMail.send(msg)
    if (!response[0]?.statusCode?.toString().match(/^2\d\d$/)) {
      throw new Error('sendgrid error')
    }
    return true
  } catch (error) {
    console.error('error', error)
    return false
  }
}
async function emailUser (body) {
  const msg = {
    from: process.env.ADMIN_EMAIL,
    template_id: process.env.SENDGRID_CONTACT_FORM_REPLY_TEMPLATE_ID,
    personalizations: [
      {
        to: body.email,
        dynamic_template_data: {
          website_url: process.env.WEBSITE_URL,
          admin_phone: process.env.ADMIN_PHONE,
          client_name: body.name,
          admin_name: 'Franco',
          admin_role: 'Manager'
        }
      }
    ]
  }
  try {
    const response = await sgMail.send(msg)
    if (!response[0]?.statusCode?.toString().match(/^2\d\d$/)) {
      throw new Error('sendgrid error')
    }
    return true
  } catch (error) {
    console.error('error', error)
    return false
  }
}
