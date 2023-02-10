import { useState, useRef } from "react";

import { Button } from '@mui/material'

import useUser from "../../hooks/useUser";

const Archivoss = () => {

    const { subirArchivos, archivos } = useUser()
    //const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        subirArchivos(event.dataTransfer.files)
    };

    // send files to the server // learn from my other video
    

    if (archivos) return (
        <div className="uploads">
            <ul>
                {Array.from(archivos).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
            <div className="actions">
                <Button onClick={() => subirArchivos(null)}>Limpiar</Button>                
            </div>
        </div>
    )

    return (
        <>
            <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Arrastra y suelte la imagen</h1>
                <h1>O</h1>
                <input
                    type="file"                    
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(event) => subirArchivos(event.target.files)}
                    hidden
                    label="kk"
                    ref={inputRef}
                />
                
                <Button variant="contained" onClick={() => inputRef.current.click()}>Seleccionar imagen</Button>
            </div>
        </>
    );
};

export default Archivoss;