import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signInUser } from './accountSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    await dispatch(signInUser(data) as any);
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input defaultValue="test"  {...register("name", { required: true })} />
      <input defaultValue="Pa$$w0rd"  {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
