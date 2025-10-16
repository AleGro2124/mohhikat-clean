import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Phone, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Contacto() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ✅ Validar correo (debe incluir punto y dominio)
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return re.test(email.trim());
  };

  // ✅ Validar teléfono (opcional)
  const validatePhone = (phone: string) => {
    const re = /^\+?[0-9\s\-]{7,15}$/;
    return re.test(phone.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const emailValue =
      (form.current.querySelector('[name="user_email"]') as HTMLInputElement)?.value ?? "";
    const phoneValue =
      (form.current.querySelector('[name="phone"]') as HTMLInputElement)?.value ?? "";

    if (!validateEmail(emailValue)) {
      alert("Por favor ingresa un correo válido (ej: usuario@gmail.com).");
      return;
    }

    if (phoneValue && !validatePhone(phoneValue)) {
      alert("Por favor ingresa un teléfono válido (7-15 dígitos, opcional +).");
      return;
    }

    setStatus("sending");

    emailjs
      .sendForm(
        "service_psf27wb", // tu Service ID
        "template_34i8pt5", // tu Template ID
        form.current,
        "ipYqo78lZ0FOLBHGv" // tu Public Key
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
        setTimeout(() => setStatus("idle"), 3500);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3500);
      });
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-4">Contáctanos</h1>
      <p className="text-center text-muted-foreground mb-10">
        ¿Tienes preguntas? Estamos aquí para ayudarte
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 📨 Formulario */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Envíanos un mensaje</CardTitle>
            <CardDescription>
              Completa el formulario y nos pondremos en contacto contigo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" name="from_name" placeholder="Tu nombre" required />
              <Input type="email" name="user_email" placeholder="tu@email.com" required />
              <Input type="tel" name="phone" placeholder="+52 123 456 7890" />
              <Textarea name="message" placeholder="¿En qué podemos ayudarte?" required />

              {/* Hidden field to set reply-to */}
              <input type="hidden" name="reply_to" value="" />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Enviando..." : "✈️ Enviar mensaje"}
              </Button>
            </form>

            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 text-green-600 animate-fade-in">
                <CheckCircle className="w-5 h-5" />
                <span>✅ Mensaje enviado con éxito.</span>
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 text-red-600 animate-fade-in">
                <XCircle className="w-5 h-5" />
                <span>❌ Hubo un error al enviar el mensaje. Intenta de nuevo.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 📞 Información de contacto */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>mohhikatwebsite@gmail.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p>+49 151 64300816</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Horario de atención</h3>
                <p>
                  <strong>Lunes - Viernes:</strong> 9:00 - 18:00
                  <br />
                  <strong>Sábado:</strong> 10:00 - 14:00
                  <br />
                  <strong>Domingo:</strong> Cerrado
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
