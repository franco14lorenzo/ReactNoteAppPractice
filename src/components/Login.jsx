import React from 'react';



const Login = ({setErrorMessage, handleLogin, username, password, setUsername, setPassword}) => {  
       
    
    
    return(
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>   
                Password
                <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
            </div>
            <div>
                <button type="Submit">Login</button>
            </div>
        </form>
    )
}

export default Login