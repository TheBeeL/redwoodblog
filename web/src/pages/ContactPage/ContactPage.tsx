import {
  Form,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Form onSubmit={onSubmit}>
        <label>Name</label>
        <TextField name="name" />
        <label>EMail</label>
        <TextField name="email" />
        <label>Message</label>
        <TextAreaField name="message" />

        <Submit>Send Messagge</Submit>
      </Form>
    </>
  )
}

export default ContactPage
