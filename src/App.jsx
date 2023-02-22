import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let storedList = localStorage.getItem('list');
  if (storedList) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'task cannot be empty');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'task updated successfully0');
    } else {
      showAlert(true, 'success', 'new task added successfully');
      const newItem = { id: new Date().getTime().toString(), title: name };
      console.log(newItem);
      setList([...list, newItem]);
      setName('');
    }
  };

  const handleEditSingleItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(specificItem.id);
    setName(specificItem.title);
  };

  const handleRemoveSingleItem = (id) => {
    showAlert(true, 'danger', 'task removed');
    setList(list.filter((item) => item.id !== id));
  };

  const handleClearAllItems = () => {
    showAlert(true, 'danger', 'cleared all tasks!');
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="toDo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>editable ToDo list</h3>
        <div className="form-control">
          <input
            className="toDo"
            type="text"
            placeholder="e.g. buy eggs"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="toDo-container">
          <List
            items={list}
            editItem={handleEditSingleItem}
            removeItem={handleRemoveSingleItem}
          />
          <button className="clear-btn" onClick={handleClearAllItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
