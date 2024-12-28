import React from 'react';
import {ModalPortal} from 'react-native-modals';
import BaseModal from './BaseModal';

class ModalPortals extends ModalPortal {
  renderModal = ({type = 'modal', key, ...props}) => {
    return (
      <BaseModal
        key={key}
        {...props}
        onDismiss={() => this.dismissHandler(key)}
      />
    );
  };
}

export default ModalPortals;
