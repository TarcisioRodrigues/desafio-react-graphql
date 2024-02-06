import React, { createContext } from 'react';

const todoContext=createContext({})


export const TodoProvider=({children}:{children:React.ReactNode})=>{
    return (
    
        <todoContext.Provider value={}>
          {children}
        </todoContext.Provider>
      );
}