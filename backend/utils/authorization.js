
export const authorization = (listaRolesAceptados) => { 
    return async (req, res, next) => {
        
        if (!req.user) {
            
            return res.status(401).send({ error: 'User no autorizado' })
        }
        
        
        if ( !listaRolesAceptados.includes(req.user.user.rol) && !listaRolesAceptados.includes('todos') ) {
            
            return res.status(403).send({ error: 'Usuario no tiene los permisos necesarios' })
        }

        
        
        next()
    }
}