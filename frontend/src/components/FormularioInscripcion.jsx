import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getInscripciones } from "../../utils/functions/getInscripciones.js";
import { getAreasByMinisterio } from "../../utils/functions/getAreasByMinisterio.js";
import { getCursosByArea } from "../../utils/functions/getCursosByArea.js";
import { getAutorizadorByCurso } from "../../utils/functions/getAutorizadoresByCurso.js";
import { getInscripcionesByIdCurso } from "../../utils/functions/getInscripcionesByIdCurso.js";
import { getMediosDeInscripcion } from "../../utils/functions/getMediosDeInscripcion.js";
import { getPlataformasDeDictado } from "../../utils/functions/getPlataformasDeDictado.js";
import { getTiposDeCapacitacion } from "../../utils/functions/getTiposDeCapacitacion.js"
import { obtenerDatosUltimaInscripcion } from "../../utils/functions/obtenerDatosUltimaInscripcion.js";
import { crearNuevaInscripcion } from "../../utils/functions/crearNuevaInscripcion.js";
import { formatearFecha } from "../../utils/functions/formatearFecha.js";
import { agregarNuevaInscripcionAExcel } from "../../utils/functions/agregarNuevaInscripcionAExcel.js";
import { getMinisterios } from "../../utils/functions/getMinisterios.js";
import { getInscripcionById } from "../../utils/functions/getInscripcionById.js";

import "../../public/styles/form-inscripcion.css"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isWeekend, isFriday, isMonday, set } from 'date-fns';

import { ModalBuscarTutor } from "./ModalBuscarTutor.jsx";
import { ModalAgregarMinisterio } from "./ModalAgregarMinisterio.jsx";
import { ModalAgregarArea } from "./ModalAgregarArea.jsx";
import { ModalAgregarCurso } from "./ModalAgregarCurso.jsx";
import { ModalAgregarAutorizador } from "./ModalAgregarAutorizador.jsx";
import { ModalAgregarTutor } from "./ModalAgregarTutor.jsx";


