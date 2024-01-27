
import React from 'react';
import "../../public/styles/abm-formulario.css"
import { useEffect, useState, useRef } from 'react';
import { getAreasByMinisterio } from '../../utils/functions/getAreasByMinisterio';
import { getAutorizadorByApellido } from '../../utils/functions/getAutorizadorByApellido';
import { crearNuevoCurso } from '../../utils/functions/crearNuevoCurso';
import { ModalAgregarAutorizador } from './ModalAgregarAutorizador';
// ModalBuscarTutor.jsx


export const ModalAgregarCurso = ({ isOpen, onClose, ministerios, abrirDesdeOtroModal }) => {



    const [selectMinisterio, setSelectMinisterio] = useState('sin-seleccionar-ministerio')
    const [isOptionSelecte1, setIsOptionSelecte1] = useState(true)
    const [nombreNuevoCurso, setNombreNuevoCurso] = useState('')
    const [selectArea, setSelectArea] = useState('sin-seleccionar-area')
    const [areas, setAreas] = useState([])
    const [autorizador, setAutorizador] = useState('')
    const [listaAutorizadores, setListaAutorizadores] = useState([])
    const [selectedAutorizador, setSelectedAutorizador] = useState('')


    const handleChangeSelectMinisterio = async (e) => {
        setSelectMinisterio(e.target.value)
        if (e.target.value !== "sin-seleccionar-ministerio") {
            setIsOptionSelecte1(false)
            const areas = await getAreasByMinisterio(e.target.value)
            setAreas(areas)

        } else {
            setIsOptionSelecte1(true)
        }
    }

    const handleChangeSelectArea = (e) => {
        setSelectArea(e.target.value)
        if (e.target.value !== "sin-seleccionar-area") {
            setIsOptionSelecte1(false)

        } else {
            setIsOptionSelecte1(true)
        }
    }


    const handleCrearNuevoCurso = async () => {
        try {
            const nuevoCurso = await crearNuevoCurso(nombreNuevoCurso, selectMinisterio, selectedAutorizador, selectArea)
            onClose(nuevoCurso, selectMinisterio, selectArea)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Curso creado con éxito",
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });


        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });
        }
    }




    const handleAutorizador = async (e) => {

        setAutorizador(e.target.value)
        const lista = await getAutorizadorByApellido(e.target.value)

        setListaAutorizadores(lista)
    }


    const [isOpenModalAutorizador, setIsOpenModalAutorizador] = useState(false)

    const handleCloseModalAutorizador = () => {
        setIsOpenModalAutorizador(false)
        abrirDesdeOtroModal()
    }

    const handleClickCrearAutorizador = () => {
         onClose()
        setIsOpenModalAutorizador(true)
    }

    return (


        <div className='container-modal-tutor' >
            <ModalAgregarAutorizador isOpen={isOpenModalAutorizador} onClose={handleCloseModalAutorizador}></ModalAgregarAutorizador>
            <div className={`${isOpen ? 'open' : 'closed'}`}>
                <div style={{ textAlign: 'center' }}>
                    <h1 className="form-label mt-4" >
                        Crear Curso
                    </h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <select className={isOptionSelecte1 ? 'select-ministerios-op1' : 'select-ministerios-op2'} value={selectMinisterio} onChange={handleChangeSelectMinisterio}>
                        <option value="sin-seleccionar-ministerio">Seleccionar un Ministerio</option>
                        {
                            ministerios && ministerios.map((ministerio) => (
                                <option key={ministerio._id} value={ministerio._id}>{ministerio.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <select className={isOptionSelecte1 ? 'select-ministerios-op1' : 'select-ministerios-op2'} value={selectArea} onChange={handleChangeSelectArea}>
                        <option value="sin-seleccionar-area">Seleccionar un Área</option>
                        {
                            areas && areas.map((area) => (
                                <option key={area._id} value={area._id}>{area.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="text" name="" id="" placeholder='Buscar Autorizador' value={autorizador} onChange={handleAutorizador} />
                    <div className='div-desplegable'>
                        <button className='btn-desplegable' onClick={handleClickCrearAutorizador}>Crear nuevo autorizador</button>
                        {/* Lista desplegable de opciones coincidentes */}
                        {listaAutorizadores && autorizador !== "" && listaAutorizadores.map((autorizador) => (

                            // <button className='btn-desplegable' key={autorizador._id}>{autorizador.nombre + ', ' + autorizador.apellido}</button>
                            <button className='btn-desplegable' key={autorizador._id} value={autorizador._id}
                                onClick={(e) => {
                                    setAutorizador(autorizador.nombre + ", " + autorizador.apellido);
                                    setListaAutorizadores([]);
                                    setSelectedAutorizador(autorizador._id);
                                }
                                }>
                                {autorizador.nombre + ', ' + autorizador.apellido}
                            </button>

                        ))}





                    </div>

                </div>

                <div style={{ textAlign: 'center' }}>
                    <input type="text" name="" id="" placeholder='Nombre del Curso' onChange={(e) => setNombreNuevoCurso(e.target.value)} />
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

                        onClick={handleCrearNuevoCurso}
                    ></button>
                </div>


            </div>
        </div>

    );
};



