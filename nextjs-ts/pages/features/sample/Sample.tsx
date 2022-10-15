import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { fetchSamplesAsync } from './sampleSlice'

export default function Sample() {
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector(state => state.sample)

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchSamplesAsync());
    }
  }, [loaded, dispatch])

  return (
    <div className='container'>
    
    </div>
  )
}
