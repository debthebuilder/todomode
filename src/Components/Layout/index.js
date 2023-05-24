import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Layout.css";
import logo from "../../Assets/images/logo.svg";
import { Icon } from '@iconify/react';
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Form } from "../Form";
export const Layout = ({children, activeTab, title, today, important, completed, uncompleted, all, categories}) => {
    const [close, setClose] = useState(false);
    const [modal, setModal] = useState(false);
    
    return(
        <div className="layout">
            {!close ?
                <div className="sidebar">
                    <div className="sideLogo">
                        <Link to={'/dashboard'} >
                            <img src={logo} alt="Todo Logo" width={100} />  
                        </Link>
                    </div>
                    
                    <ul className="menu">
                        <button className={`menu-item ${activeTab === 0 ? "active" : ""}`} onClick={today}>Today's Tasks</button>
                        <button className={`menu-item ${activeTab === 1 ? "active" : ""}`} onClick={important}>Important Tasks</button>
                        <button className={`menu-item ${activeTab === 2 ? "active" : ""}`} onClick={completed}>Completed Tasks</button>
                        <button className={`menu-item ${activeTab === 3 ? "active" : ""}`} onClick={uncompleted}>Uncompleted Tasks</button>
                        <button className={`menu-item ${activeTab === 4 ? "active" : ""}`} onClick={all}>All Tasks</button>
                        <button className={`menu-item ${activeTab === 5 ? "active" : ""}`} onClick={categories}>Categories</button>
                    </ul>

                    <ul className="menu-bottom">
                        <button className="menu-item">Log Out</button>
                    </ul>
                </div>
            : null}
            <div className={`main ${close ? 'ml-0' : 'ml-200'}`}>
                <header className="header">
                    <h1>Hello Debs</h1>
                    <div>
                        <button onClick={() => setClose(!close)}><Icon icon="ri:menu-3-fill" width={28} className="menu-icon" /></button>
                    </div>
                </header>
                
                <div className="flex-between mb-20">
                <h2>{title}</h2>
                    <Button handleClick={() => { setModal(true)}} label={"Add Task"} />
                </div>
                <div>
                {children}   
                </div>
            </div>
            <Modal
          show={modal}
          close={() => {
            setModal(false);
          }}>
          <Form.Container>
            <h1>Create New Task</h1>
            <Form.Label labelFor={"task"} title="Task" />
            <Form.Input
            type={"text"}
            name={"task"}
            placeholder={"Enter task here"}
             />
            <Form.Label labelFor={"due-date"} title="Due Date" />
            <Form.Input
            type={"date"}
            name={"due-date"}
            />
             <Form.Label labelFor={"priority"} title="Priority" />
             <div className="flex-between input">
                <div className="flex">
                    <input type="radio" name="priority"/>
                    <label className="ml-10">Important</label>
                </div>
                <div className="flex">
                    <input type="radio" name="priority"/>
                    <label className="ml-10">High</label>
                </div>
                <div className="flex">
                    <input type="radio" name="priority"/>
                    <label className="ml-10">Low</label>
                </div>
             </div>
             
             <Form.Label labelFor={"category"} title="Category" />
            <Form.Select>
                <option>Select Category</option>
                <option value={"Family"}>Family</option>
            </Form.Select>
             
             <Button type={"submit"} handleClick={""} label={"Add Task"} />
          </Form.Container>
            </Modal>
        </div>
    )
}