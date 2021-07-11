const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'apross',
    port: '5432'
});
const getUsers2 = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios WHERE origen = $1', [req.query.q]);
    const rows = response.rows
    let html = `
<head>
    <title>Base de datos</title>
    <link rel="stylesheet" type="text/css" href="/style/style.css">
</head>
    <body>
        <div id="franja">
        <img id="image" src="/style/apross.jpg">
        </div>
    <table>
        <thead>
              <tr>
                <th>Nombre y Apellido</th>
                <th>Origen</th>
                <th>Empadronamiento</th>
                <th>Afiliaciones</th>
                <th>Medicamentos</th>
               </tr>
        </thead>
            <tbody>
                ${rows.map((row) => `
                    <tr>
                        <td>${row.nombre}</td>
                        <td>${row.origen}</td>
                        <td>${row.empadronamiento}</td>
                        <td>${row.vacunas}</td>
                        <td>${row.vias_de_excepcion}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </body>
    `
    res.send(html);
}; 

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [req.query.q]);
    const rows = response.rows
    let html = `
<head>
    <title>Base de datos</title>
    <link rel="stylesheet" type="text/css" href="/style/style.css">
</head>
    <body>
        <div id="franja">
        <img id="image" src="/style/apross.jpg">
        </div>
    <table>
        <thead>
              <tr>
                <th>Nombre y Apellido</th>
                <th>Origen</th>
                <th>Empadronamiento</th>
                <th>Afiliaciones</th>
                <th>Medicamentos</th>
               </tr>
        </thead>
            <tbody>
                ${rows.map((row) => `
                    <tr>
                        <td>${row.nombre}</td>
                        <td>${row.origen}</td>
                        <td>${row.empadronamiento}</td>
                        <td>${row.vacunas}</td>
                        <td>${row.vias_de_excepcion}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </body>
    `
    res.send(html);
}; 

const createUser = async (req, res) => {
    const { nombre, origen, empadronamiento, vacunas, vias_de_excepcion } = req.body;
    const response = await pool.query('INSERT INTO usuarios (nombre, origen, empadronamiento, vacunas, vias_de_excepcion) VALUES ($1, $2, $3, $4, $5)', [nombre, origen, empadronamiento, vacunas, vias_de_excepcion]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {nombre, origen, empadronamiento, vacunas, vias_de_excepcion}
        }
    })
};

const updateUser = async (req, res) => {
    const { nombre, origen, empadronamiento } = req.body;
    const response = await pool.query('UPDATE usuarios SET origen = $1, empadronamiento = $2, vacunas = $3 WHERE nombre = $4', [
        nombre,
        origen,
        empadronamiento,
    ])
    console.log(response);
    res.json('Usuario actualizado');
};

const deleteUser = async (req, res) => {
    const { nombre } = req.body
    const response = await pool.query('DELETE FROM usuarios WHERE nombre = $1', [nombre]);
    console.log(response);
    res.json('Usuario actualizado');
};

const getAll = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios');
    const rows = response.rows
    console.log(rows);
    let html = `
<head>
    <title>Base de datos</title>
    <link rel="stylesheet" type="text/css" href="/style/style.css">
</head>
    <body>
        <div id="franja">
        <img id="image" src="/style/apross.jpg">
        </div>
    <table id="tabla">
        <thead>
              <tr>
                <th>Nombre y Apellido</th>
                <th>Origen</th>
                <th>Empadronamiento</th>
                <th>Afiliaciones</th>
                <th>Medicamentos</th>
                <th></th>
               </tr>
        </thead>
            <tbody>
                ${rows.map((row) =>
                    `
                    <tr>
                        <td id="solution">${row.nombre}</td>
                        <td>${row.origen}</td>
                        <td>${row.empadronamiento}</td>
                        <td>${row.vacunas}</td>
                        <td>${row.vias_de_excepcion}</td>
                        <td><input type=image src="/style/trash.png" style= "width: 27px; height: 27px;" value="Eliminar" id="delete_button"></td>
                    </tr>
                `).join('')}
            </tbody>
    </table>
        <script>
            let button = document.getElementById('delete_button');

            button.addEventListener('click', function(e) {
                let name = document.getElementById('solution').innerHTML;
                let dato = {
                    nombre: name,
                };

                let myJson = JSON.stringify(dato);
                let xhr = new XMLHttpRequest();
        
                xhr.open("DELETE", "http://localhost:3000/users/:nombre");
                xhr.setRequestHeader("content-type", "application/json");
                xhr.send(myJson);
                window.location.href = 'http://localhost:3000/all_users';
            });
        </script>
    </body>
    `
    res.send(html);
}; 


module.exports = {
    getUsers,
    getUsers2,
    createUser,
    deleteUser,
    updateUser,
    getAll
}
