import {useState} from "react";

const useLocalStorage = (key) => {
    const [val, setVal] = useState(() => 
        localStorage.getItem(key)
    )

    const setStorage = (val) => {
        localStorage.setItem(key, val);
        setVal(val);
    }

    return [val, setStorage]
}

export default useLocalStorage