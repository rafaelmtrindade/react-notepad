import { Fragment, useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

import { useUser, PostUser } from '../hooks/useUser';

export default function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const { postUser } = useUser() ?? {};
  const navigate = useNavigate();

  if (!postUser) return null;

  const goBack = () =>
    window.history.length > 3 ? navigate(-1) : navigate('/');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;

    const form = event.currentTarget;
    if (form.checkValidity() === false) return setValidated(true);

    setLoading(true);
    setError(undefined);

    try {
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries()) as PostUser;

      await postUser(payload);
      return navigate('/notes');
    } catch (error) {
      setError(error as object);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Notepad | Cadastre-se</title>
      </Helmet>
      <section className="col-md-5 offset-md-4 mt-5">
        <Card className="text-white bg-dark">
          <Card.Header>
            <h3 className="mb-0">Cadastrar-se</h3>
            <span style={{ color: 'red' }}>
              Não informe dados reais! Esse aplicativo não tem um meio de
              excluir seu cadastro!
            </span>
            {/* TODO: implementar alteração/exclusão de usuário */}
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-1" controlId="email">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Exemplo: Fulano de Tal"
                  pattern="^[a-zA-Z]{3,}([a-zA-Z ])*$"
                  // onChange={}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  O nome deve conter pelo menos três letras.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 mt-1" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Exemplo: fulano@exemplo.com"
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
                  placeholder="Digite uma senha"
                  pattern="^[a-zA-Z0-9]{2,}$"
                  className=""
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe uma senha com pelo menos 2 caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>Confirme a senha</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Repita a senha"
                  className=""
                  pattern={password}
                  // onChange={}
                  name="confirmPassword"
                />
                <Form.Control.Feedback type="invalid">
                  As senhas não conferem.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="text-center mt-5 d-flex justify-content-between">
                <Button
                  variant="outline-primary"
                  type="button"
                  className="btn-lg"
                  onClick={goBack}
                >
                  Voltar
                </Button>
                <Button variant="primary" type="submit" className="btn-lg">
                  Enviar
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </Fragment>
  );
}
