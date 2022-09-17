import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { fetchSamplesAsync, sampleSelectors, removeSampleAsync } from './sampleSlice'
import { Link } from 'react-router-dom'

export default function Sample() {
  const samples = useAppSelector(sampleSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector(state => state.sample)
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchSamplesAsync());
    }
  }, [loaded, dispatch])
   const removeSample = (sampleId : any) => {
    dispatch(removeSampleAsync(sampleId))
   }

  return (
    <div>
      {samples.map(sample =>
        <div key={sample.id}>
          <Link to={`/details/${sample.id}`}>{sample.name}</Link>
          -
          <Link to={`/edit/${sample.id}`}>Edit</Link>
          -
          <button onClick={() => removeSample(sample.id)}>Delete</button>
        </div>
      )}
    </div>
  )
}
