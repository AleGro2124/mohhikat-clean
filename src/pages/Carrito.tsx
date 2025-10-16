import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 Calcular envío automáticamente cuando cambia el CP
  useEffect(() => {
    const calcularEnvio = async () => {
      if (checkoutData.codigoPostal.length >= 5) {
        setCalculating(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/calculate-shipping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postalCode: checkoutData.codigoPostal }),
          });
          const data = await response.json();
          if (data.shippingCost !== undefined) {
            setShippingCost(data.shippingCost);
          } else {
            setShippingCost(null);
          }
        } catch (err) {
          console.error("Error al calcular envío:", err);
          setShippingCost(null);
        } finally {
          setCalculating(false);
        }
      } else {
        setShippingCost(null);
      }
    };
    calcularEnvio();
  }, [checkoutData.codigoPostal]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
          })),
          customer: checkoutData,
          shippingCost: shippingCost || 0,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al crear la sesión de pago.");
      }
    } catch (err) {
      console.error("Error de pago:", err);
      alert("Ocurrió un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-8">
            Agrega productos para comenzar tu compra
          </p>
          <Link to="/">
            <Button size="lg">Ver productos</Button>
          </Link>
        </div>
      </main>
    );
  }

  const totalConEnvio = total + (shippingCost || 0);

  return (
    <main className="flex-1 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        {!showCheckout ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 🛒 Productos */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {item.type === "subscription"
                            ? "Suscripción mensual"
                            : "Compra única"}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">MXN</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 🧾 Resumen */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)} MXN</span>
                  </div>

                  {shippingCost !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold">
                        {calculating
                          ? "Calculando..."
                          : shippingCost === 0
                          ? "Gratis"
                          : `$${shippingCost.toFixed(2)} MXN`}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">
                        ${totalConEnvio.toFixed(2)} MXN
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceder al pago
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Datos de envío y pago</CardTitle>
              <CardDescription>
                Completa tus datos y confirma tu pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={checkoutData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={checkoutData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={checkoutData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={checkoutData.direccion}
                    onChange={handleChange}
                    required
                    placeholder="Calle y número"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ciudad">Ciudad *</Label>
                    <Input
                      id="ciudad"
                      name="ciudad"
                      value={checkoutData.ciudad}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="codigoPostal">Código Postal *</Label>
                    <Input
                      id="codigoPostal"
                      name="codigoPostal"
                      value={checkoutData.codigoPostal}
                      onChange={handleChange}
                      required
                    />
                    {shippingCost !== null && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {calculating
                          ? "Calculando envío..."
                          : shippingCost === 0
                          ? "🚚 Envío gratis disponible en tu zona"
                          : `Costo de envío: $${shippingCost.toFixed(2)} MXN`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-bold">Total a pagar:</span>
                    <span className="font-bold text-primary">
                      ${totalConEnvio.toFixed(2)} MXN
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCheckout(false)}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Procesando..." : "Pagar con tarjeta 💳"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
