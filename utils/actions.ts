'use server'

import { redirect } from 'next/navigation'

const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us14',
})

export const addEmailSubscriber = async (formData: FormData) => {
  const email = formData.get('email')?.toString()

  try {
    await mailchimp.lists.addListMember('ad37179673', {
      email_address: email,
      status: 'subscribed',
    })
  } catch (error) {
    console.error(error)
  }

  redirect('/')
}
