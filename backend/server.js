const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para agregar un nuevo pedido
app.post("/api/orders", (req, res) => {
  const filePath = path.join(__dirname, "pedidos.json");
  const newOrder = req.body;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    let orders = JSON.parse(data);

    // Generar un ID único para el nuevo pedido
    const nextId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

    // Crear el nuevo pedido con el orden correcto
    const formattedOrder = {
      id: nextId, // Se genera el ID automáticamente
      food: newOrder.food,
      table: newOrder.table,
      zone: newOrder.zone,
      striked: false
    };

    // Agregar el nuevo pedido a la lista
    orders.push(formattedOrder);

    // Escribir los pedidos actualizados en el archivo
    fs.writeFile(filePath, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error al escribir en el archivo:", writeErr);
        return res.status(500).json({ error: "Error al escribir en el archivo" });
      }

      res.status(201).json(formattedOrder); // Enviar el nuevo pedido al cliente
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
