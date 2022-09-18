import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit =  async (data: any) => {
    console.log('data', data)
    await agent.Account.register(data).then(()=>console.log('created')).catch((error)=>console.log(error))
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input defaultValue="test"  {...register("name", { required: true })} />
      <input defaultValue="test@test.com"  {...register("email", { required: true })} />
      <input defaultValue="Pa$$w0rd"  {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
