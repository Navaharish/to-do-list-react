import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Content from './Components/Content'
import { useEffect, useRef, useState } from "react";
import AddItems from './Components/AddItems';
import SearchInput from './Components/SearchInput';


function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fecthError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef();

  const handleChecked = (id) => {
    const ListItem = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(ListItem)
  }

  const handleDelete = (id) => {
    const ListItem = items.filter(item => item.id !== id)
    setItems(ListItem)
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data is not recieved")
        console.log(response);
        const ListItems = await response.json();
        console.log(ListItems);
        setItems(ListItems)
        setFetchError(null)
      }
      catch (err) {
        setFetchError(err.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();

    }, 2000)
  }, [])

  const addList = (item) => {
    setNewItem('');
    const id = items.length ? items[items.length - 1].id + 1
      : 1;
    const additems = { id, checked: false, item }
    const ListItem = [...items, additems]
    setItems(ListItem)
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
    inputRef.current.focus()

  }

  return (
    <div className="App">
      <Header />
      <AddItems
        handleSubmit={handleSubmit}
        handleNewItem={handleNewItem}
        handleAddItem={handleAddItem}
        newItem={newItem}
        inputRef={inputRef}
      />
      <SearchInput
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}

      />
      <main>
        {fecthError && <p>Error : {fecthError}</p>}
        {isLoading && <p>items is Loading . .</p>}

        {!fecthError && !isLoading && <Content
          items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />}
      </main>


      <Footer />
    </div>
  );
}

export default App;
