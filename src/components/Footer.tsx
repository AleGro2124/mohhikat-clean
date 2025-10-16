import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mohhikat" className="h-8" />
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>&copy; 2025 Mohhikat. Todos los derechos reservados.</p>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
