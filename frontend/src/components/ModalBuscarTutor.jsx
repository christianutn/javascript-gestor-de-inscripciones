// Modal.js
import React from 'react';
import "../../public/styles/abm-formulario.css"
import { useEffect, useState } from 'react';

// ModalBuscarTutor.jsx


export const ModalBuscarTutor = ({ isOpen, onClose, onSelectTutor }) => {

    const [cuil, setCuil] = useState('');
    const [apellido, setApellido] = useState('');
    const [tutores, setTutores] = useState([]);
    const handleInputCuil = (event) => {
        setCuil(event.target.value);
    }

    const handleInputApellido = (event) => {
        setApellido(event.target.value);
    }

    useEffect(() => {

        const listaTutores = async (cuil, apellido) => {

            try {
                const response = await fetch(`http://localhost:4000/api/tutores?cuil=${cuil}&apellido=${apellido}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                });

                const data = await response.json();
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }

        (async () => {
            const tutores = await listaTutores(cuil, apellido);
            setTutores(tutores);
        })();




    }, [cuil, apellido]);


    const handleSelectTutor = (event) => {

        const selectedCuil = event.target.value;
        const selectedTutor = tutores.find(tutor => tutor.cuil === selectedCuil);
        onSelectTutor(selectedTutor);
        const nuevoTutores = tutores.filter(tutor => tutor.cuil !== selectedCuil);
        setTutores(nuevoTutores);


    }

    return (
        <div className='container-modal-tutor'>
            <div className={`${isOpen ? 'open' : 'closed'}`}>

                <div style={{ textAlign: 'center' }}>
                    <h1  className="form-label mt-4" >
                        BÚSQUEDA DE TUTORES
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
                        {
                            tutores && tutores.length > 0 && tutores.map((tutor) => (
                                <div key={tutor.cuil} >
                                    <button type="button" value={tutor.cuil} className="btn btn-primary btn-lg" onClick={handleSelectTutor}>
                                        {tutor.apellido + ", " + tutor.nombre}
                                    </button>

                                </div>
                            ))
                        }

                    </div>


                </div>

                <div style={{ textAlign: 'center',  marginTop: '-5%'}}>
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
                </div>


            </div>
        </div>
    );
};




