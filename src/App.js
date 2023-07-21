import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Content from './Components/Content'
import { useState } from "react";
import AddItems from './Components/AddItems';
import SearchInput from './Components/SearchInput';


function App() {
  const defaultItems = []
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list')) ?? defaultItems);

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const handleChecked = (id) => {
    const ListItem = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(ListItem)
    localStorage.setItem('todo_list', JSON.stringify(ListItem));
  }

  const handleDelete = (id) => {
    const ListItem = items.filter(item => item.id !== id)
    setItems(ListItem)
    localStorage.setItem("toDo-list", JSON.stringify(ListItem));
  }

  const addList = (item) => {
    setNewItem('');
    const id = items.length ? items[items.length - 1].id + 1
      : 1;
    const additems = { id, checked: false, item }
    const ListItem = [...items, additems]
    setItems(ListItem)
    localStorage.setItem("toDo-list", JSON.stringify(ListItem));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return "no list found";
    addList(newItem)

  }
  const handleNewItem = (e) => {
    setNewItem(e.target.value)
  }
  const handleAddItem = () => {
    if (!newItem) return;
    addList(newItem)
  }

  return (
    <div className="App">
      <Header />
      <AddItems
        handleSubmit={handleSubmit}
        handleNewItem={handleNewItem}
        handleAddItem={handleAddItem}
        newItem={newItem}
      />
      <SearchInput
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}

      />
      <Content
        items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
        handleChecked={handleChecked}
        handleDelete={handleDelete} />
      <Footer />
    </div>
  );
}

export default App;
