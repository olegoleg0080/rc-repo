import styled from "styled-components";

export const ModalBG = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWindow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70vh;
    height: 50vh;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    text-align: center;
`;

export const BtnClose = styled.button`
    position: absolute;
    top: 20%;
    right: 20px;
    width: 20px;
    height: 20px;
    background-color: #000;
`;
