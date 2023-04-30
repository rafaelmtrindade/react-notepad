import {
  createContext,
  useState,
  useMemo,
  useContext,
  FC,
  PropsWithChildren,
} from 'react';
import useApi from './useApi';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type PostNote = Pick<Note, 'title' | 'content'>;
export type ListNote = Pick<Note, 'id' | 'title' | 'createdAt' | 'updatedAt'>;

interface INoteContext {
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
  notes: ListNote[] | [];
  getNotes: () => void;
  getNote: (id: number) => void;
  saveNote: (newNote: PostNote) => void;
  deleteNote: () => void;
}

const NoteContext = createContext<INoteContext | null>(null);

export const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<ListNote[]>([]);
  const fetchApi = useApi();

  const getNotes = async () => {
    try {
      const response = await fetchApi('/notes');
      const data = await response.json();

      if (!response.ok) throw data;
      (data as ListNote[]).sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();

        return dateA - dateB;
      });
      setNotes(data as ListNote[]);
    } catch (error) {
      console.error(error);
    }
  };

  const getNote = async (id: number) => {
    try {
      const response = await fetchApi(`/notes/${id}`);
      const data = await response.json();

      if (!response.ok) throw data;
      setNote(data as Note);
    } catch (error) {
      console.error(error);
    }
  };

  const postNote = async (newNote: PostNote) => {
    const response = await fetchApi('/notes', 'POST', { body: newNote });
    const data = await response.json();

    if (!response.ok) throw data;
    return data;
  };

  const putNote = async (newNote: PostNote) => {
    const response = await fetchApi(`/notes/${note?.id}`, 'PUT', {
      body: newNote,
    });
    const data = await response.json();

    if (!response.ok) throw data;
    return data;
  };

  const saveNote = async (newNote: PostNote) => {
    if (!newNote.title && !newNote.content) return;
    try {
      const data = note ? await putNote(newNote) : await postNote(newNote);
      setNote(data as Note);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    try {
      if (!note) throw new Error('Nenhuma nota selecionada');
      const response = await fetchApi(`/notes/${note.id}`, 'DELETE');

      if (response.ok) {
        return setNote(null);
      }
      const data = await response.json();
      throw data;
    } catch (error) {
      console.error(error);
    }
  };

  const value = useMemo(
    () => ({
      note,
      setNote,
      notes,
      getNotes,
      getNote,
      saveNote,
      deleteNote,
    }),
    [note, notes]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNote = () => {
  return useContext(NoteContext);
};
