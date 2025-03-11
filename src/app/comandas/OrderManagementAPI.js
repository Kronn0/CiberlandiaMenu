const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para obtener todos los pedidos
app.get("/api/orders", (req, res) => {
  const filePath = path.join(__dirname, "pedidos.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    const orders = JSON.parse(data);
    res.json(orders);
  });
});

// Ruta para actualizar un pedido (modificar "striked")
app.put("/api/orders/:id", (req, res) => {
  const filePath = path.join(__dirname, "pedidos.json");
  const orderId = parseInt(req.params.id, 10);
  const { striked } = req.body;

  // Leer el archivo de pedidos
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    let orders = JSON.parse(data);

    // Encuentra el pedido y actualiza "striked"
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].striked = striked;

      // Escribir nuevamente en el archivo
      fs.writeFile(filePath, JSON.stringify(orders, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error al escribir en el archivo:", writeErr);
          return res.status(500).json({ error: "Error al escribir en el archivo" });
        }

        res.json(orders[orderIndex]);
      });
    } else {
      res.status(404).json({ error: "Pedido no encontrado" });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});