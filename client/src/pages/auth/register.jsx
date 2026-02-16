
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName : '',
  email : '',
  password : ''
}

function AuthRegister () {

  const [formData, setFormData] = useState(initialState)



  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>

          <p className='mt-2'>Already have an account</p>
          <Link className='font-medium text-primary hover:underline ml-2' to='/auth/login'>Login</Link>

      </div>

            <CommonForm
            
            />

    </div>
  ) 
}

export default AuthRegister