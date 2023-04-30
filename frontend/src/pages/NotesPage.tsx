import { Helmet } from 'react-helmet';

import NoteForm from '../components/NoteForm/NoteForm';
import { NoteProvider } from '../hooks/useNote';

import NotesList from '../components/NotesList/NotesList';

export default function NotesPage() {
  return (
    <NoteProvider>
      <Helmet>
        <title>Notepad | Minhas Notas</title>
      </Helmet>
      <section className="d-flex flex-nowrap justify-content-between min-vh-100">
        <NotesList />
        <NoteForm />
      </section>
    </NoteProvider>
  );
}
