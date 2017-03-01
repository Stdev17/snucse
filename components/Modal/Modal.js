import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {cancelModal} from '../../actions/dispatchers';

// import style

const Modal = React.createClass({
  handleClickWrapper() {
    if (this.props.closable) {
      this.props.cancelModal();
    }
  },

  handleClickModal(event) {
    event.stopPropagation();
  },

  handleKeyDownInput(event) {
    if (this.props.closable) {
      if (event.keyCode === 27) {
        this.props.cancelModal();
      }
    }
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownInput);
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDownInput);
  },

  render() {
    const buttons = this.props.modalInfo.buttons.map((button, i) => {
      const handleClick = button.callback;
      return <button onClick={handleClick} key={`modal-button-${button.label}-${i}`}>{button.label}</button>;
    });
    const classes = classnames({
      modal: true,
      [`modal-${this.props.modalInfo.type}`]: Boolean(this.props.modalInfo.type)
    });
    return (
      <div className="modal-wrapper" onClick={this.handleClickWrapper}>
        <div className={classes} onClick={this.handleClickModal}>
          <h3>{this.props.modalInfo.title}</h3>
          <p>{this.props.modalInfo.message}</p>
          <ul className="button-wrapper">
            {buttons}
          </ul>
        </div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    modalInfo: state.modal.modalInfo,
    closable: state.modal.closable
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    cancelModal: () => cancelModal(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
