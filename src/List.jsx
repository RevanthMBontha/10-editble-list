import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, editItem, removeItem }) => {
  return (
    <div className="toDo-container">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="toDo-item">
            <p className="title">{title}</p>
            <button
              className="edit-btn"
              type="button"
              onClick={() => editItem(id)}
            >
              <FaEdit />
            </button>
            <button
              className="delete-btn"
              type="button"
              onClick={() => removeItem(id)}
            >
              <FaTrash />
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default List;
