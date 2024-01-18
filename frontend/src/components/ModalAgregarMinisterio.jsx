import React, { useEffect } from "react";
import { useState } from "react";
import "../../public/styles/abm-formulario.css"
import { crearNuevoMinisterio } from "../../utils/functions/crearNuevoMinisterio";

export const ModalAgregarMinisterio = ({ isOpen, onClose }) => {

    const handleCrearNuevoMinisterio = async () => {
        try {
            const nuevoMinisterio = await crearNuevoMinisterio({ cod: nombreMinisterio, nombre: nombreMinisterio });


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Ministerio creado con éxito",
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });

            onClose(nuevoMinisterio);
            
            
            
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });
            onClose();
            
        }


    };

    const [nombreMinisterio, setNombreMinisterio] = useState('');

    const handleNombreMinisterioChange = (nombreMinisterio) => {
        setNombreMinisterio(nombreMinisterio);


    };




    return (
        <div className="container-modal-tutor">
            <div className={isOpen ? "open" : "closed"}>

                <div style={{ textAlign: 'center' }}>
                    <h1 className="form-label mt-4" >
                        Crear Nuevo Ministerio
                    </h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        name="ministerio"
                        id="ministerio"
                        placeholder='Nombre del nuevo Ministerio'
                        onChange={(e) => { handleNombreMinisterioChange(e.target.value) }} />
                </div>

                <div style={{ textAlign: 'center', marginTop: '1px' }}>
                    <button
                        style={{
                            backgroundImage: 'url(../../public/img/atras.png)',
                            height: '50px',
                            width: '50px',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundColor: 'transparent',
                            border: 'none',
                            marginTop: '5%',
                 


                        }}

                        onClick={onClose}



                    ></button>
                    <button
                        style={{
                            backgroundImage: 'url(../../public/img/agregarMinisterio.png)',
                            height: '50px',
                            width: '50px',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundColor: 'transparent',
                            border: 'none',
                            marginTop: '5%',
                            marginLeft: '5%',
                         
                        }}

                        onClick={handleCrearNuevoMinisterio}



                    ></button>
                </div>
            </div>

        </div>
    )
}