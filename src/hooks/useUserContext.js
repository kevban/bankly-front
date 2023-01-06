import {useState} from "react";
import { useSelector } from "react-redux";

const useUserContext = (key) => {
    const user = useSelector(store => store.auth.user)
    if (!user) {
        return <></>
    }
    

    const setStorage = (val) => {
        localStorage.setItem(key, val);
        setVal(val);
    }

    return [val, setStorage]
}

export default useUserContext