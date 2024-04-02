// import Card from "./Card";
// import Table from "./Table";
// import Less from './Less'
import { ListToDo } from "./components/form/FormL";
import { GlobalStyle } from "./GlobalStyle";

// import Clicker from "./Clicker";
import FormToDo from "./components/form/FormT";
// import { FormikApp } from "components/Formik/Formik";
import React, { Component } from "react";
import ColorApp from "components/colorApp/ColorApp";
import Modal from "components/lesson/modal/Modal";
import { DataView } from "components/DataView/DataView";
import {
    ButtonForDelFalse,
    ButtonForDelTrue,
} from "components/lesson/modal/Modal.styled";
import axios from "axios";
import { createToDo, delToDo, fetchToDo } from "api";
import { Loader } from "components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import SortForm from "components/sort/SortForm";

const BtnContent = ({ appMethod, toggle }) => {
    return (
        <>
            <h1>Are you serious?</h1>
            <ButtonForDelTrue onClick={() => appMethod()}>
                True
            </ButtonForDelTrue>
            <ButtonForDelFalse onClick={() => toggle()}>
                False
            </ButtonForDelFalse>
        </>
    );
};
// let newList = [];
export default class App extends Component {
    state = {
        list: [],
        newList: [],
        agree: "",
        selectElement: "",
        loading: false,
        showModal: false,
        deleteEl: false,
        deleteID: -1,
        error: null,
        filters: {
            textSort: "",
            levelSort: 0,
        },
    };

    dataChanges = (method, url, data) => {
        return axios({
            method: method,
            url: url,
            data: data,
        }).catch((error) => console.log("error: ", error.message));
    };

    // dataPost = (dataElement) => {

    //     // this.dataChanges("post", BASE_URL, dataElement).then((task) => {
    //     //     this.setState((prevState) => ({
    //     //         ...prevState,
    //     //         list: [...prevState.list, task.data],
    //     //     }));
    //     // })
    //     // .catch((error) => console.log("error: ", error.message));

    //     // fetch(BASE_URL, {
    //     //     method: "POST",
    //     //     headers: { "content-type": "application/json" },
    //     //     body: JSON.stringify(dataElement),
    //     // })
    //     //     .then((res) => {
    //     //         if (res.ok) {
    //     //             return res.json();
    //     //         }
    //     //     })
    //     //     .then((task) => {
    //     //         this.setState((prevState) => ({
    //     //             ...prevState,
    //     //             list: [...prevState.list, task],
    //     //         }));
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error);
    //     //     });
    // };
    dataDelete = async (deleteId) => {
        // this.dataChanges("delete", `${BASE_URL}/${deleteId}`).then((task) => {
        //     this.setState((prevState) => ({
        //         list: prevState.list.filter((item) => item.id !== task.data.id),
        //     }));
        // });
        try {
            this.setState({ error: null });
            const deleteToDo = await delToDo(deleteId);
            this.setState(
                (prevState) => ({
                    list: prevState.list.filter(
                        (item) => item.id !== deleteToDo.id
                    ),
                }),
                () => {
                    this.handleSortItem(this.state.filters);
                }
            );
            console.log(this.state.list);
            toast.success("Delete succes");
        } catch (error) {
            toast.error("Delete error");
            this.setState({ error: error });
        }

        if (this.state.selectElement.id === deleteId) {
            this.setState({ selectElement: "" });
            localStorage.removeItem("selectElement");
        }

        if (this.state.showModal === true) {
            this.setState({ showModal: false });
        }
    };

    async componentDidMount() {
        this.setState({ loading: true, error: null });
        try {
            const res = await fetchToDo();
            this.setState({ list: res });
            this.setState({ newList: res });
        } catch (error) {
            this.setState({ error: error });
        } finally {
            this.setState({ loading: false });
        }

        // fetch(BASE_URL)
        //     .then((response) => response.json())
        //     .then((data) => {
        // this.setState({ list: data });
        //     })
        //     .catch((error) => console.log({ error }));

        // const data = localStorage.getItem("todo");
        const selectData = localStorage.getItem("selectElement");
        // const parseData = JSON.parse(data);
        const selectDataElement = JSON.parse(selectData);
        if (selectDataElement) {
            this.setState({ selectElement: selectDataElement });
        }
        // if (parseData) {
        //     this.setState({ list: parseData });
        // }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.list !== this.state.list) {
            this.setState({ loading: false });
        }
        // const { list } = this.state;
        // if (prevState.list !== this.state.list) {
        //     localStorage.setItem("todo", JSON.stringify(list));
        // }
    }
    supportDelMethod = () => {
        this.dataDelete(this.state.deleteID);
    };
    handleAddItem = async (item) => {
        try {
            this.setState({ loading: true, error: null });
            const addTodo = await createToDo(item);
            await this.setState(
                (prevState) => ({
                    list: [...prevState.list, addTodo],
                }),
                () => {
                    this.handleSortItem(this.state.filters);
                }
            );
            toast.success("Add succes");
        } catch (error) {
            toast.error("Add error");
            this.setState({ error: error });
        } finally {
            this.setState({ loading: false });
        }

        // this.dataPost({
        //     title: item.title,
        //     description: item.description,
        //     level: item.level,
        //     status: false,
        // });
    };
    sortByLvl = async (lvl) => {
        this.setState({ loading: true });

        this.setState(() => ({
            newList: this.state.list.filter(
                (item) => String(item.level) === String(lvl)
            ),
            loading: false,
        }));
    };
    sortByText = async (text) => {
        this.setState({ loading: true });
        this.setState(() => ({
          newList: this.state.list.filter(
            (item) =>
              item.title.toLowerCase().includes(text.toLowerCase()) ||
              item.description.toLowerCase().includes(text)
          ),
          loading: false,
        }));
      };

    reSort = async () => {
        this.setState({ newList: this.state.list });
    };
    sortChange = async (values) => {
        console.log("change");

        this.setState({
            filters: { textSort: values.textSort, levelSort: values.levelSort },
        });
        this.handleSortItem(values);
    };
    handleSortItem = async (values) => {
        if (values.textSort !== "") {
          this.sortByText(values.textSort, values.levelSort);
        } else if (values.levelSort !== "0") {
          this.sortByLvl(values.levelSort);
        } else {
          this.reSort();
        }
      };

    onSelected = (e, dataElement) => {
        if (e.target.nodeName !== "BUTTON") {
            this.setState({ selectElement: dataElement });
            localStorage.setItem("selectElement", JSON.stringify(dataElement));
        } else return;
    };
    hendleDeleteItem = (deleteID) => {
        this.setState({ deleteID: deleteID });
        this.togleModal();
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
                <SortForm onSort={this.sortChange} />
                {this.state.loading && <Loader />}
                {this.state.list.length > 0 && (
                    <ListToDo
                        list={this.state.newList}
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
                        <BtnContent
                            appMethod={this.supportDelMethod}
                            toggle={this.togleModal}
                        />
                    </Modal>
                )}
                <Toaster />
            </>
        );
    }
}
