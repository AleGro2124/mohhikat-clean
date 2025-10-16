import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

app.use(cors());
app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json());

// 🧾 Crear checkout (normal o suscripción)
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, customer, shippingCost } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ error: "No hay productos." });

    // 🧠 Detectar si alguno es suscripción
    const isSubscription = items.some((item) => item.type === "subscription");

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
        recurring: item.type === "subscription" ? { interval: "month" } : undefined,
      },
      quantity: item.quantity,
    }));

    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "mxn",
          product_data: { name: "Costo de envío" },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: isSubscription ? "subscription" : "payment",
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
      customer_email: customer?.email || undefined,
      shipping_address_collection: { allowed_countries: ["MX"] },
      metadata: {
        nombre: customer?.nombre || "",
        telefono: customer?.telefono || "",
        direccion: customer?.direccion || "",
        ciudad: customer?.ciudad || "",
        codigoPostal: customer?.codigoPostal || "",
        tipoCompra: isSubscription ? "Suscripción mensual" : "Compra única",
      },
    });

    // 🗂️ Guardar orden local
    const ordersFile = "./orders.json";
    const existing = fs.existsSync(ordersFile)
      ? JSON.parse(fs.readFileSync(ordersFile, "utf8"))
      : [];
    existing.push({
      id: session.id,
      fecha: new Date().toISOString(),
      cliente: customer,
      productos: items,
      envio: shippingCost || 0,
      total: items.reduce((acc, i) => acc + i.price * i.quantity, 0) + (shippingCost || 0),
      tipo: isSubscription ? "Suscripción mensual" : "Compra única",
      url: session.url,
    });
    fs.writeFileSync(ordersFile, JSON.stringify(existing, null, 2));

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creando sesión de pago:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});

// 🚚 Calcular costo de envío
app.post("/calculate-shipping", (req, res) => {
  const { postalCode } = req.body;
  if (!postalCode) return res.status(400).json({ error: "Código postal requerido" });

  const cp = parseInt(postalCode);
  let cost = 0;

  if (postalCode.startsWith("54") || postalCode.startsWith("55") || postalCode.startsWith("56")) {
    cost = 0;
  } else if (postalCode.startsWith("50") || postalCode.startsWith("52") || postalCode.startsWith("53") || postalCode.startsWith("57")) {
    cost = 60;
  } else if (cp >= 10000 && cp <= 19999) {
    cost = 80;
  } else if (cp >= 20000 && cp <= 63999) {
    cost = 120;
  } else if (cp >= 64000 && cp <= 79999) {
    cost = 160;
  } else if (cp >= 80000) {
    cost = 180;
  }

  res.json({ shippingCost: cost });
});

// 📩 Webhook Stripe
app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Webhook verification failed:", err.message);
    return res.sendStatus(400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("✅ Pago completado:", session.id);
      break;
    case "invoice.payment_succeeded":
      console.log("🔁 Renovación mensual exitosa:", event.data.object.id);
      break;
    case "invoice.payment_failed":
      console.log("⚠️ Error al cobrar renovación mensual:", event.data.object.id);
      break;
    default:
      console.log(`ℹ️ Evento no manejado: ${event.type}`);
  }

  res.json({ received: true });
});

// 🚀 Servidor
app.listen(4242, () => {
  console.log("🚀 Servidor escuchando en http://localhost:4242");
});
