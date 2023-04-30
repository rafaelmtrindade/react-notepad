import { useEffect } from 'react';
import { ListNote, useNote } from '../../hooks/useNote';
import { Nav, Button } from 'react-bootstrap';
import NoteListItem from './NoteListItem';
import { BsPlusSquareFill as BsPlus, BsPlusLg } from 'react-icons/bs';

export default function NotesList() {
  const { notes, getNotes, note, getNote, setNote } = useNote() ?? {};

  useEffect(() => {
    getNotes && getNotes();
  }, [note]);

  if (!getNotes || !getNote || !setNote) return null;

  const renderItems = (n: Pick<ListNote, 'id'> & { title?: string }) => {
    return (
      <NoteListItem
        key={n.id}
        title={n.title ?? `Sem titulo`}
        className={`${n.id === note?.id ? 'active' : ''} ps-2`}
        onClick={() => {
          if (n.id === note?.id) return;
          getNote(n.id);
        }}
      />
    );
  };

  return (
    <Nav className=" flex-column bg-dark px-3" style={{ width: '17%' }}>
      <Nav.Item className="mb-3">
        <span
          className="pb-3 mb-md-0 me-md-auto text-white fs-5 d-none d-sm-inline"
          style={{ userSelect: 'none' }}
        >
          Minhas Notas
        </span>
      </Nav.Item>
      <Nav.Item className="mb-3">
        <Button
          variant="outline-success"
          className="w-100 d-flex text-decoration-none align-items-center"
          onClick={() => setNote(null)}
        >
          <BsPlusLg className="me-2" />
          Nova nota
        </Button>
      </Nav.Item>
      {notes?.map(renderItems)}
    </Nav>
  );
}
