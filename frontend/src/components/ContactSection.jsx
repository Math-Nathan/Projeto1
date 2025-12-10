import { Instagram, Youtube, Twitter, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const ContactSection = () => {
    const contactInfo = [
        {
            icon: MessageCircle,
            text: "(61) 981580652",
            href: "https://wa.me/5561981580652",
            description: "Envie uma mensagem"
        },
        {
            icon: Mail,
            text: "bemove@gmail.com",
            href: "mailto:bemove@gmail.com",
            description: "Envie um e-mail"
        },
        {
            icon: MapPin,
            text: "QMS 2 CJ A Lote27 - Brasília, DF ",
            href: "https://maps.app.goo.gl/G6ow6dXC72ncQ9DaA",
            description: "Nossa localização"
        }
    ];

    const socialLinks = [
        {
            name: "Instagram",
            href: "https://www.instagram.com/diogopena.fisioterapia?igsh=eTNqMG5ndnRwMnRw&utm_source=qr",
            icon: Instagram
        },
        {
            name: "Youtube",
            href: "https://www.youtube.com/channel/UCippxGbgAwPD3Ic5zh5h7NA",
            icon: Youtube
        },
       
    ];

    const horarios = [
        { dia: "seg.", horario: "09:00 – 19:00", aberto: true },
        { dia: "ter.", horario: "09:00 – 19:00", aberto: true },
        { dia: "qua.", horario: "09:00 – 19:00", aberto: true },
        { dia: "qui.", horario: "09:00 – 19:00", aberto: true },
        { dia: "sex.", horario: "09:00 – 12:00", aberto: true },
        { dia: "sáb.", horario: "fechado", aberto: false },
        { dia: "dom.", horario: "fechado", aberto: false }
    ];

    return (
        <section id="contact" className="py-24 px-4 relative bg-muted/20">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Meus <span className="text-primary">Contatos</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Entre em contato conosco para agendar uma consulta 
                    <br />ou tirar suas dúvidas sobre nossos serviços de fisioterapia.
                </p>

                {/* Grid com contatos e horários lado a lado */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    
                    {/* Card de Contatos */}
                    <div className="bg-card p-6 rounded-xl border border-border card-hover">
                        {/* Contact Info */}
                        <div className="space-y-4 mb-6">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <a
  key={index}
  href={item.href}
  className="
    flex items-center p-4 rounded-lg 
    hover:bg-primary/5 active:bg-primary/10
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
    transition-all duration-300 ease-out
    group border border-transparent hover:border-primary/20
    w-full min-h-[64px] md:min-h-[72px]
  "
  target={item.href.startsWith('http') ? "_blank" : undefined}
  rel={item.href.startsWith('http') ? "noopener noreferrer noreferrer" : undefined}
  aria-label={
    item.description 
      ? `${item.text}. ${item.description}`
      : item.text
  }
  // Adicione isso se forem links internos que não devem ser indexados
  {...(item.isExternal === false && {
    "data-noindex": "true"
  })}
>
  {/* Container do ícone com melhor acessibilidade */}
  <div 
    className="
      flex-shrink-0 
      w-12 h-12 
      bg-primary/10 rounded-xl 
      flex items-center justify-center 
      group-hover:bg-primary/20 
      group-active:scale-95
      group-focus-visible:ring-2 group-focus-visible:ring-primary/30
      transition-all duration-200
      relative overflow-hidden
    "
    aria-hidden="true"
  >
    <Icon
      size={22}
      className="
        text-primary 
        group-hover:scale-110 
        group-active:scale-100
        transition-transform duration-200
      "
    />
    {/* Efeito de fundo sutil no hover */}
    <div className="
      absolute inset-0 
      bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 
      opacity-0 group-hover:opacity-100 
      transition-opacity duration-300
    " />
  </div>

  {/* Container do texto */}
  <div className="ml-4 flex-1 min-w-0">
    <span className="
      text-base font-semibold text-foreground 
      block group-hover:text-primary 
      group-focus-visible:text-primary
      transition-colors duration-200
      truncate
    ">
      {item.text}
    </span>
    
    {item.description && (
      <span className="
        text-sm text-muted-foreground 
        mt-1 block
        line-clamp-2
      ">
        {item.description}
      </span>
    )}
  </div>

  {/* Indicador visual para links externos */}
  {item.href.startsWith('http') && (
    <Icon
      name="ExternalLink" // Supondo que você tenha um ícone de link externo
      size={16}
      className="
        ml-2 text-muted-foreground/60 
        group-hover:text-primary 
        transition-colors duration-200
        flex-shrink-0
      "
      aria-hidden="true"
    />
  )}
</a>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center border-t border-border pt-6 space-x-6">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Card de Horários */}
                    <div className="bg-card p-6 rounded-xl border border-border card-hover">
                        {/* Header dos Horários */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Clock size={22} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Horário de Funcionamento</h3>
                                <p className="text-sm text-muted-foreground">Confira nossos horários de atendimento</p>
                            </div>
                        </div>

                        {/* Lista de Horários */}
                        <div className="space-y-3">
                            {horarios.map((horario, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-300 ${
                                        horario.aberto 
                                            ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' 
                                            : 'border-border bg-muted/50 hover:bg-muted'
                                    }`}
                                >
                                    <span className={`font-medium ${
                                        horario.aberto ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                        {horario.dia}
                                    </span>
                                    <span className={`font-semibold ${
                                        horario.aberto ? 'text-primary' : 'text-muted-foreground'
                                    }`}>
                                        {horario.horario}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Informação adicional */}
                        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-sm text-primary text-center">
                                ⚠️ Horários sujeitos a alterações em feriados
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};