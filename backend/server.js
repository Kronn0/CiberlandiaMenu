const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todos los pedidos
app.get("/api/orders", (req, res) => {
  const filePath = path.join(__dirname, "pedidos.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    try {
      const orders = JSON.parse(data);
      res.status(200).json(orders); // Devolver la lista de pedidos
    } catch (parseErr) {
      console.error("Error al analizar el archivo JSON:", parseErr);
      res.status(500).json({ error: "Error al analizar el archivo JSON" });
    }
  });
});

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

    const nextId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

    // Incorporamos los nuevos parámetros al objeto del pedido
    const formattedOrder = {
      id: nextId,
      food: newOrder.food,
      foodImage: newOrder.foodImage || null,
      table: newOrder.table,
      zone: newOrder.zone,
      striked: false,
      orderDate: new Date().toISOString(), // Fecha y hora actuales en formato ISO
      completed: false,                   // Siempre falso al crear un nuevo pedido
      completedAt: null                   // Inicialmente nulo
    };

    orders.push(formattedOrder);

    fs.writeFile(filePath, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error al escribir en el archivo:", writeErr);
        return res.status(500).json({ error: "Error al escribir en el archivo" });
      }

      res.status(201).json(formattedOrder);
    });
  });
});

// Ruta para actualizar el estado "striked" de un pedido
app.put("/api/orders/:id", (req, res) => {
  const filePath = path.join(__dirname, "pedidos.json");
  const { id } = req.params;
  const updatedStriked = req.body.striked;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    let orders = JSON.parse(data);

    const orderIndex = orders.findIndex((order) => order.id === parseInt(id));
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    orders[orderIndex].striked = updatedStriked;

    fs.writeFile(filePath, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error al escribir en el archivo:", writeErr);
        return res.status(500).json({ error: "Error al escribir en el archivo" });
      }

      res.status(200).json(orders[orderIndex]);
    });
  });
});

// Ruta para servir imágenes estáticas
app.use('/images', express.static(path.join(__dirname, 'images')));

// Escuchar en todas las interfaces de red (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});

// Endpoint para servir el archivo menu.json
app.get("/api/menu", (req, res) => {
  const menuPath = path.join(__dirname, "menu.json");
  fs.readFile(menuPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer menu.json:", err);
      return res.status(500).json({ error: "No se pudo cargar el menú." });
    }

    const menu = JSON.parse(data);
    res.json(menu);
  });
});


// Ruta para actualizar la disponibilidad de un ítem en menu.json
app.put('/api/menu', (req, res) => {
  const menuPath = path.join(__dirname, 'menu.json');
  const { item, available } = req.body; // Recibe el nombre del ítem y su nuevo estado

  // Leer el archivo menu.json
  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer menu.json:', err);
      return res.status(500).send('Error en el servidor al leer el archivo.');
    }

    // Parsear el JSON
    let menu = JSON.parse(data);

    // Verificar si el ítem existe
    if (menu[item] === undefined) {
      return res.status(400).send(`El ítem "${item}" no existe en el menú.`);
    }

    // Actualizar la disponibilidad
    menu[item] = available;

    // Escribir los cambios en el archivo menu.json
    fs.writeFile(menuPath, JSON.stringify(menu, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en menu.json:', err);
        return res.status(500).send('Error en el servidor al actualizar el archivo.');
      }

      console.log(`Disponibilidad actualizada: ${item} -> ${available}`);
      res.send({ message: `Disponibilidad actualizada: ${item} -> ${available}` });
    });
  });
});

