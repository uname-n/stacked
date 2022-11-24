import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import { default as App } from "./app";

const Protected = ({ user, component }) => {
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return component;
};

export function ProtectedApp() {
    const [user, setUser] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setUser(await Auth.currentAuthenticatedUser());
            } catch (error) {}
        })();
    }, []);

    return (
        <Protected user={user} component={<App />}/>
    );
}