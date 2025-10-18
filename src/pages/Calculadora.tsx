import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import calcBg from "@/assets/calculadora-bg.jpg"; // 🐱 imagen de fondo

export default function Calculadora() {
  const [gatos, setGatos] = useState("1");
  const [tamano, setTamano] = useState("mediano");
  const [frecuencia, setFrecuencia] = useState("diario");
  const [tipo, setTipo] = useState("normal");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const numGatos = parseInt(gatos);

    // Base en kg por gato al mes
    const basePorGato = 6;

    // Multiplicadores
    const multTamano =
      tamano === "pequeño" ? 0.8 : tamano === "mediano" ? 1 : 1.2;
    const multFrecuencia = frecuencia === "diario" ? 1 : 0.8;

    // Cálculo principal
    let total = numGatos * basePorGato * multTamano * multFrecuencia;

    // Ajuste comercial leve
    total *= 1.3;

    setResultado(Math.round(total));
  };

  // Pesos por tipo
  const pesoNormal = 10;
  const pesoPremium = 7;
  const pesoBolsa = tipo === "normal" ? pesoNormal : pesoPremium;

  const bolsas = resultado ? Math.ceil(resultado / pesoBolsa) : 0;

  return (
    <main className="relative flex-1 flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* 🐾 Fondo: imagen + degradado tipo Hero */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.25]"
        style={{ backgroundImage: `url(${calcBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-lg">
        <Card className="shadow-md backdrop-blur bg-background/90">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Calculadora de Arena 🐾
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Cantidad de gatos</Label>
              <Select value={gatos} onValueChange={setGatos}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tamaño del arenero</Label>
              <Select value={tamano} onValueChange={setTamano}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pequeño">Pequeño</SelectItem>
                  <SelectItem value="mediano">Mediano</SelectItem>
                  <SelectItem value="grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Frecuencia de limpieza</Label>
              <Select value={frecuencia} onValueChange={setFrecuencia}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diario</SelectItem>
                  <SelectItem value="cada-dos-dias">Cada dos días</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de arena</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (10 kg)</SelectItem>
                  <SelectItem value="premium">Premium (7 kg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4" onClick={calcular}>
              Calcular
            </Button>

            {resultado && (
              <div className="mt-6 text-center space-y-3">
                <p className="text-xl font-semibold">
                  Necesitas aproximadamente{" "}
                  <span className="text-primary font-bold">{resultado} kg</span>{" "}
                  de arena al mes 🐱
                </p>
                <p className="text-lg">
                  Eso equivale a{" "}
                  <span className="text-primary font-bold">{bolsas}</span>{" "}
                  bolsa{bolsas > 1 ? "s" : ""} de{" "}
                  <span className="font-semibold">
                    Mohhikat {tipo === "normal" ? "Normal" : "Premium"}
                  </span>{" "}
                  ({pesoBolsa} kg c/u)
                </p>
                <p className="text-muted-foreground text-sm">
                  *Cálculo estimado según hábitos promedio de limpieza y tamaño de arenero.
                </p>

                <Link to="/suscripciones">
                  <Button className="mt-4 w-full flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Comprar ahora
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
