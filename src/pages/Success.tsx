import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-background">
      <CheckCircle className="w-20 h-20 text-[#5ac4b3] mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        ¡Pago completado con éxito! 🎉
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Gracias por tu compra. Recibirás un correo de confirmación en unos momentos.
      </p>
      <Link to="/">
        <button className="bg-[#8b6cb7] text-white px-6 py-3 rounded-lg hover:bg-[#7a5ba8]">
          Volver al inicio
        </button>
      </Link>
    </main>
  );
}
