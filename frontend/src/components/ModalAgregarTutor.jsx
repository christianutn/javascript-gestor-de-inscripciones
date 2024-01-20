import { useState } from "react";
import "../../public/styles/abm-formulario.css"
import { crearNuevoTutor } from "../../utils/functions/crearNuevoTutor";
import { normalizarNombreApellido } from "../../utils/functions/normalizarNombreApellido";



export const ModalAgregarTutor = ({ isOpen, onClose }) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cuil, setCuil] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');

    const handleCrearTutor = async () => {
        try {
            //Normalizar nombre significa garantizar la forma correcta en que adminite la bd el  ingreso de estos
            // Para que sean admitidos no debe ser un espacio en blanco el inicio o final de la cadena, 
            // Todo nombre debe comenzar con mayúscula, si el nombre es compuesto "ejemplo: Jorge Luis", este debe tener sólo un espacio entre medio y el siguiente nombre debe tener
            //su primer letra también en mayúscula. Las demas letras deben ser todas minúsculas.
            const nombreNormalizado = normalizarNombreApellido(nombre);
            const apellidoNormailizado = normalizarNombreApellido(apellido);
            
            const nuevoTutor = await crearNuevoTutor(cuil, nombreNormalizado, apellidoNormailizado, correo, celular);

            onClose(nuevoTutor)
         

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Tutor creado con exito",
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
            // setCuil('');
            // setNombre('');
            // setApellido('');
            // setCelular('');
            // setCorreo('');
        }
    };

    return (
        <div className="container-modal-tutor">
            <div className={isOpen ? "open" : "closed"}>

                <div style={{ textAlign: 'center' }}>
                    <h1 className="form-label mt-4" >
                        Crear nuevo Tutor
                    </h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Cuil'
                        onChange={(e) => setCuil(e.target.value)}
                        value={cuil}

                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Nombre del Tutor'
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Apellido del Tutor'
                        onChange={(e) => setApellido(e.target.value)}
                        value={apellido}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="email"
                        placeholder='Corre electrónico'
                        onChange={(e) => setCorreo(e.target.value)}
                        value={correo}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder='Celular: ejemplo 0351XXXXXXX'
                        onChange={(e) => setCelular(e.target.value)}
                        value={celular}
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

                        onClick={handleCrearTutor}
                    ></button>
                </div>
            </div>

        </div>
    )
}