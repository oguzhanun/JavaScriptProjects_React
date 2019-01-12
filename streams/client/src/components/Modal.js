import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className='ui container'>
            <div onClick={props.onDismiss} className='ui dimmer modals visible active '></div>
            <div onClick={(e) => e.stopPropagation()} className='ui standart modal visible active'>
                <div className='header'>{props.header}</div>
                <div className='content'>{props.content}</div>
                <div className='actions'>
                    {props.actions}
                </div>
            </div>
        </div>,

        document.querySelector('#modal')
    );
}

export default Modal;