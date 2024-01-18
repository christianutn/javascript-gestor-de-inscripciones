
import React from 'react';
import "../../public/styles/abm-formulario.css"
import { useEffect, useState, useRef } from 'react';

// ModalBuscarTutor.jsx


export const ModalAgregarArea = ({ isOpen, onClose, ministerios }) => {

   console.log("MINISTERIOS DESDE MODLA: ", ministerios)
    const handleInputCuil = (event) => {
        setCuil(event.target.value);
    }

    const handleInputApellido = (event) => {
        setApellido(event.target.value);
    }


    return (
        <div className='container-modal-tutor'>
            <div className={`${isOpen ? 'open' : 'closed'}`}>
                <div style={{ textAlign: 'center' }}>
                    <h1 className="form-label mt-4" >
                        Crear Área
                    </h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="text" name="cuil" id="cuil" placeholder='Cuil' onChange={handleInputCuil} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="text" name="" id="" placeholder='Apellido' onChange={handleInputApellido} />
                </div>


                <div
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',


                    }}>
                    <div className="btn-tutores">


                    </div>


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

                        



                    ></button>
                </div>


            </div>
        </div>
    );
};


