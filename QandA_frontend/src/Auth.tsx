import React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { authSettings } from './AppSettings';

interface Auth0User {
    name?: string;
    email?: string;
}

interface IAuth0Context {
    isAuthenticated: boolean;
    user?: Auth0User;
    signIn: () => void;
    signOut: () => void;
    loading: boolean;
}

export const Auth0Context = React.createContext<IAuth0Context>({
    isAuthenticated: false,
    signIn: () => { },
    signOut: () => { },
    loading: true
});

// A way to access the context defined above, from anywhere in the app.
export const useAuth = () => React.useContext(Auth0Context);

export const AuthProvider: React.FC = ({
    children
}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<Auth0User | undefined>(undefined);
    const [auth0Client, setAuth0Client] = React.useState<Auth0Client>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const getAuth0ClientFromState = () => {
        if (auth0Client === undefined) throw new Error("Auth0 client not set");
        return auth0Client;
    };

    React.useEffect(() => {
        const initAuth0 = async () => {
            setLoading(true);
            const auth0FromHook = await createAuth0Client(authSettings);
            setAuth0Client(auth0FromHook);

            if (
                window.location.pathname === '/signin-callback' &&
                window.location.search.indexOf("code=") > -1
            ) {
                await auth0FromHook.handleRedirectCallback();
                window.location.replace(window.location.origin);
            }

            const isAuthenticatedFromHook = await auth0FromHook.isAuthenticated()

            if (isAuthenticatedFromHook) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setIsAuthenticated(isAuthenticatedFromHook);
            setLoading(false);
        };
        initAuth0();
    }, []);

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated, user,
                signIn: () => getAuth0ClientFromState().loginWithRedirect(),
                signOut: () => getAuth0ClientFromState().logout({
                    client_id: authSettings.client_id,
                    returnTo: window.location.origin + '/signout-callback',
                }),
                loading,
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};

/**
 * @returns An access token which was aquired silently and in a secure manner.
 */
export const getAccessToken = async () => {
    const auth0FromHook = await createAuth0Client(authSettings);
    const accessToken = await auth0FromHook.getTokenSilently();
    return accessToken;
};