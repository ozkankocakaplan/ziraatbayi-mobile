import React, {Fragment, Component} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackHandler as RNBackHandler,
} from 'react-native';

import ModalContext from 'react-native-modals/src/components/ModalContext';
import Backdrop from 'react-native-modals/src/components/Backdrop';
import Animation from 'react-native-modals/src/animations/Animation';
import FadeAnimation from 'react-native-modals/src/animations/FadeAnimation';

const BackHandler = RNBackHandler;

const MODAL_OPENING = 'opening';
const MODAL_OPENED = 'opened';
const MODAL_CLOSING = 'closing';
const MODAL_CLOSED = 'closed';

const DEFAULT_ANIMATION_DURATION = 150;

const HARDWARE_BACK_PRESS_EVENT = 'hardwareBackPress';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
  round: {
    borderRadius: 8,
  },
  draggableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class BaseModal extends Component {
  static defaultProps = {
    rounded: true,
    modalTitle: null,
    visible: false,
    style: null,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    modalStyle: null,
    width: null,
    height: null,
    onTouchOutside: () => {},
    onHardwareBackPress: () => true,
    hasOverlay: true,
    overlayOpacity: 0.5,
    overlayPointerEvents: null,
    overlayBackgroundColor: 'transparent',
    onShow: () => {},
    onDismiss: () => {},
    footer: null,
    onMove: () => {},
    onSwiping: () => {},
    onSwipeRelease: () => {},
    onSwipingOut: () => {},
    useNativeDriver: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalAnimation:
        props.modalAnimation ||
        new FadeAnimation({
          animationDuration: props.animationDuration,
        }),
      modalState: MODAL_CLOSED,
    };

    this.backdrop = null;
    this.isSwipingOut = false;
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
    BackHandler.addEventListener(
      HARDWARE_BACK_PRESS_EVENT,
      this.onHardwareBackPress,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.show();
        return;
      }
      this.dismiss();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      HARDWARE_BACK_PRESS_EVENT,
      this.onHardwareBackPress,
    );
  }

  onHardwareBackPress = () => {
    return this.props.onHardwareBackPress();
  };

  get modalSize() {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    let {width, height} = this.props;
    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth;
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight;
    }
    return {width, height};
  }

  show() {
    this.setState({modalState: MODAL_OPENING}, () => {
      this.state.modalAnimation.in(() => {
        this.setState({modalState: MODAL_OPENED}, this.props.onShow);
      });
    });
  }

  dismiss() {
    this.setState({modalState: MODAL_CLOSING}, () => {
      if (this.isSwipingOut) {
        this.setState({modalState: MODAL_CLOSED}, this.props.onDismiss);
        return;
      }
      this.state.modalAnimation.out(() => {
        this.setState({modalState: MODAL_CLOSED}, this.props.onDismiss);
      });
    });
  }

  render() {
    const {modalState, modalAnimation} = this.state;
    const {
      rounded,
      modalTitle,
      children,
      onTouchOutside,
      hasOverlay,
      modalStyle,
      animationDuration,
      overlayOpacity,
      useNativeDriver,
      overlayBackgroundColor,
      style,
      footer,
    } = this.props;

    const overlayVisible =
      hasOverlay && [MODAL_OPENING, MODAL_OPENED].includes(modalState);
    const round = rounded ? styles.round : null;
    const hidden = modalState === MODAL_CLOSED && styles.hidden;

    return (
      <ModalContext.Provider
        value={{
          hasTitle: Boolean(modalTitle),
          hasFooter: Boolean(footer),
        }}>
        <View style={[styles.container, hidden]}>
          <View style={StyleSheet.flatten([styles.draggableView, style])}>
            <Fragment>
              <Backdrop
                ref={ref => {
                  this.backdrop = ref;
                }}
                pointerEvents={this.props.overlayPointerEvents || 'auto'}
                visible={overlayVisible}
                onPress={onTouchOutside}
                backgroundColor={overlayBackgroundColor}
                opacity={overlayOpacity}
                animationDuration={animationDuration}
                useNativeDriver={useNativeDriver}
              />
              <Animated.View>
                <Animated.View
                  style={[
                    styles.modal,
                    round,
                    this.modalSize,
                    modalStyle,
                    modalAnimation.getAnimations(),
                  ]}>
                  {modalTitle}
                  {children}
                  {footer}
                </Animated.View>
              </Animated.View>
            </Fragment>
          </View>
        </View>
      </ModalContext.Provider>
    );
  }
}

export default BaseModal;
