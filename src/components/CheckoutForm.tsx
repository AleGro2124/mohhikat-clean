import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // 1️⃣ Crear PaymentIntent en backend
    const res = await fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await res.json();

    // 2️⃣ Confirmar pago con Stripe
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setError(error.message || "Error procesando el pago");
    } else if (paymentIntent?.status === "succeeded") {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">✅ Pago completado correctamente</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Procesando..." : `Pagar ${(amount / 100).toFixed(2)} MXN`}
      </button>
    </form>
  );
};
