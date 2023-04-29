import { Fragment, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Dropdown } from 'react-bootstrap';

export default function HomePage() {
    return (
        <Fragment>
            <Helmet>
                <title>Notepad | Home</title>
            </Helmet>
            <div className="col-md-6 offset-md-3 mt-5">
                <Card className="text-dark bg-light">
                    <Card.Body>
                        <h1 className="mb-0 fw-bold">Bem-vindo ao Notepad!</h1>
                        <hr />
                        <h3 className="mb-0">Para criar uma anotação primeiro faça login ou crie uma conta.</h3>
                        <hr />
                        <img src="/bem-vindo.gif" alt="Notepad" />
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
    );
}