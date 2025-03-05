const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

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

    const formattedOrder = {
      id: nextId,
      food: newOrder.food,
      table: newOrder.table,
      zone: newOrder.zone,
      striked: false
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
