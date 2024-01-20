
import { useState } from "react";
import "../../public/styles/abm-formulario.css"
import { crearNuevoAutorizador } from "../../utils/functions/crearNuevoAutorizador";


export const ModalAgregarAutorizador = ({ isOpen, onClose }) => {

    const [nombreAutorizador, setNombreAutorizador] = useState('');
    const [apellidoAutorizador, setApellidoAutorizador] = useState('');
    const [descripcion, setDescripcion] = useState('');




    const handleCrearAutorizador = async () => {

        try {
            const nuevoAutorizador = await crearNuevoAutorizador(nombreAutorizador, apellidoAutorizador, descripcion);
            onClose(nuevoAutorizador);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Autorizador creado con éxito",
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

        }finally{
            setNombreAutorizador('');
            setApellidoAutorizador('');
            setDescripcion('');
        }

    }

    return (
        <div className="container-modal-tutor">
            <div className={isOpen ? "open" : "closed"}>

                <div style={{ textAlign: 'center' }}>
                    <h1 className="form-label mt-4" >
                        Crear Nuevo Autorizador
                    </h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Nombre del nuevo Autorizador'
                        onChange={(e) => setNombreAutorizador(e.target.value)}
                        value={nombreAutorizador}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Apellido del nuevo Autorizador'
                        onChange={(e) => setApellidoAutorizador(e.target.value)}
                        value={apellidoAutorizador}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Descripción - Área al que pertenece el autorizador'
                        onChange={(e) => setDescripcion(e.target.value)}
                        value={descripcion}
                    />
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

                        onClick={handleCrearAutorizador}





                    ></button>
                </div>
            </div>

        </div>
    )
}