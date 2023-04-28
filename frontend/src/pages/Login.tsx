import styles from './Login.module.css';

import { Fragment, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

import { useUser } from '../hooks/useUser';

export default function LoginPage() {
  const { login } = useUser() ?? {};
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  if (!login) return null;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) return;

    setLoading(true);
    setError(undefined);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err as object);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <Fragment>
      <Helmet>
        <title>Notepad | Login</title>
      </Helmet>
      {/* TODO: formatar formulário */}
      <section className="container d-flex flex-column justify-content-around p-4">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="px-3"
        >
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Digite seu email"
              onChange={handleEmail}
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
              className={styles['no-validate']}
              onChange={handlePassword}
              name="password"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a senha.
            </Form.Control.Feedback>
          </Form.Group>
          <Alert
            variant="danger"
            className={'mt-3 mb-0' + (!error ? ' d-none' : '')}
          >
            Usuário ou senha inválidos.
          </Alert>
          <Form.Group className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              className={styles['btn-login']}
            >
              Entrar
            </Button>
          </Form.Group>
        </Form>
      </section>
    </Fragment>
  );
}