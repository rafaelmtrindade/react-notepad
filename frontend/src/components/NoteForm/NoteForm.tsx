import { Form, Button } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { RiSave3Fill } from 'react-icons/ri';

import { useNote } from '../../hooks/useNote';
import { useState, useEffect } from 'react';

export default function NoteForm() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [loading, setLoading] = useState(false);

  const { note, deleteNote, saveNote, getNotes } = useNote() ?? {};

  useEffect(() => {
    if (note) {
      console.log(noteTitle, noteContent);
      setNoteTitle(note.title);
      setNoteContent(note.content);
    } else {
      setNoteTitle('');
      setNoteContent('');
    }
  }, [note]);

  if (!deleteNote || !saveNote || !getNotes) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);
    const noteToSave = { title: noteTitle, content: noteContent };

    try {
      await saveNote(noteToSave);
      await getNotes();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="px-3 d-flex flex-column justify-content-between flex-grow-1"
      onSubmit={handleSubmit}
    >
      <Form.Group
        controlId="title"
        className="d-flex justify-content-between pt-3"
      >
        <Form.Control
          type="text"
          autoFocus={true}
          placeholder="Título"
          name="title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        {note && (
          <Button
            variant="danger"
            className="ms-2 px-2 d-flex align-items-center"
            onClick={async () => {
              if (!window.confirm('Tem certeza que deseja excluir essa nota?'))
                return;
              await deleteNote();
              await getNotes();
            }}
          >
            <BsFillTrashFill className="me-2" />
            Excluir
          </Button>
        )}
      </Form.Group>
      <hr />
      <Form.Group className="d-flex flex-grow-1 mt-1" controlId="content">
        <Form.Control
          style={{ resize: 'none', overflow: 'auto' }}
          as="textarea"
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
          }}
          name="content"
        />
      </Form.Group>
      <hr />
      <Form.Group className="d-flex justify-content-end mb-3">
        <Button
          className="me-2"
          variant="success"
          type="submit"
          disabled={!noteTitle && !noteContent}
        >
          <RiSave3Fill className="me-2 mb-1" />
          Salvar
        </Button>
      </Form.Group>
    </Form>
  );
}
