import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { createSampleAsync } from "./sampleSlice";
import { useNavigate } from 'react-router-dom';

export default function SampleCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const onSubmit = (data: any) => {
        dispatch(createSampleAsync(data) as any);
        navigate('/');
    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue=""  {...register("name", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
}