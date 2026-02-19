import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { data, Link } from 'react-router-dom';


  const initialState = {
    email: '',
    password: '',
  };




function AuthLogin () {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault()

    dispatch(loginUser(formData)).then((data) => {
      console.log(data)
    })
  }

  return (
        <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Log into your account</h1>

          <p className='mt-2'>Don't have an account</p>
          <Link className='font-medium text-primary hover:underline ml-2' to='/auth/register'>Register</Link>

      </div>

            <CommonForm
              formControls={loginFormControls}
              buttonText={'Login'}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />


    </div>
  )
}

export default AuthLogin