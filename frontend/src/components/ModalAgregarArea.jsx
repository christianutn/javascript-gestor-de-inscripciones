
import React from 'react';
import "../../public/styles/abm-formulario.css"
import { useEffect, useState, useRef } from 'react';
import { crearNuevaArea } from '../../utils/functions/crearNuevaArea';

// ModalBuscarTutor.jsx


export const ModalAgregarArea = ({ isOpen, onClose, ministerios }) => {

   console.log("MINISTERIOS DESDE MODLA: ", ministerios)

   const [selectMinisterio, setSelectMinisterio] = useState('sin-seleccionar-ministerio')
   const [isOptionSelecte1, setIsOptionSelecte1] = useState(true)
    const [nombreNuevoArea, setNombreNuevoArea] = useState('')
   const handleChangeSelectMinisterio = (e) => {
       setSelectMinisterio(e.target.value)
       if(e.target.value !== "sin-seleccionar-ministerio"){
           setIsOptionSelecte1(false)
           console.log("SELECT MINISTERIO: ", e.target.value)
       }else{
           setIsOptionSelecte1(true)
       }
   }

   const handleCrearNuevaArea = async () => {
       
    try {
        const nuevaArea = await crearNuevaArea(nombreNuevoArea, selectMinisterio);


        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Área creado con éxito",
            showConfirmButton: false,
            timer: 3000,
            backdrop: false,
        });

        onClose(nuevaArea, selectMinisterio);
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
                    <select   className={isOptionSelecte1 ? 'select-ministerios-op1' : 'select-ministerios-op2'} name="ministerios" id="ministerios" value={selectMinisterio} onChange={handleChangeSelectMinisterio}>
                        <option  value="sin-seleccionar-ministerio">Seleccionar un Ministerio</option>
                        {
                            ministerios && ministerios.map((ministerio) => (
                                <option key={ministerio._id} value={ministerio._id}>{ministerio.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="text" name="" id="" placeholder='Nombre de Área nuevo'  onChange={(e) => setNombreNuevoArea(e.target.value)}/>
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

                        onClick={handleCrearNuevaArea}
                    ></button>
                </div>


            </div>
        </div>
    );
};


