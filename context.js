import React, { createContext, useState } from 'react';
export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
const [user, setUser] = useState(null);
return (
<MyContext.Provider value={{ user, setUser }}>
{children}
</MyContext.Provider>
);
}