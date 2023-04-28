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

type PostNote = Pick<Note, 'title' | 'content'>;
type ListNote = Pick<Note, 'id' | 'title' | 'createdAt' | 'updatedAt'>;

interface INoteContext {
  note: Note | null;
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

      if (response.ok) throw data;
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

  const saveNote = async (newNote: PostNote) => {
    try {
      let route: string;
      let method: 'POST' | 'PUT';
      if (note) {
        route = `/notes/${note.id}`;
        method = 'PUT';
      } else {
        route = '/notes';
        method = 'POST';
      }

      const response = await fetchApi(route, method, { body: newNote });
      const data = await response.json();

      if (!response.ok) throw data;

      setNote(data as Note);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async () => {
    try {
      if (!note) throw new Error('Nenhuma nota selecionada');
      const response = await fetchApi(`/notes/${note.id}`, 'DELETE');
      const data = await response.json();

      if (!response.ok) throw data;

      setNote(null);
    } catch (error) {
      console.error(error);
    }
  };

  const value = useMemo(
    () => ({
      note,
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
