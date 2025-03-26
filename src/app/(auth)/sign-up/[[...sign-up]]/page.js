import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full pt-12 items-center justify-center'>
        <SignUp />
    </main>
  )
}

export default SignUpPage