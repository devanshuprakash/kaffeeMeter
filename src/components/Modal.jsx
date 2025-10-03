import ReactDOM from 'react-dom'

export default function Modal(props) {
  const { children, handleCloseModal } = props   // ✅ corrected spelling

  return ReactDOM.createPortal(
    <div className='modal-container'>
      <button onClick={handleCloseModal} className='modal-underlay' />
      <div className='modal-content'>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

