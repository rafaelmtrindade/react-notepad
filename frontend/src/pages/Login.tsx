import styles from './Login.module.css';

import { Fragment, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';

import { useUser } from '../hooks/useUser';

export default function LoginPage() {
  const { user, login } = useUser() ?? {};
  const navigate = useNavigate();
  const goBack = () =>
    window.history.length > 3 ? navigate(-1) : navigate('/notes');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!user) return;
    goBack();
  }, []);

  if (!login) return null;
  if (user) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;

    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) return;

    setLoading(true);
    setError(undefined);

    try {
      await login(email, password);
      navigate('/notes');
    } catch (err) {
      setError(err as object);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <Fragment>
      <Helmet>
        <title>Notepad | Login</title>
      </Helmet>
      <section className="col-md-5 offset-md-4 mt-5">
        <Card className="text-white bg-dark">
          <Card.Header>
            <h3 className="mb-0">Entrar</h3>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className=""
            >
              <Form.Group className="mb-3 mt-1" controlId="email">
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
                  Por favor, informe sua senha.
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
                  variant="outline-primary"
                  type="button"
                  className="btn-lg me-2"
                  onClick={() => navigate('/register')}
                >
                  Cadastre-se
                </Button>
                <Button variant="primary" type="submit" className="btn-lg">
                  Entrar
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </Fragment>
  );
}
