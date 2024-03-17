// import Card from "./Card";
// import Table from "./Table";
// import Less from './Less'
import { ListToDo } from "./components/form/FormL";
import { GlobalStyle } from "./GlobalStyle";
import data from "./db.json";

// import Clicker from "./Clicker";
import FormToDo from "./components/form/FormT";
// import { FormikApp } from "components/Formik/Formik";
import React, { Component } from "react";
import { nanoid } from "nanoid";
import ColorApp from "components/colorApp/ColorApp";
import Modal from "components/lesson/modal/Modal";
import { DataView } from "components/DataView/DataView";
const TextContent = () => {
    return (
        <>
            <h2>Hi Lore</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                blanditiis ipsam aliquam temporibus adipisci itaque possimus,
                mollitia aperiam nulla placeat ipsum repellat reprehenderit
                autem error nihil iure atque iste ullam.
            </p>
        </>
    );
};

export default class App extends Component {
    state = {
        list: data,
        agree: "",
        selectElement: "",
        loading: false,
        showModal: false,
    };

    componentDidMount() {
        this.setState({ loading: true });
        const data = localStorage.getItem("todo");
        const selectData = localStorage.getItem("selectElement");
        const parseData = JSON.parse(data);
        const selectDataElement = JSON.parse(selectData);
        if (selectDataElement) {
            this.setState({ selectElement: selectDataElement });
        }
        if (parseData) {
            this.setState({ list: parseData });
        }
        setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }
    componentDidUpdate(prevProps, prevState) {
        const { list } = this.state;
        if (prevState.list !== this.state.list) {
            localStorage.setItem("todo", JSON.stringify(list));
        }
    }

    handleAddItem = (item) => {
        console.log(item);
        this.setState((prevState) => ({
            list: [...prevState.list, { ...item, id: nanoid(), status: false }],
        }));
    };

    onSelected = (dataElement) => {
        this.setState({ selectElement: dataElement });
        localStorage.setItem("selectElement", JSON.stringify(dataElement));
    };

    hendleDeleteItem = (deleteID) => {
        this.setState(
            (prevState) => ({
                list: prevState.list.filter((item) => item.id !== deleteID),
            }),
            () => {
                console.log(this.state.selectElement.id, deleteID);
                if (this.state.selectElement.id === deleteID) {
                    this.setState({ selectElement: "" });
                    localStorage.removeItem("selectElement");
                }
            }
        );
    };
    togleModal = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    };
    render() {
        return (
            <>
                {/* <Less type={1}/> */}
                {/* <Card/>
            <Table/> */}
                <button onClick={this.togleModal} type="button">
                    Open
                </button>
                <FormToDo onAdd={this.handleAddItem} />
                {this.state.loading ? (
                    <p>Loading...</p>
                ) : (
                    <ListToDo
                        list={this.state.list}
                        onDelete={this.hendleDeleteItem}
                        onSelect={this.onSelected}
                    />
                )}

                <ColorApp />
                {/* <Clicker initialValue={10}/> */}
                <DataView DataSelect={this.state.selectElement} />
                <GlobalStyle />
                {/* <FormikApp/> */}
                {this.state.showModal && (
                    <Modal onClose={this.togleModal}>
                        <TextContent />
                    </Modal>
                )}
            </>
        );
    }
}
