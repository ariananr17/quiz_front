import React from 'react'
import styles from './Modal.module.css'
import { deleteQuizById } from '../../services/apiService.js'
import { useNavigate, useParams } from 'react-router-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    border: '4px solid black',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    zIndex: 1000
    
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.31)',
  zIndex: 1000
}

export const Modal = ({ open, children, onClose }) => {
  const { id } = useParams()
  const navigate = useNavigate();
  if(!open) return null

  const onDelete = async (id) => {
    await deleteQuizById(id)
    navigate('/categories')
  }

  return (
    <>
    <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
      
      {children}
      <div className={styles.modalBtnContainer} >
        <button className={styles.modalBtn} onClick={() => onDelete(id)} >Delete</button>
        <button className={styles.modalBtn} onClick={onClose} >Close</button>
      </div>
      
      </div>
    </>
    
  )
}
