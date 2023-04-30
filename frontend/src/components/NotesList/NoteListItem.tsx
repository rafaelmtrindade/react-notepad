import { NavItem, NavLink } from 'react-bootstrap';
import { ListNote } from '../../hooks/useNote';
import { Link } from 'react-router-dom';
import { FaRegStickyNote } from 'react-icons/fa';
import { MouseEventHandler } from 'react';

type NoteItemProps = Pick<ListNote, 'title'> & {
  onClick: MouseEventHandler;
  className: string;
};

export default function NoteListItem({
  title,
  onClick,
  className,
}: NoteItemProps) {
  return (
    <NavItem onClick={onClick}>
      <NavLink className={`align-middle px-0 ${className}`}>
        <FaRegStickyNote />{' '}
        <span className="ms-1 d-none d-sm-inline">{title}</span>
      </NavLink>
    </NavItem>
  );
}