export const FormularioInscripcion = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef(null);

    // Eventos selección de rango de inscripción

    const [startDateInscripcion, setStartDateInscripcion] = useState(null);
    const [endDateInscripcion, setEndDateInscripcion] = useState(null);

    const handleDateChangeInscripcion = (update) => {

        setStartDateInscripcion(update[0]);
        setEndDateInscripcion(update[1]);

    };


    //Eventos selección de rango de cursos

    const [startDateCurso, setStartDateCurso] = useState(null);
    const [endDateCurso, setEndDateCurso] = useState(null);


    const handleDateChangeCurso = (update) => {

        setStartDateCurso(update[0]);
        setEndDateCurso(update[1]);


    };

    //Se usa en DatePicker para deshabilitar el rango de fechas
    const filterDate = (date) => {
        // Deshabilita domingos, viernes, sábados y días pasados
        return !isWeekend(date) && !isFriday(date) && !isMonday(date);
    };



    //EStados para manejar inscripciones

    const [inscripciones, setInscripciones] = useState([]);


    // Estado para manejar ministerios

    const [ministerios, setMinisterios] = useState([]);
    const [selectedMinisterio, setSelectedMinisterio] = useState("sin-seleccionar-ministerio");

    const handleSelectedMinisterioChange = async (event) => {
        const ministerioSeleccionado = event.target.value;
        setSelectedMinisterio(ministerioSeleccionado);

        let nuevaAreas = []
        //Ministerio seleccionado es cod del ministerio
        if (ministerioSeleccionado !== "sin-seleccionar-ministerio") nuevaAreas = await getAreasByMinisterio(ministerioSeleccionado);

        setAreas(nuevaAreas);
        setCursos([])
        setSelectedCurso("sin-seleccionar-curso")
        setAutorizador("")
        setSelectedArea("sin-seleccionar-area")
        setCupo(0)
        setCantidadHoras(0)
        setTutores([])
        setSelectedMedioInscripcion("sin-seleccionar-ministerio")
        setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
        setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")



    }

    // EStados para manejar areas

    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("sin-seleccionar-area");



    const handleSelectedAreaChange = async (event) => {
        const areaSeleccionada = event.target.value;
        setSelectedArea(areaSeleccionada);

        let nuevosCursos = [];
        if (areaSeleccionada !== "sin-seleccionar-area") nuevosCursos = await getCursosByArea(areaSeleccionada)

        setCursos(nuevosCursos);
        setSelectedCurso("sin-seleccionar-curso")
        //Reiniciar demás variables. 
        setAutorizador("")
        setCupo(0)
        setCantidadHoras(0)
        setTutores([])
        setSelectedMedioInscripcion("sin-seleccionar-ministerio")
        setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
        setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")

    }


    // Estados para cursos

    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState("sin-seleccionar-curso");


    const handleSelectedCursoChange = async (event) => {
        const cursoSeleccionado = event.target.value;
        setSelectedCurso(cursoSeleccionado);


        if (cursoSeleccionado !== "sin-seleccionar-curso") {
            const autorizador = await getAutorizadorByCurso(cursoSeleccionado)
            setAutorizador(autorizador);

            //selectedCurso es el idCurso
            const listaInscripcionesCurso = await getInscripcionesByIdCurso(cursoSeleccionado);
            const dataUltimaInscripcion = await obtenerDatosUltimaInscripcion(listaInscripcionesCurso);

            setSelectedMedioInscripcion(dataUltimaInscripcion.medioDeInscripcion._id)
            setSelectedPlataformaDictado(dataUltimaInscripcion.plataformaDeDictado._id)
            setSelectedTipoCapacitacion(dataUltimaInscripcion.tipoDeCapacitacion._id)
            setCantidadHoras(dataUltimaInscripcion.cantidadHoras)
            setCupo(dataUltimaInscripcion.cupo)
            setTutores(dataUltimaInscripcion.tutores)
            setStartDateCurso(dataUltimaInscripcion.fechaInicioCurso)
            setEndDateCurso(dataUltimaInscripcion.fechaFinCurso)
            setStartDateInscripcion(dataUltimaInscripcion.fechaInicioInscripcion)
            setEndDateInscripcion(dataUltimaInscripcion.fechaFinInscripcion)
        } else {
            setAutorizador("")
            setSelectedMedioInscripcion("sin-seleccionar-ministerio")
            setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
            setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")
            setCantidadHoras(0)
            setCupo(0)
            setTutores([])
            setStartDateCurso("")
            setEndDateCurso("")
            setStartDateInscripcion("")
            setEndDateInscripcion("")
        }





    }

    //Estados de los medios de inscripcion

    const [mediosInscripcion, setMediosInscripcion] = useState([]);
    const [selectedMedioInscripcion, setSelectedMedioInscripcion] = useState("sin-seleccionar-medio-inscripcion");

    //Estados de las plataformas de dictado
    const [plataformasDictado, setPlataformasDictado] = useState([]);
    const [selectedPlataformaDictado, setSelectedPlataformaDictado] = useState("sin-seleccionar-plataforma-dictado");

    //Estados tipos de capacitacion
    const [tiposCapacitacion, setTiposCapacitacion] = useState([]);
    const [selectedTipoCapacitacion, setSelectedTipoCapacitacion] = useState("sin-seleccionar-tipo-capacitacion");

    //Estados para cantidad de horas
    const [cantidadHoras, setCantidadHoras] = useState(0);

    //Estados para cantidad de cupo
    const [cupo, setCupo] = useState(0);

    //Estados lista de tutores de la última inscripcion del curso.

    const [tutores, setTutores] = useState([]);


    // Estados para autorizadores

    const [autorizador, setAutorizador] = useState();

    //Estados para check tutores
    const [selectedTutores, setSelectedTutores] = useState([]);




    const handleCupoChange = (event) => {
        setCupo(event.target.value);
    }

    const handleCantidadHorasChange = (event) => {
        setCantidadHoras(event.target.value);
    }

    const handleMedioInscripcionChange = (event) => {
        setSelectedMedioInscripcion(event.target.value);
    }

    const handleSelectedPlataformaDictadoChange = (event) => {
        setSelectedPlataformaDictado(event.target.value);
    }

    const handleSelectedTipoCapacitacionChange = (event) => {
        setSelectedTipoCapacitacion(event.target.value);
    }

    const handleTutorChange = (event) => {
        const tutorSeleccionado = event.target.value;

        // Verifica si el tutor ya está en la lista de seleccionados
        const isSelected = selectedTutores.includes(tutorSeleccionado);

        // Actualiza el estado según la acción del usuario
        if (isSelected) {
            // Si ya está seleccionado, quítalo de la lista
            setSelectedTutores(selectedTutores.filter(tutor => tutor !== tutorSeleccionado));
        } else {
            // Si no está seleccionado, agrégalo a la lista
            setSelectedTutores([...selectedTutores, tutorSeleccionado]);
        }
    };


    //Manejador de modal para buscar tutores
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleOpenModal = () => {
        console.log("Formulario - HandleModalTutor: ", isOpenModal)
        setIsOpenModal(!isOpenModal);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }


    const handleAgregarTutor = (tutor) => {

        if (!tutores.includes(tutor)) {
            setTutores([...tutores, tutor])
        }

    }

    // Estados para agregar ministerio

    const [isOpenModalAgregarMinisterio, setModalAgregarMinisterio] = useState(false);

    const handleCloseModalAgregagrMinisterio = async (nuevoMinisterio) => {
        setModalAgregarMinisterio(false);
        // Al un referente agregar un ministerio el cod será igual al idMinisterio. Luego esto deberá ser modificado por usuarios con permisos mas altos.
        if (nuevoMinisterio._id) {

            const ministerios = await getMinisterios();
            setMinisterios(ministerios);
            setSelectedMinisterio(nuevoMinisterio._id);

            setAreas([]);
            setCursos([])
            setSelectedCurso("sin-seleccionar-curso")
            setAutorizador("")
            setSelectedArea("sin-seleccionar-area")
            setCupo(0)
            setCantidadHoras(0)
            setTutores([])
            setSelectedMedioInscripcion("sin-seleccionar-ministerio")
            setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
            setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")
        }

    }

    //EStados para modal de área

    const [isOpenModalArea, setModalArea] = useState(false);


    const handleOnCloseModalArea = async (nuevaArea, idMinisterio) => {

        if (nuevaArea._id) {
            setModalArea(false)

            setSelectedMinisterio(idMinisterio);

            const areas = await getAreasByMinisterio(idMinisterio)
            setAreas(areas)
            setSelectedArea(nuevaArea._id);
            //Reiniciamos 
            setCursos([])
            setSelectedCurso("sin-seleccionar-curso")
            setAutorizador("")
            setCupo(0)
            setCantidadHoras(0)
            setTutores([])
            setSelectedMedioInscripcion("sin-seleccionar-ministerio")
            setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
            setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")
        } else {
            setModalArea(false)
        }
    }



    // Estado para manejar modal de agregar curso

    const [isOpenModalAgregarCurso, setModalAgregarCurso] = useState(false);

    const handleCloseModalAgregagrCurso = async (nuevoCurso, idMinisterio, idArea) => {
        setModalAgregarCurso(false);

        if (nuevoCurso._id) {
            try {
                setSelectedMinisterio(idMinisterio);
                const areas = await getAreasByMinisterio(idMinisterio)

                setAreas(areas)
                setSelectedArea(idArea);

                const cursos = await getCursosByArea(idArea)
                setCursos(cursos)
                setSelectedCurso(nuevoCurso._id)

                const autorizador = await getAutorizadorByCurso(nuevoCurso._id)
                setAutorizador(autorizador);
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
    }


    //Manejar estados de Modal agregar usuarios

    const [isOpenModalAgregarAutorizador, setIsOpenModalAgregarAutorizador] = useState(false);
    const handleCloseModalAgregagrAutorizador = () => {
        setIsOpenModalAgregarAutorizador(false);
    }

    //Manejar estados de Modal agregar tutor
    const [isOpenModalAgregarTutor, setIsOpenModalAgregarTutor] = useState(false);
    const handleCloseModalAgregagrTutor = (nuevoTutor) => {
        setIsOpenModalAgregarTutor(false);
    }


    //Enviar formulario

    const handleEnviarFormulario = async () => {
        try {




            const inscripcion = {
                curso: selectedCurso,
                fechaInicioCurso: formatearFecha(startDateCurso),
                fechaFinCurso: formatearFecha(endDateCurso),
                fechaInicioInscripcion: formatearFecha(startDateInscripcion),
                fechaFinInscripcion: formatearFecha(endDateInscripcion),
                cupo: cupo,
                cantidadHoras: cantidadHoras,
                medioDeInscripcion: selectedMedioInscripcion,
                plataformaDeDictado: selectedPlataformaDictado,
                tipoDeCapacitacion: selectedTipoCapacitacion,
                tutores: selectedTutores,
            }


            const nuevaInscripcion = await crearNuevaInscripcion(inscripcion);
            const nuevaInscripcionPoblada = await getInscripcionById(nuevaInscripcion._id)
            const res = await agregarNuevaInscripcionAExcel(nuevaInscripcionPoblada);

            console.log(res)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Inscripción creada con exito',
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });

            // EL referente se carga desde el lado del servidor directamente. Esto es así ya que el referente se decide que será siempre el usuario que carga la inscripción. 


            setSelectedMinisterio("sin-seleccionar-ministerio");
            setAreas([]);
            setSelectedArea("sin-seleccionar-area")
            setCursos([])
            setSelectedCurso("sin-seleccionar-curso")
            setAutorizador("")
            setCupo(0)
            setCantidadHoras(0)
            setTutores([])
            setSelectedMedioInscripcion("sin-seleccionar-ministerio")
            setSelectedPlataformaDictado("sin-seleccionar-plataforma-de-dictado")
            setSelectedTipoCapacitacion("sin-seleccionar-tipo-de-capacitacion")
            setEndDateCurso("")
            setStartDateCurso("")
            setEndDateInscripcion("")
            setStartDateInscripcion("")


        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Error al intentar crear la inscripción",
                showConfirmButton: false,
                timer: 3000,
                backdrop: false,
            });
        }
    }
    //COn use Effect de esta manera logro que las funciones que lo contiene se ejecutan al principio del render, luego no se vuelve a ejecutar.
    useEffect(() => {
        (async function () {


            try {
                const inscripcionesNuevas = await getInscripciones();

                console.log("Formulario - Inscripciones: ", inscripcionesNuevas)

                setInscripciones(inscripcionesNuevas);

                const ministeriosNuevos = await getMinisterios();
                setMinisterios(ministeriosNuevos);

                console.log("Formulario - Ministerio Nuevo: ", ministeriosNuevos)

                const mediosInscripcion = await getMediosDeInscripcion();
                setMediosInscripcion(mediosInscripcion);
                console.log("Formulario - medios de inscripción: ", mediosInscripcion)


                const plataformasDictadoNuevo = await getPlataformasDeDictado()
                setPlataformasDictado(plataformasDictadoNuevo)
                console.log("Formulario - plataformas de dictado: ", plataformasDictadoNuevo)

                const tiposDeCapacitacionNuevos = await getTiposDeCapacitacion();
                setTiposCapacitacion(tiposDeCapacitacionNuevos)
                console.log("Formulario - tipos de capacitación: ", tiposDeCapacitacionNuevos)


            } catch (error) {


                setError(error);
                // Cartel sweet alert de error.
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 3000,
                    backdrop: false,
                });


            }

        })()
    }, []);






    return (
        <div>
            <ModalAgregarMinisterio
                isOpen={isOpenModalAgregarMinisterio}
                onClose={handleCloseModalAgregagrMinisterio}

            />
            <ModalAgregarArea
                isOpen={isOpenModalArea}
                onClose={handleOnCloseModalArea}
                ministerios={ministerios}
            />

            <ModalAgregarCurso
                isOpen={isOpenModalAgregarCurso}
                onClose={handleCloseModalAgregagrCurso}
                ministerios={ministerios}
                abrirDesdeOtroModal = {() => setModalAgregarCurso(true)}
            />

            <ModalAgregarAutorizador
                isOpen={isOpenModalAgregarAutorizador}
                onClose={handleCloseModalAgregagrAutorizador}
                
            />

            <ModalBuscarTutor
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                onSelectTutor={handleAgregarTutor}
            />

            <ModalAgregarTutor
                isOpen={isOpenModalAgregarTutor}
                onClose={handleCloseModalAgregagrTutor}
            />
            <div className="container">

                <form onSubmit={(e) => e.preventDefault()}>
                    <h5>FORMULARIO DE INSCRIPCION</h5>
                    <div className="datos-principales">


                    </div>
                    <div className="datos-curso">
                        <h6>DATOS DEL CURSO</h6>


                        <div className="form-group">
                            <label htmlFor="ministerio" className="form-label mt-4">
                                Ministerio
                            </label>
                            <button
                                className="buttonIcon"
                                style={{ backgroundImage: 'url(../img/editar.png)' }}

                            >
                            </button>
                            <button
                                className="buttonIcon"
                                style={{ backgroundImage: 'url(../img/agregar.png)' }}
                                onClick={() => setModalAgregarMinisterio(true)}

                            >
                            </button>
                           

                            <select className="form-select" id="ministerio" value={selectedMinisterio} onChange={handleSelectedMinisterioChange}>
                                <option value="sin-seleccionar-ministerio">Seleccione un Ministerio</option>
                                {ministerios && ministerios.length > 0 && ministerios.map((ministerio) => (
                                    // Ministerio[0] es el cod ejemplo: MEPPP ; Ministerio[1] es el nombre Ministerio de Empleo Plan Primer Paso
                                    <option key={ministerio.cod} value={ministerio._id}>
                                        {ministerio.nombre}
                                    </option>
                                ))}
                            </select>
                                    

                        </div>
                        <div className="form-group">
                            <label htmlFor="area" className="form-label mt-4">
                                Área
                            </label>
                            <button className="buttonIcon" style={{ backgroundImage: 'url(../img/editar.png)' }}></button>
                            <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)' }} onClick={() => setModalArea(true)}></button>
                            <select className="form-select" id="area" value={selectedArea} onChange={handleSelectedAreaChange}>
                                <option value="sin-seleccionar-area" >Seleccione un Ministerio</option>
                                {
                                    areas && areas.length > 0 && areas.map((area) => (
                                        <option key={area._id} value={area._id}>
                                            {area.nombre}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="curso" className="form-label mt-4">
                                Curso
                            </label>
                            <button className="buttonIcon" style={{ backgroundImage: 'url(../img/editar.png)' }}></button>
                            <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)' }} onClick={() => setModalAgregarCurso(true)}></button>
                            <select className="form-select" id="curso" value={selectedCurso} onChange={handleSelectedCursoChange}>
                                <option value="sin-seleccionar-curso" >Seleccione un Ministerio</option>
                                {
                                    cursos && cursos.length > 0 && cursos.map((curso) => (
                                        <option key={curso._id} value={curso._id}>
                                            {curso.nombre}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>

                        <fieldset className="form-group">
                            <div className="card border-primary mb-3" style={{ maxWidth: "20rem", marginTop: "20px" }}>
                                <div className="card-header">Autorizador del Curso</div>
                                <div className="card-body">
                                    <h4 className="card-title">{autorizador && autorizador.nombre + ", " + autorizador.apellido}</h4>
                                    <p className="card-text">
                                        {autorizador && autorizador.descripcion}
                                    </p>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/editar.png)', backgroundColor: 'white' }}></button>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)', backgroundColor: 'white' }} onClick={() => setIsOpenModalAgregarAutorizador(true)}></button>
                                </div>
                            </div>

                        </fieldset>




                    </div>
                    {/* Fin datos-curso */}
                    <div className="datos-curso">
                        <h6>DATOS DE INSCRIPCIÓN</h6>
                        <div className="detalle-inscripcion">
                            <div className="fecha-cupo-cantidad">
                                <div className="form-group">
                                    <label htmlFor="fechaInscripcion" className="form-label mt-4">
                                        Fecha de Inscripción:
                                    </label>
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={startDateInscripcion}
                                        endDate={endDateInscripcion}
                                        onChange={handleDateChangeInscripcion}
                                        filterDate={filterDate}
                                        withPortal
                                        dateFormat="yyyy/MM/dd"
                                        isClearable
                                        className="custom-date-picker"
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="fechaInscripcion" className="form-label mt-4">
                                        Fecha de Cursada:
                                    </label>
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={startDateCurso}
                                        endDate={endDateCurso}
                                        onChange={handleDateChangeCurso}
                                        filterDate={filterDate}
                                        withPortal
                                        dateFormat="yyyy/MM/dd"
                                        isClearable
                                        className="custom-date-picker"

                                    />

                                </div>


                                <label className="form-label mt-4" htmlFor="readOnlyInput">
                                    Cupo
                                </label>
                                <input
                                    className="form-control"
                                    id="readOnlyInput"
                                    type="number"
                                    placeholder="Cupo máximo del curso"
                                    readOnly=""
                                    value={cupo && cupo}
                                    onChange={handleCupoChange}

                                />

                                <label className="form-label mt-4" htmlFor="readOnlyInput">
                                    Cantidad de Horas
                                </label>
                                <input
                                    className="form-control"
                                    id="readOnlyInput"
                                    type="number"
                                    placeholder="Cantidad estimada de horas..."
                                    readOnly=""
                                    value={cantidadHoras && cantidadHoras}
                                    onChange={handleCantidadHorasChange}

                                />

                                <label htmlFor="mediosInscripcion" className="form-label mt-4">
                                    Medio de Inscripción
                                </label>
                                <select className="form-select" id="medioInscripcion" value={selectedMedioInscripcion} onChange={handleMedioInscripcionChange}>
                                    <option value="sin-seleccionar-ministerio">Seleccionar</option>
                                    {
                                        mediosInscripcion && mediosInscripcion.length > 0 && mediosInscripcion.map((medio) => (
                                            <option key={medio._id} value={medio._id}>
                                                {medio.nombre}
                                            </option>
                                        ))
                                    }
                                </select>

                            </div>

                            <div className="tutores-otros">
                                <div className="form-group">
                                    <label htmlFor="ministerio" className="form-label mt-4">
                                        Plataforma de Dictado
                                    </label>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/editar.png)' }}></button>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)' }}></button>
                                    <select className="form-select" id="plataforma-dictado" value={selectedPlataformaDictado} onChange={handleSelectedPlataformaDictadoChange}>
                                        <option value={"sin-seleccionar-plataforma-dictado"}>Seleccionar</option>
                                        {
                                            plataformasDictado && plataformasDictado.length > 0 && plataformasDictado.map((plataforma) => (
                                                <option key={plataforma._id} value={plataforma._id}>
                                                    {plataforma.nombre}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ministerio" className="form-label mt-4">
                                        Tipo de Capacitación
                                    </label>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/editar.png)' }}></button>
                                    <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)' }}></button>
                                    <select className="form-select" id="ministerio" value={selectedTipoCapacitacion} onChange={handleSelectedTipoCapacitacionChange}>
                                        <option value={"sin-seleccionar-tipo-capacitacion"}>Seleccionar</option>
                                        {
                                            tiposCapacitacion && tiposCapacitacion.length > 0 && tiposCapacitacion.map((tipoCapacitacion) => (
                                                <option key={tipoCapacitacion._id} value={tipoCapacitacion._id}>
                                                    {tipoCapacitacion.nombre}
                                                </option>
                                            ))
                                        }

                                    </select>
                                </div>

                                <div className="form-group">
                                    <fieldset className="form-group">
                                        <label style={{ fontSize: '30px' }} htmlFor="ministerio" className="form-label mt-4">
                                            Tutores
                                        </label>
                                        <button className="buttonIcon" style={{ backgroundImage: 'url(../img/agregar.png)' }} onClick={() => setIsOpenModalAgregarTutor(true)}></button>

                                        {
                                            tutores && tutores.length > 0 && tutores.map((tutor) => (

                                                <div className="form-check" key={tutor._id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                        value={tutor._id}
                                                        onChange={handleTutorChange}


                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {tutor.nombre + ", " + tutor.apellido}
                                                    </label>
                                                </div>



                                            ))
                                        }

                                        <button className="buttonIcon" id="btnAgregarTutor" name="btnAgregarTutor" style={{ backgroundImage: 'url(../img/agregarTutor.png)' }} onClick={handleOpenModal}></button>



                                    </fieldset>



                                </div>



                            </div>

                        </div>
                        {/* Fin detalle-inscripcion */}






                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-lg btn-primary" type="button" onClick={handleEnviarFormulario}>
                            Enviar
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );

}

