import React, {useState, useEffect} from 'react'
import axios from "axios"
import { nanoid } from "nanoid"
import { userId } from './Login'
import { getDate, getDay, getMonth, greeting } from '../utils/today_info'
import Header from './Header'
import Confetti from './Confetti'

let userLists = []
const UserList = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        name: "",
        password: "",
        list: []
    })
    const [showList, setShowList] = useState({})
    const [searchList, setSearchList] = useState("")
    const [lists, setLists] = useState([])
    const [greet, setGreet] = useState("")
    const [day, setDay] = useState("")
    const [date, setDate] = useState("")
    const [month, setMonth] = useState("")
    const [id, setId] = useState(userId)
    const [addNew, setAddNew] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [edit, setEdit] = useState(false)
    const [tempListId, setTempListId] = useState("")
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDescription, setEditedDescription] = useState("")
    const [emptyList, setEmptyList] = useState(true)
    const [done, setDone] = useState(false)
    const [starred, setStarred] = useState(false)
    const [doneList, setDoneList] = useState([])
    const [starredList, setStarredList] = useState([])
    const [confetti, setConfetti] = useState(false)

    const getUsers = async() => {
        const response = await axios.get("https://mighty-gold-production.up.railway.app/users")
        setUsers(response.data)
        console.log("getting data is triggered")
        console.log(response.data)
    }
    
    const getUser = (id) => {
        users.map(user => {
            if (user._id === id){
                setUser(user)
                setLists([...user.lists])
                userLists = [...user.lists]
            }
        })

        const done = lists.filter((list) => list.isDone === true)
        const starred = lists.filter((list) => list.isStarred === true)    

        setStarredList(starred);
        setDoneList(done)

        if(lists.length === 0){
            setEmptyList(true)
        } else setEmptyList(false)
    }

    const deleteUser = async (id, idList) => {
        const newUserList = lists.filter(list => (list._id !== idList))
        try {
        await axios.patch(`https://mighty-gold-production.up.railway.app/users/${id}`, {
            name: user.name, 
            password: user.password, 
            lists: newUserList
        })
        getUsers()
        } catch (error){
            console.log(error);
        }
    }
    
    const addNewList = async (e) => {
        e.preventDefault()
        setNewTitle("")
        setNewDescription("")
        setAddNew(false)

        const newUserLists = [...lists, {
                title: newTitle,
                description: newDescription,
            }
        ]
        try {
            await axios.patch(`https://mighty-gold-production.up.railway.app/users/${id}`, {
                name: user.name, 
                password: user.password, 
                lists: newUserLists
        })
        getUsers()
        } catch (error){
            console.log(error);
        }
    }

    const editList = (id) => {
        setEdit(true)
        lists.map(list => {
            if(list._id === id){
                setEditedTitle(list.title)
                setEditedDescription(list.description)
                setTempListId(id)
            }
        })
    }

    const searchItem = (value) => {
        let count = 0
        lists.forEach((list) => {
            if (!list.isDone){
                if (list.title.toLowerCase() === value.toLowerCase()){
                    count += 1
                    setShowList(list)
                }
            }
        })

        if (!count){
            setShowList({})
        }
    }

    const submitEdit = async () => {
        setEdit(false)
        let editedList = {}

        setTimeout(() => {
            setConfetti(false)
        }, 7000);
        
        const newList = [...lists]

        newList.forEach((list, i) => {
            if (list._id === tempListId) {
                if (done) {
                    editedList = {title: editedTitle, description: editedDescription, isDone: true, isStarred: false}
                } else if (starred) {
                    editedList = {title: editedTitle, description: editedDescription, isDone: list.isDone, isStarred: true}
                } else {
                    editedList = {title: editedTitle, description: editedDescription, isDone: list.isDone, isStarred: list.isStarred}
                }
                newList[i] = editedList
            }
        })

        setDone(false)
        setStarred(false)

        try {
            await axios.patch(`https://mighty-gold-production.up.railway.app/users/${id}`, {
                name: user.name, 
                password: user.password, 
                lists: [...newList]
        })
        getUsers()
        } catch (error){
            console.log(error);
        }
    
        setNewTitle("")
        setNewDescription("")
    }

    const signDone = async (listId) => {
        const newList = [...lists]

        for (let i = 0; i < newList.length; i++){
            if (newList[i]._id === listId){
                newList[i] = {...newList[i], isDone: true, isStarred: false}
            }
        }

        try {
            await axios.patch(`https://mighty-gold-production.up.railway.app/users/${id}`, {
                name: user.name, 
                password: user.password, 
                lists: [...newList]
        })
        getUsers()
        } catch (error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        getUsers()
        setGreet(greeting())
        setDay(getDay())
        setMonth(getMonth())
        setDate(getDate())
        console.log(users)
    }, [])

    useEffect(() => {
        const done = lists.filter((list) => list.isDone === true)
        setDoneList(done)
    }, [confetti])

    useEffect(() => {
        getUser(id)
    }, [users])   

    return (
        <div className="list-container">
            {confetti? <Confetti /> : <div></div>}
            <header>
                <Header 
                    greet = {greet}
                    username = {user.name.split(" ")[0]}
                    day = {day}
                    date = {date}
                    month = {month}
                />
            </header> 
            <div className="search-list">
                <input 
                    type="text" 
                    placeholder='search your list here'
                    value={searchList}
                    onChange={(e) => {
                        setSearchList(e.target.value)
                        searchItem(searchList)
                    }}
                />
                {showList.title !== undefined ? 
                    <div>
                        <div className="searched-card card">
                            <div className="card-title">
                            <h3>{showList.title}</h3>
                            {showList.description ? <hr className='underline'/> : <></>}
                            </div>
                            <p>{showList.description}</p>
                        </div>
                    </div>
                    : 
                    <div></div>
                }
            </div>
            <div className="starred side">
                <h3>Starred Task</h3>
                {starredList.length === 0 ? 
                    <div className="side-empty">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :
                    <div>
                        <ul>
                        {lists.map((list) => {
                            if (list.isStarred){
                                return (
                                    <li>
                                        {list.title}
                                        <button onClick={() => {
                                            signDone(list._id)
                                        }}>✓</button>
                                    </li>
                                )
                            }
                        })}
                        </ul>
                    </div>
                }
            </div>
            <div className="list-content">
                {
                    edit 
                    ? 
                    <>
                        <div className="edit-container">
                            <div className="edit-fill">
                                <button className='close-edit ' onClick={() => {setEdit(false)}}>X</button>
                                <form onSubmit={() => {submitEdit()}}>
                                    <h3>Title</h3>
                                    <input 
                                        className='edit-input'
                                        value={editedTitle}  
                                        type="text" 
                                        onChange={(e) => setEditedTitle(e.target.value)} 
                                        maxlength="24"
                                        required
                                    />
                                    <h3>Description</h3>
                                    <textarea 
                                        className='edit-description edit-input'
                                        value={editedDescription}  
                                        onChange={(e) => {
                                            setEditedDescription(e.target.value)
                                        }} 
                                    ></textarea>
                                    <button className='submit' type='submit'>update</button>
                                    <button 
                                        className='submit done' 
                                        type='submit'
                                        onClick={() => {
                                            setConfetti(true)
                                            setDone(true)
                                        }}
                                    >
                                        Done
                                    </button>
                                    <button 
                                        className='submit starred' 
                                        type='submit'
                                        onClick={() => setStarred(true)}
                                    >
                                        Starred
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <div></div>
                }
                <div className="columns">
                    <div className="column">
                        <button className='add-button' onClick={() => setAddNew(!addNew)}>add new</button>
                        {addNew ? 
                            <div className="add-user">
                                <form onSubmit={addNewList}>
                                    <input 
                                        className='add-title' 
                                        value={newTitle}  
                                        type="text" 
                                        placeholder='Title' 
                                        onChange={(e) => setNewTitle(e.target.value)} 
                                        maxlength="24"
                                        required
                                    />
                                    <textarea 
                                        className='add-description' 
                                        placeholder='Description'
                                        value={newDescription}  
                                        required
                                        onChange={(e) => setNewDescription(e.target.value)} 
                                    ></textarea>
                                    <button className='submit add' type='submit'>Submit</button>
                                </form>
                            </div>
                        :
                            <div></div>
                        }
                        <div className="cards">
                        {emptyList ? 
                            <div></div>
                            :
                            lists.map((list, index) => {
                                index %= 6
                                index += 1
                                let style
                                switch (index) {
                                    case 1:
                                        style = "pink"
                                        break;
                                    case 2:
                                        style = "orange"
                                        break;
                                    case 3:
                                        style = "yellow"
                                        break;
                                    case 4:
                                        style = "purple"
                                        break;
                                    case 5:
                                        style = "skin"
                                        break;
                                    case 6:
                                        style = "blue"
                                        break;
                                    default:
                                        break;
                                }
                                if (!list.isDone){
                                    return (
                                        <div className={`card ${style}`} key={nanoid()}>
                                            <div className="card-title">
                                                <h3>{list.title}</h3>
                                                {list.description ? <hr className='underline'/> : <></>}
                                            </div>
                                            <div className="card-fill">
                                                <p>{list.description}</p>
                                                <div className="card-buttons">
                                                    <button 
                                                        className='submit'
                                                        onClick={() => editList(list._id)}
                                                        name={list._id}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            const result = confirm("Are you sure want delete this list?")
                                                            if (result){
                                                                deleteUser(user._id, e.target.name)
                                                            }
                                                        }} 
                                                        className='card-delete' 
                                                        name={list._id}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>    
                                    )
                                }
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className="done side">                            
                <h3>Done Task</h3>
                {doneList.length === 0 ? 
                    <div className="side-empty">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :
                    <div>
                        <ul>
                            {lists.map((list) => {
                                if (list.isDone){
                                    return (
                                        <li>
                                            {list.title}
                                            <button onClick={(e) => {
                                                const result = confirm("Are you sure want to delete this list ?")
                                                if (result){
                                                    deleteUser(user._id, list._id)
                                                }
                                            }} >x</button>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export {
    UserList,
    userLists, 
} 