TO-DO: Añadir los schemas a todos los controladores
TO-DO: comprobar que todos los nombres de las columnas de la BBDD estén actualizados en los archivos de código
TO-DO: usersRoutes línea 25 será PATCH, pero no hasta que no tengamos front-end (editado)

TO-DO: añadir ruta de usuario
router.post('/api/users/hostregister', ....);
no requiere autenticación. Una empresa ha de solicitar el alta al administrador. El controlador (le dejo el nombre a Rodri, pero debería ser algo tipo: nuevaSolicitudDeHotsController) recibe en el body los mismos datos que recibiría un addUserController, pero en lugar de llamar al modelo que lo graba en la base de datos, manda un mail a procces.env.ADMIN_USER_EMAIL

TO-DO: añadir ruta de usuario:
router.post('/api/users/addhost', authAdminController, newUserController);
sí, usamos la misma función que para registrar a un usuario comun, pero al poner el middleware de authAdminController, solo puede ejecutarla el administrador

TO DO: Crear funcion  const inscription = await createHackathonInscriptionModel(hackathonId, userId);
TO DO: Crear funcion const hackathons = await getAllHackathonsModel(req.body);
TO DO: Crear funcion const technologies = await getHackathonTechnologies();
TO DO: Crear funcion const hackathon=getHackathonById(hackathonId)
