const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de sockets
io.on('connection', client => {
  
    console.log('Cliente conectado');
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autenticacion
    if ( !valido ) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario en una sala especifica
    // Sala Global, client.id, 
    client.join( uid );

    // Escuchar el mensaje personal
    client.on('mensaje-personal', async (payload) => {
      // Todo:
      await grabarMensaje( payload );
      io.to( payload.para ).emit('mensaje-personal', payload );

    });

    

  
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
     });

   //   client.on('mensaje', ( payload ) => {
   //      console.log('Mensaje', payload);
   //      io.emit('mensaje', { admin: 'Nuevo mensaje'})

   //   })

});