import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import SERVER_URL from '../config'
import axios from 'axios'

const ClubContext = createContext(null);

export function ClubProvider({ children }) {
    const [club, setClub] = useState(null);
    const requestId = useRef(0);

    // Los colores dependen siempre del estado:
    // con club -> colores personalizados; sin club -> vuelven los del CSS (:root)
    useEffect(() => {
        const root = document.documentElement;
        if (club) {
            root.style.setProperty('--club-primary-color', club.primaryColor);
            root.style.setProperty('--club-secondary-color', club.secondaryColor);
        } else {
            root.style.removeProperty('--club-primary-color');
            root.style.removeProperty('--club-secondary-color');
        }
    }, [club]);

    // Carga el club del usuario autenticado (al arrancar y justo después del login)
    const refreshClub = useCallback(async () => {
        const id = ++requestId.current;
        try {
            const response = await axios.get(`${SERVER_URL}/clubs/me`, { withCredentials: true });
            if (id !== requestId.current) return null; // la respuesta llegó tarde, se descarta
            if (response.status === 204 || !response.data) {
                setClub(null);
                return null;
            }
            setClub(response.data);
            return response.data;
        } catch (error) {
            if (id === requestId.current) setClub(null); // sin sesión: es lo normal en el login
            return null;
        }
    }, []);

    // Quita el club y los colores (logout y pantalla de login)
    const clearClub = useCallback(() => {
        requestId.current++; // invalida cualquier petición en curso
        setClub(null);
    }, []);

    useEffect(() => {
        refreshClub();
    }, [refreshClub]);

    return (
        <ClubContext.Provider value={{ club, refreshClub, clearClub }}>
            {children}
        </ClubContext.Provider>
    );
}

export const useClub = () => useContext(ClubContext);