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