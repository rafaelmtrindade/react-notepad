import { Fragment, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';

export default function RegisterPage() {
    return (
        <Fragment>
            <Helmet>
                <title>Notepad | Register</title>
            </Helmet>
            <section className="col-md-5 offset-md-4 mt-5">
                <Card
                    className='text-white bg-dark'
                >
                    <Card.Header>
                        <h3 className="mb-0">Registrar</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form
                            noValidate
                            // validated={validated}
                            // onSubmit={}
                            className=""
                        >
                            <Form.Group className="mb-3 mt-1" controlId="email">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="name"
                                    placeholder="Digite seu nome completo"
                                    // onChange={}
                                    name="name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite seu nome.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-1" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Digite seu email"
                                    // onChange={}
                                    name="email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite seu email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Senha"
                                    className=''
                                    // onChange={}
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a senha.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Confirmar Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Confirmar Senha"
                                    className=''
                                    // onChange={}
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a senha.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* <Alert
                                variant="danger"
                                className={'mt-3 mb-0' + (!error ? ' d-none' : '')}
                            >
                                Usuário ou senha inválidos.
                            </Alert> */}
                            <Form.Group className="text-center mt-4">
                                <Button
                                    variant="success"
                                    type="submit"
                                    className='btn-lg w-100'
                                >
                                    Registrar
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </section>
        </Fragment>
    );
}

