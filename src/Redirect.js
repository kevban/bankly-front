import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import LoadingPage from './components/LoadingPage';

const Redirect = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user)
    useEffect(() => {
        if (user) {
            if (!user.token) {
                navigate('/landing')    
            } else {
                navigate('/dashboard')
            }
        }
    }, [user, navigate])
    return <LoadingPage></LoadingPage>
}

export default Redirect