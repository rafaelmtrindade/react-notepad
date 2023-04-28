import { Fragment, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default function NotesPage() {
    return (
        <Fragment>
            <Helmet>
                <title>Notepad | Notes</title>
            </Helmet>
            <section className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Notepad</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Anotação 1</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Anotação 2</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Anotação 3</span>
                                    </a>
                                </li>
                            </ul>
                            <hr />
                            <Dropdown
                                className="dropdown pb-4"
                            >
                                <DropdownToggle
                                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                    id="dropdownUser1"
                                    variant='dark'
                                >
                                    <img src="" alt="" width="30" height="30" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">Usuário</span>
                                </DropdownToggle>
                                <DropdownMenu
                                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                                >
                                    <DropdownItem><a className="dropdown-item" href="#">Nova anotação</a></DropdownItem>
                                    <DropdownItem><hr className="dropdown-divider" /></DropdownItem>
                                    <DropdownItem><a className="dropdown-item" style={{color:'red'}} href="#">Sair</a></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                        <div className="col py-3">
                            <h1>Anotação 1</h1>
                            <hr />
                            <p className="lead">
                                Lorem ipsu
                            </p>
                            <hr />
                        </div>
                </div>
            </section>
        </Fragment>
    )
}