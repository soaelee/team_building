import React, {useEffect} from 'react';
import {auth} from '../_actions/user_actions';
import {useSelector, useDispatch} from 'react-redux';

export default function (SpacificComponent, option) {
    
    function AuthenticationCheck(props){
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
                .then(res => {
                    if(!res.payload.isAuth) {
                        if(option) { 
                            props.history.push("/login");
                        }
                    }
                    else {
                        if(option === false) {
                            props.history.push("/");
                        }
                    }
                })
        }, [])

        return (
            <SpacificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}