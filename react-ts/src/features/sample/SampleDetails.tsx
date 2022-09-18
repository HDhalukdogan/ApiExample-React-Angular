import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { fetchSampleAsync, sampleSelectors } from './sampleSlice'
import { useParams } from 'react-router'

export default function SampleDetails() {
  const { id } = useParams<{ id: string }>();
  const sample = useAppSelector(state => sampleSelectors.selectById(state, id!));
  const dispatch = useAppDispatch();
  //const {loaded} = useAppSelector(state=>state.sample)
  useEffect(() => {
    if (!sample) {
      dispatch(fetchSampleAsync(parseInt(id!)));
    }
  }, [id, sample, dispatch])

  return (
    <div className='card'>
      <div className=' d-flex justify-content-center'><h1>{sample && sample.name}</h1></div>
    </div>
  )
}