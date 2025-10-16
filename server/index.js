import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

app.use(cors());
app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json());

// ✅ Crear sesión de checkout
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, shippingCost } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Añadir costo de envío (si aplica)
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
      mode: "payment",
     success_url: "https://mohhikat.vercel.app/success",
     cancel_url: "https://mohhikat.vercel.app/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creando sesión de pago:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});

// 📦 Calcular envío
app.post("/calculate-shipping", (req, res) => {
  const { postalCode } = req.body;

  if (!postalCode) return res.status(400).json({ error: "Código postal requerido" });

  const withinCDMX = /^5[0-4]/.test(postalCode);
  const nearCDMX = /^55|^56|^57/.test(postalCode);
  const otherStates = !withinCDMX && !nearCDMX;

  let cost = 0;
  if (withinCDMX) cost = 0;
  else if (nearCDMX) cost = 80;
  else if (otherStates) cost = 140;

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
      console.log("✅ Pago completado:", event.data.object.id);
      break;
    default:
      console.log(`ℹ️ Evento no manejado: ${event.type}`);
  }

  res.json({ received: true });
});

// 🚀 Escuchar en el puerto asignado por Render
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
