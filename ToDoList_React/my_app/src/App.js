import React, { Component } from "react";
import Title from "./components/Title";
import Search from "./components/Search";
import Sort from "./components/Sort";
import Form from "./components/Form";
import ListItem from "./components/ListItem";
import Items from "./mockdata/Items";
import "./../node_modules/sweetalert/dist/sweetalert.css";
import {orderBy as orderById} from 'lodash';
import Item from "./components/Item";
import ItemEdit from "./components/ItemEdit";
class App extends Component {
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
    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm,
        });
    };
    handleFormInputChange = (value) => {
        this.setState({
            valueItem: value,
        });
    };
    handleFormSelectChange = (value) => {
        this.setState({
            levelItem: value,
        });
    };
    handleFormClickCancel = () => {
        this.setState({
            valueItem: "",
            levelItem: 0,
        });
    };
    handleFormClickSubmit = () => {
        let { valueItem, levelItem } = this.state;
        if (valueItem.trim() === 0) return false;
        let newItem = {
            id: Math.floor(Math.random() * 100),
            name: valueItem,
            level: +levelItem,
        };
        Items.push(newItem);
        this.setState({
            items: Items,
            valueItem: "",
            levelItem: 0,
            showForm: false,
        });
    };
    handleSort=(sortType,sortOrder)=>{
        let {items} = this.state;
        this.setState({
            sortType: sortType,
            sortOrder: sortOrder
        });
        this.setState({
            items:orderById(items,[sortType],[sortOrder])
        });
    };
    renderItem = () => {
        let { items, idEdit, indexEdit, nameEdit, levelEdit, arrayLevel } =
            this.state;
        if (items.length === 0) {
            return <Item item={0} />;
        }
        return items.map((item, index) => {
            if (item.id === idEdit) {
                return (
                    <ItemEdit
                        key={index}
                        indexEdit={indexEdit}
                        nameEdit={nameEdit}
                        levelEdit={levelEdit}
                        arrayLevel={arrayLevel}
                        handleEditClickCancel={this.handleEditClickCancel}
                        handleEditInputChange={this.handleEditInputChange}
                        handleEditSelectChange={this.handleEditSelectChange}
                        handleEditClickSubmit={this.handleEditClickSubmit}
                    />
                );
            }
            return (
                <Item
                    key={index}
                    item={item}
                    index={index}
                    handleShowAlert={this.handleShowAlert}
                    handleEditItem={this.handleEditItem}
                />
            );
        });
    };
    render() {
        return (
            <div className="container">
                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort 
                            sortType={this.state.sortType}
                            sortOrder={this.state.sortOrder}
                            handleSort={this.handleSort}
                        />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button
                            type="button"
                            className="btn btn-info btn-block marginB10"
                            onClick={this.handleShowForm}
                        >
                            {this.state.showForm ? "Close Item" : "Add Item"}
                        </button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form
                            showForm={this.state.showForm}
                            arrayLevel={this.state.arrayLevel}
                            valueItem={this.state.valueItem}
                            handleFormInputChange={this.handleFormInputChange}
                            levelItem={this.state.levelItem}
                            handleFormSelectChange={this.handleFormSelectChange}
                            handleFormClickCancel={this.handleFormClickCancel}
                            handleFormClickSubmit={this.handleFormClickSubmit}
                        />
                    </div>
                </div>
                <ListItem 
                    renderItem={this.renderItem}
                />
            </div>
        );
    }
}

export default App;
