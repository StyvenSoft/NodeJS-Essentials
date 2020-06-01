# Express Routes

LESSON

Learn about Express routes and how to write them.

![drawing](URSELF.JPG)

## Matching Route Paths

Express intenta hacer coincidir las solicitudes por ruta, lo que significa que si enviamos una solicitud a <server address>:<port number>/api-endpoint, el servidor Express buscará en cualquier ruta registrada en orden e intentará hacer coincidir /api-endpoint.

![drawing](REQUEST.JPG)

## Matching Longer Paths

Los parámetros de ruta coincidirán con cualquier cosa en su parte específica de la ruta, por lo que una coincidencia de ruta coincidirá /monsters/:name

![drawing](REQUEST1.JPG)

## Matching By HTTP Verb

Express coincide con las rutas utilizando la ruta y el verbo del método HTTP. En el diagrama de abajo, vemos una solicitud con un verbo PUT y /expressions(recuerde que la consulta no es parte de la ruta de ruta).

![drawing](REQUEST2.JPG)