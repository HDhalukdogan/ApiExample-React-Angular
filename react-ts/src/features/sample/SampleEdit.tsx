import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { fetchSampleAsync, sampleSelectors, updateSampleAsync } from "./sampleSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from "../../app/store/configureStore";

export default function SampleEdit() {
    const { id } = useParams<{ id: string }>();
    const sample = useAppSelector(state=> sampleSelectors.selectById(state,id!));
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!sample) {
            dispatch(fetchSampleAsync(parseInt(id!)) as any);
        }
    }, [id,sample,dispatch])
    const onSubmit = (data: any) => {
        dispatch(updateSampleAsync(data) as any);
        navigate('/');
    }
    if (!sample) {
        return <div>Loading...</div>
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue={sample.name}  {...register("name", { required: true })} />
            {/* errors will return when field validation fails  */}
            <input hidden defaultValue={sample.id}  {...register("id", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
}