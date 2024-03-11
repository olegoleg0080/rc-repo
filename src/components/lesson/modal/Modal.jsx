import { Component } from "react";
import { BtnClose, ModalBG, ModalWindow } from "./Modal.styled";

class Modal extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.handleEsc);
    }
    componentWillUnmount() {
        window.addEventListener("keydown", this.handleEsc);
    }
    handleEsc = (e) => {
        if (e.code === "Escape") {
            this.props.onClose();
        }
    };
    handleClickBG = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };
    render() {
        const { children, onClose } = this.props;
        return (
            <ModalBG onClick={this.handleClickBG}>
                <ModalWindow>
                    {children}
                    <BtnClose onClick={onClose} />
                </ModalWindow>
            </ModalBG>
        );
    }
}

export default Modal;
