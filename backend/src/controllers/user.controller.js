import { userModel } from "../models/user.models.js";


export const getUsers = async (req, res) => {
    try {

        const {cuil, nombre, apellido, correo, cel, rol} = req.query;

        let query = {}

        if(cuil) query.cuil = cuil
        if(nombre) query.nombre = nombre
        if(apellido) query.apellido = apellido
        if(correo) query.correo = correo
        if(cel) query.cel = cel
        if(rol) query.rol = rol


        const usuarios = await userModel.find(query).sort('apellido')
        
        if(usuarios) {
            res.status(200).json(usuarios);
        } else {
            res.status(404).json({
                message: 'No se encontraron usuarios'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: `Consulta de error: ${error}`
        });
    }
}

export const getUserByCuil = async (req, res) => {
    try {
        const { cuil } = req.params;

        let query = {}
        if(cuil) query.cuil = cuil
        
        const user = await userModel.findOne(query);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: `El usuario con Cuil: ${cuil} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el usuario',
            error: `Consulta de error: ${error}`
        });
    }
}

export const postUser = async (req, res) => {
    res.status(200).json(req.user);
}

export const updatedUserByCuil = async (req, res) => {
    try {
        const { cuil } = req.params;
        const {  nombre, apellido, correo, cel, rol } = req.body;
        const updatedUser = await userModel.findOneAndUpdate({ cuil }, { cuil, nombre, apellido, correo, cel, rol }, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({
                message: `El usuario con cuil: ${cuil} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: `Consulta de error: ${error}`
        });
    }
}


export const deleteUserByCuil = async (req, res) => {
    try {
        const { cuil } = req.params;
        const deletedUser = await userModel.findOneAndDelete({ cuil });
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({
                message: `El usuario con cuil: ${cuil} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: `Consulta de error: ${error}`
        });
    }
}
