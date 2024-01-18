import '../../public/styles/login.css'
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { generarToken } from '../../utils/functions/generarToken'



export const Login = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData);

            const token = await generarToken(data)

            //Guardar token en header authorization

            localStorage.setItem('token', `Bearer ${token}`)

            // Obtener el token del almacenamiento local
            const storedToken = localStorage.getItem('token');

            // Mostrar el token en la consola
            console.log('Token almacenado:', storedToken);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Login validado",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });

            navigate('/formulario-inscripcion')


        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Usuario o Contraseña Inválido",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        }


    };




    return (

        <div className="container">
            <img
                src="../../public/img/fondoNegro.jpg"
                alt="imagen fondo negro"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}
            />
            <div className='login-container' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div >
                    <img src="../public/img/acceso.png" alt="" style={{ width: '140px', height: '140px' }} />
                </div>

                <div className="form-group" style={{ marginTop: '40px' }}>
                    <form onSubmit={handleSubmit} ref={formRef} >
                        <div className="form-group" >

                            <input
                                type="text"
                                className="form-control"
                                id="cuil"
                                name='cuil'
                                aria-describedby="emailHelp"
                                placeholder="Cuil"
                                style={{ height: '50px' }}
                            />

                        </div>

                        <div className="form-group" style={{ marginTop: '20px' }}>

                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name='password'
                                placeholder="Password"
                                autoComplete="off"
                                style={{ height: '50px' }}
                            />
                        </div>


                        <button type="submit" className="btn btn-dark" style={{ marginTop: '30px', width: '100%', height: '50px' }}>Iniciar Sesión</button>
                    </form>


                </div>




            </div>

        </div>
    );
}