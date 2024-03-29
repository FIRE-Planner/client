import { useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import EmailVerification from '@/components/views/signup/components/EmailVerification'
import SignUpForm from '@/components/views/signup/components/SignUpForm'
import { STEP, type Step } from '@/components/views/signup/constants'

export interface FormValues {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
}

const SignUp = () => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
  })

  const [step, setStep] = useState<Step>(STEP.SIGN_UP)

  return (
    <FormProvider {...methods}>
      {step === STEP.SIGN_UP && <SignUpForm setStep={setStep} />}
      {step === STEP.EMAIL_VERIFICATION && <EmailVerification />}
    </FormProvider>
  )
}

export default SignUp
