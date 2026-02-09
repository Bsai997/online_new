import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, addToCart } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        getProfile().then(res => setUser(res.data.data)).catch(() => setUser(null));
    }, []);

    useEffect(() => {
        if (user) {
            const pending = localStorage.getItem('pendingCartAdd');
            if (pending) {
                addToCart(pending, 1).then(() => {
                    localStorage.removeItem('pendingCartAdd');
                    setNotification('Item added to cart!');
                    setTimeout(() => setNotification(''), 3000);
                }).catch(() => { });
            }
        }
    }, [user]);

    return (
        <AppContext.Provider value={{ user, setUser, notification, setNotification }}>
            {children}
        </AppContext.Provider>
    );
};