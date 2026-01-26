import { useState, useEffect } from "react";

export function useStatePersistent(nombre, estado) {
    const [state, setData] = useState(estado);
    const obj = (typeof (estado) == "object");
    const type = typeof (estado);

    const setState = (estado) => {
        setData(estado);
        if (obj)
            localStorage.setItem(nombre, JSON.stringify(estado));
        else
            localStorage.setItem(nombre, estado);
    }

    useEffect(() => {
        let fromLS = localStorage.getItem(nombre);
        if (fromLS) {
            if (obj)
                setData(JSON.parse(fromLS));
            else
                if (type == "number")
                    setData(Number(fromLS));
                else
                    setData(fromLS);
        }
    }, [state]);

    return [state, setState];
}