"use client";
import { createContext, useState } from "react";

export const BadgeContext = createContext({})

export default function BadgeContextProvider({children}: any) {
    const [badge, setBadge] = useState<number>(0);
    const [colorBadge, setColorBadge] = useState<string>("")
    return(
        <BadgeContext.Provider value={{badge, setBadge, colorBadge, setColorBadge}}>
            {children}
        </BadgeContext.Provider>
    )
}