import { Alert } from "@mui/material";
import React, { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState(null);
    const createAlert = (msg, type) => {
        setAlert(<Alert severity={type} sx={{width: '100%', m: '10px'}}>{msg}</Alert>)
    }
    return [alert, createAlert]
}
export default useAlert