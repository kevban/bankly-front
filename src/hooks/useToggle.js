import React, { useState } from "react";

const useToggle = (initial = true) => {
    const [state, setState] = useState(initial);
    const toggleState = () => {
        setState(state => !state)
    }
    return [state, toggleState]
}
export default useToggle
