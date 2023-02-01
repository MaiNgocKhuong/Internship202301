import React, { Component } from "react";
import Items from "../mockdata/Items";
import SweetAlert from "sweetalert-react";
import "./../../node_modules/sweetalert/dist/sweetalert.css";

class ListItem extends Component {
    constructor(props) {
        super(props);
        let arrayLevel = [];
        if (Items.length > 0) {
            for (let i = 0; i < Items.length; i++) {
                if (arrayLevel.indexOf(Items[i].level) === -1) {
                    arrayLevel.push(Items[i].level);
                }
            }
        }
        arrayLevel.sort(function (a, b) {
            return a - b;
        });
        this.state = {
            items: Items,
            showAlert: false,
            titleAlert: "",
            idAlert: "",
            indexEdit: 0,
            idEdit: "",
            nameEdit: "",
            levelEdit: 0,
            arrayLevel: arrayLevel,
            showForm: false,
            valueItem: "",
            levelItem: 0,
            sortType: '',
            sortOrder: ''
        };
    }
    handleShowAlert = (item) => {
        this.setState({
            showAlert: true,
            titleAlert: item.name,
            idAlert: item.id,
        });
    };
    handleEditItem = (index, item) => {
        this.setState({
            indexEdit: index,
            idEdit: item.id,
            nameEdit: item.name,
            levelEdit: item.level,
        });
    };
    handleDeleteItem = () => {
        let { idAlert, items } = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === idAlert) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false,
        });
    };
    handleEditClickCancel = () => {
        this.setState({
            idEdit: "",
        });
    };
    handleEditInputChange = (value) => {
        this.setState({
            nameEdit: value,
        });
    };
    handleEditSelectChange = (value) => {
        this.setState({
            levelEdit: value,
        });
    };
    handleEditClickSubmit = () => {
        let { items, idEdit, nameEdit, levelEdit } = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === idEdit) {
                    items[i].name = nameEdit;
                    items[i].level = +levelEdit;
                    break;
                }
            }
        }
        this.setState({
            idEdit: "",
        });
    };

    render() {
        return (
            <div className="panel panel-success">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete Item"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={() => this.setState({ showAlert: false })}
                    onEscapeKey={() => this.setState({ showAlert: false })}
                    onCancel={() => this.setState({ showAlert: false })}
                    onConfirm={() => this.handleDeleteItem()}
                />
                <div className="panel-heading">List Item</div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th
                                style={{ width: "10%" }}
                                className="text-center"
                            >
                                #
                            </th>
                            <th>Name</th>
                            <th
                                style={{ width: "15%" }}
                                className="text-center"
                            >
                                Level
                            </th>
                            <th style={{ width: "15%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.props.renderItem()}</tbody>
                </table>
            </div>
        );
    }
}
export default ListItem;
