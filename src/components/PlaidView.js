import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTokenAction } from "../actions/actionCreators";
import PlaidLink from "./PlaidLink";

const PlaidView = () => {
    const dispatch = useDispatch()
    const generateToken = useCallback(
        () => {
            dispatch(getTokenAction())
        }
    )
    useEffect(() => {
        generateToken();
    }, [dispatch, generateToken])
    return <PlaidLink></PlaidLink>
}

export default PlaidView