import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import bcrypt from "bcryptjs"

let userId = ""
function Login() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(true)
    const [check, setCheck] = useState(true)
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [exist, setExist] = useState(false)
    const [checkConfirm, setCheckConfirm] = useState(true)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const passwordInputRef = useRef()
    const passwordLoginRef = useRef()
    
    const getUsers = async() => {
        const response = await axios.get("https://mighty-gold-production.up.railway.app/users")
        setUsers(response.data)
    }

    useEffect(() => {
        getUsers()
    }, [success])

    useEffect(() => {
        getUsers()
    }, [])

    const checkUser = (e) => {
        e.preventDefault()
        users.map(user => {
            const password = passwordLoginRef.current.value
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err){
                    throw err
                } else if(!isMatch){
                    console.log("password doesn't match")
                } else {
                    if(user.name === name){
                        userId = user._id
                        navigate("/list")
                        setCheck(true)
                        return 
                    }
                }
            })
        })
        setCheck(false)
    }

    const registerUser = async (e) => {
        e.preventDefault()
        setCheckConfirm(true)
        if (newPassword === confirm) {
            let count = 0
            for(let i = 0; i < users.length; i++){
                if (users[i].name !== newUsername){
                    count += 1
                }
            }
            const result = count === users.length
            if (result){
                setExist(false)
                setRegister(true)
                try {
                    const password = passwordInputRef.current.value
                    const hashedPassword = bcrypt.hashSync(password, 10)
                    console.log(hashedPassword)
                    setCheckConfirm(true)
                    setSuccess(true)
                    setRegister(true)
                    await axios.post("https://mighty-gold-production.up.railway.app/users", {
                        name: newUsername, 
                        password: hashedPassword, 
                        lists: [],
                    })
                } catch (error){
                    console.log(error);
                }
            } else {
                setExist(true)
            }
        } else {
            setCheckConfirm(false)
        }
    }

    return (
        <div className="login-container">
            <div className="blob-container">
            <div className="vector1 blob">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#96C3F0" d="M51.7,-73.8C64.5,-61.8,70.9,-43.4,72.5,-26.4C74.1,-9.4,70.9,6.3,67.7,23.7C64.4,41.2,61.1,60.4,49.8,72C38.5,83.5,19.3,87.5,0.2,87.3C-18.9,87,-37.8,82.5,-48.9,70.8C-60,59.2,-63.4,40.4,-63.5,24.3C-63.6,8.2,-60.5,-5.2,-58.4,-21.2C-56.3,-37.2,-55.1,-55.7,-45.5,-68.8C-35.9,-81.8,-18,-89.5,0.7,-90.5C19.4,-91.5,38.8,-85.8,51.7,-73.8Z" transform="translate(100 100)" />
            </svg>
            </div>
            <div className="vector2 blob">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ED85A8" d="M30.3,-48.6C38.8,-35.6,44.8,-26.1,51.6,-14.5C58.5,-3,66.1,10.5,62.9,20.5C59.7,30.5,45.7,37.1,33.4,48.5C21.1,59.9,10.6,76.2,-1.8,78.8C-14.2,81.3,-28.5,70,-42.7,59.2C-57,48.5,-71.3,38.1,-75.3,24.7C-79.4,11.3,-73.3,-5.3,-68,-22.3C-62.8,-39.4,-58.5,-57,-47.3,-69.1C-36.1,-81.1,-18.1,-87.8,-3.6,-82.9C10.9,-78,21.9,-61.5,30.3,-48.6Z" transform="translate(100 100)" />
            </svg>
            </div>
            <div className="vector3 blob">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FEF88E" d="M31.7,-46.6C41.9,-36.2,51.7,-28.1,54.7,-18C57.7,-7.9,53.9,4.2,49.4,15.4C44.9,26.6,39.6,36.9,31.2,47.3C22.8,57.7,11.4,68.2,-1.3,70C-14,71.8,-28.1,64.9,-38.8,55.3C-49.5,45.6,-56.9,33.3,-62.2,19.6C-67.6,5.9,-70.9,-9.1,-69.3,-25.2C-67.8,-41.3,-61.4,-58.5,-49,-68.3C-36.7,-78.1,-18.3,-80.4,-3.8,-75.2C10.7,-70,21.5,-57.1,31.7,-46.6Z" transform="translate(100 100)" />
            </svg>
            </div>
            <div className="vector4 blob">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A97EF3" d="M38,-48.3C51.3,-42.6,65.8,-34.3,72.8,-21.5C79.9,-8.8,79.6,8.5,74.3,23.9C69,39.3,58.6,52.8,45.3,58.5C32.1,64.2,16,62,1.4,60.1C-13.3,58.2,-26.5,56.5,-41.7,51.4C-56.9,46.4,-74,38,-77.2,25.7C-80.4,13.3,-69.7,-2.9,-60.4,-15.9C-51,-28.9,-43.1,-38.7,-33.3,-45.6C-23.5,-52.5,-11.7,-56.6,0.3,-57C12.3,-57.4,24.6,-54.1,38,-48.3Z" transform="translate(100 100)" />
            </svg>
            </div>
            </div>
            {/* <Navbar /> */}
            {
                register ? 
                <div className="login-content">
                    <h1 className='login'>Login</h1>
                    <form onSubmit={checkUser}>
                        <input 
                            type="text" 
                            className="input"
                            placeholder='name' 
                            value={name} onChange={(e) => setName(e.target.value)} 
                            required
                        />
                        <input 
                            type="password" 
                            className="input" 
                            placeholder='password' 
                            value={password} onChange={(e) => {setPassword(e.target.value)}} 
                            ref={passwordLoginRef}
                            required
                            />
                        {check ? 
                            <small></small> 
                            : 
                            <small className='login-confirmation'>
                                username or password is wrong
                            </small>}
                        <button type='submit' className="submit">LOGIN</button>
                    </form>
                    <small>No account ? <button className='register' onClick={() => setRegister(false)}>Register now</button></small>
                </div>
                :
                <div className="login-content">
                    <h1 className='login'>Hello</h1>
                    <form onSubmit={registerUser}>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder='name' 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                            required
                        />
                        <input 
                            type="password"
                            className="input" 
                            placeholder='password' 
                            value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} 
                            ref={passwordInputRef}
                            required
                        />
                        <input 
                            type="password" 
                            className="input" 
                            placeholder='confirm password' 
                            value={confirm} onChange={(e) => {setConfirm(e.target.value)}} 
                            required
                        />
                        {checkConfirm ? 
                            <small></small> 
                            : 
                            <small className='login-confirmation'>
                                your password doesn't match
                            </small>}
                        {exist === false ? 
                            <small></small> 
                            : 
                            <small className='login-confirmation'>
                                username is already taken
                            </small>}
                        <button type='submit' className="submit">REGISTER</button>
                    </form>
                    <small>
                        Have account ? 
                        <button 
                            className='register' 
                            onClick={() => setRegister(true)}
                        >
                            Login now
                        </button>
                    </small>
                </div>
            }
    </div>
  )
}

export {
    Login, 
    userId
}