import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <XCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Pago cancelado ❌</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Tu pago fue cancelado. Puedes volver al carrito y completar la compra cuando desees.
      </p>
      <Link to="/carrito">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
          Volver al carrito
        </button>
      </Link>
    </main>
  );
}
