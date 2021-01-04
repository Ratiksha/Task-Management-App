
import React, { Component } from 'react';
import './Modal.scss'

export default class Card extends Component{
    
    render() {
        const { handleClose, show, children } = this.props
        return (
            <div className={`modal ${show ? "display-block" : "display-none"}`}>
            <section className="modal-main">
              {children}
              <button type="button" onClick={handleClose} className="grey">Cancle</button>
            </section>
          </div>
        )
    }
}