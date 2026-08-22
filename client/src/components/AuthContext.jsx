import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Crear el contexto
export const AuthContext = createContext();

//Crear el componente
export const AuthProvider = ({ children }) => {

    const SERVER_URL = 'http://localhost:8081'

    //Usuario autenticado
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    //Para saber si la sesion esta siendo verificada
    const [isLoading, setIsLoading] = useState(true);

    const verifyUserSession = async () => {
        try {
            //Peticion al backend para recuperar informacion del usuario
            const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            setAuthenticatedUser(response.data);
        } catch (error) {
            console.log('Error verificando sesión: ', error);
            setAuthenticatedUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyUserSession();
    }, []);

    const login = async (username, password) => {
        // Hace la peticion al backend. El backend debe enviar el header Set-Cookie con la cookie HttpOnly
        const response = await axios.post(`${SERVER_URL}/login`,
            { username, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        // Tras el login exitoso, llamamos a /me para traernos los datos del usuario logueado
        await verifyUserSession();
        return response; 
    };

    const logout = async () => {
        try {
            // Peticion al backend para que borre la cookie (opcional si lo gestiona el server)
            // await axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true });
            setAuthenticatedUser(null);
        } catch (error) {
            console.log('Error al hacer logout', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authenticatedUser, login, logout, isLoading, isAuthenticated: !!authenticatedUser, verifyUserSession }}>
            {children}
        </AuthContext.Provider>
    );
}