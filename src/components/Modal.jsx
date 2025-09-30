import ReactDOM from 'react-dom'



export default function Modal(props) {
    const { children, handleClsoeModal } = props
    return ReactDOM.createPortal(
        <div className='modal-container'>
            <button onClick={handleClsoeModal} className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}
