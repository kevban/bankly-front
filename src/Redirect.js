import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user)
    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        } else {
            navigate('/landing')
        }
    }, [])
    return <></>
}

export default Redirect