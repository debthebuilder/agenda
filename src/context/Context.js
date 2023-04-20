import { createContext, useState } from "react";

export const AppContext = createContext({});

const AppProvider = ({children}) => {
    const [auth, setAuth] = useState(false); 
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);

    return(
        <AppContext.Provider value={{user, setUser, tasks, setTasks, auth, setAuth}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;