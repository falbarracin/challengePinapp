const Cliente = require('../models/customerModel');
const { verifyConnection } = require('../models/index'); 

// POST creacliente
module.exports.creaCliente = async (event,res) => {   
    try{
        console.log('Datos recibidos:', event.body); 
        const { nombre, apellido, edad, fechaNacimiento } = (event.body);
        
        if(nombre && apellido && edad && fechaNacimiento){
            console.log("Ejecuta create", nombre);
            
            await Cliente.create({ nombre: nombre, apellido: apellido, edad: edad, fechaNacimiento: fechaNacimiento }).then(cliente => {
                console.log("cliente creado")
                res.status(201).json({
                    message: 'Cliente creado exitosamente',
                    cliente,
                  });
            });        
         
        }
        else{           
            res.status(400).json({
                message: 'Bad Request'
              });          
        }
  
       
    }
    catch(error){
        res.status(500).json({
            message: 'Ocurrio un inconveniente'
          });        
    }
 
};

// GET kpideclientes
module.exports.kpideClientes = async (event,res) => {
    try{
        const clientes = await Cliente.findAll();
  
        const totalEdad = clientes.reduce((sum, cliente) => sum + cliente.edad, 0);
        const promedioEdad = totalEdad / clientes.length;

        const varianza = clientes.reduce((sum, cliente) => sum + Math.pow(cliente.edad - promedioEdad, 2), 0) / clientes.length;
        const desviacionEstandar = Math.sqrt(varianza);

        res.status(200).json({
            promedioEdad,
            desviacionEstandar
         });  
    }
    catch(error){
        res.status(500).json({
            message: 'Ocurrio un inconveniente'
          });    
    }  
};

// GET listclientes
module.exports.listClientes = async (event,res) => {
    try{
        console.log("Entra get list");
        const clientes = await Cliente.findAll();
        const expectativaDeVida = 80; 
        const clientesResult= clientes.map(cliente => {                     
            const fechaProbableDeMuerte = new Date(cliente.fechaNacimiento);
            fechaProbableDeMuerte.setFullYear(fechaProbableDeMuerte.getFullYear() + expectativaDeVida);        
            return {
            ...cliente.toJSON(),
            fechaProbableDeMuerte,
            };
        });

        console.log("calculo clientes: ", clientesResult);

        res.status(200).json({
            clientesResult
          });      
    }
    catch(error){
        res.status(500).json({
            message: 'Ocurrio un inconveniente'
          });     
    }  
};

