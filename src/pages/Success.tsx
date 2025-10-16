import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
      <h1 className="text-4xl font-bold mb-4">¡Pago completado con éxito! 🎉</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Gracias por tu compra. Recibirás un correo de confirmación en unos momentos.
      </p>
      <Link to="/">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
          Volver al inicio
        </button>
      </Link>
    </main>
  );
}
