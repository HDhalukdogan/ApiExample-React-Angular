import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { fetchSamplesAsync, sampleSelectors, removeSampleAsync } from './sampleSlice'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { SampleModel } from '../../app/models/SampleModel';

export default function Sample() {
  const samples = useAppSelector(sampleSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { loaded, error } = useAppSelector(state => state.sample)
  const [show, setShow] = useState(false);
  const [entity, setEntity] = useState<SampleModel | null>(null)
  const handleClose = () => {
    dispatch(removeSampleAsync(entity!.id))
    setShow(false);
  }
  const handleShow = (entity: any) => {
    setEntity(entity)
    setShow(true);
  }
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchSamplesAsync());
    }
  }, [loaded, dispatch])
if (error) {
  if (error.error.data === "test error") {
    return <h1>It is a test error.</h1>
  }
  return <h1>{error.error.data}</h1>
}
  return (
    <div className='container'>
      <Table striped>
        <thead>
          <tr>
            <th>Name </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {samples.map(entity => <tr key={entity.id}>
            <td><Link to={`/details/${entity.id}`}>{entity.name}</Link></td>
            <td><button className='btn btn-outline-primary' ><Link to={`/edit/${entity.id}`}>Edit</Link></button></td>
            <td><button className='btn btn-outline-danger' onClick={() => handleShow(entity)} >Delete</button></td>
          </tr>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete {entity?.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
