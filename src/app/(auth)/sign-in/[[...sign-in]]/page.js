import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className='flex h-screen w-full pt-12 items-center justify-center'>
        <SignIn />
    </main>
  )
}

export default SignInPage