import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Content from './Components/Content'
import { useEffect, useRef, useState } from "react";
import AddItems from './Components/AddItems';
import SearchInput from './Components/SearchInput';
import ApiRequest from './Components/ApiRequest';


function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fecthError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef();

  const handleChecked = async (id) => {
    const ListItem = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(ListItem)

    const checkItem = ListItem.filter((item) => item.id === id)
    const updateObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: checkItem[0].checked })
    }
    const urlReq = `${API_URL}/${id}`
    const result = await ApiRequest(urlReq, updateObj)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const ListItem = items.filter(item => item.id !== id)
    setItems(ListItem)
    const deleteObj = {
      method: 'DELETE'
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await ApiRequest(reqUrl, deleteObj)
    if (result) setFetchError(result)
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

  const addList = async (item) => {
    setNewItem('');
    const id = items.length ? items[items.length - 1].id + 1
      : 1;
    const additems = { id, checked: false, item }
    const ListItem = [...items, additems]
    setItems(ListItem)

    //api create 
    const postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(additems),
    };
    const result = await ApiRequest(API_URL, postOption)
    if (result) setFetchError(result);

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
