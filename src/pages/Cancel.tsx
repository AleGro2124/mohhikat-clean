import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-background">
      <XCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Pago cancelado ❌
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Tu pago fue cancelado. Puedes volver al carrito y completar la compra cuando desees.
      </p>
      <Link to="/carrito">
        <button className="bg-[#5ac4b3] text-white px-6 py-3 rounded-lg hover:bg-[#4ca89a]">
          Volver al carrito
        </button>
      </Link>
    </main>
  );
}
