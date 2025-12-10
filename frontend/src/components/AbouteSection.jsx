export const AbouteSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Minha<span className="text-primary"> História </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Texto */}
<div className="space-y-6">
  <h3 className="text-2xl font-semibold text-foreground">
    História pessoal na fisioterapia
  </h3>
  
  <div className="text-muted-foreground space-y-4 leading-relaxed">
    <p>
      Meu nome é <strong className="text-foreground font-medium">Diogo Pena</strong>, sou fisioterapeuta com 
      <strong className="text-primary font-medium"> 15 anos de experiência</strong>. 
      Ao longo da minha carreira, atuei em clínicas e academias. Já tive meu próprio consultório e 
      atualmente, trabalho na 
      <strong className="text-foreground font-medium"> Pratique Movimento (Brasília -DF)</strong>, 
      onde ofereço atendimentos presenciais e online.
    </p>
    
    <p>
      Em <strong className="text-foreground">2016</strong> eu conheci a cultura do movimento através da escola 
      Pratique Movimento, situada em Brasília-DF. Comecei a praticar no final de 2016 e em 2017 comecei 
      atender uma paciente com dificuldade de se movimentar e fui aplicando o trabalho de 
      <strong className="text-primary font-medium"> Spine Wave</strong>, método desenvolvido por Ido Portal.
    </p>
    
    <p>
      Minha abordagem se concentra em estímulos que visam desenvolver capacidades físicas e encorajar 
      meus pacientes a retomar suas atividades diárias. Além disso, foco tanto na 
      <span className="text-foreground font-medium"> prevenção quanto na reabilitação</span> 
      (dores agudas, crônicas, pós operatório imediato e tardio). Estou comprometido em ajudar meus 
      pacientes a alcançarem uma melhor qualidade de vida.
    </p>
    
    <p>
      Atendo desde o público jovem a pessoas da terceira idade. 
    Esse segundo grupo é a minha verdadeira paixão.
    </p>
  </div>
</div>

                    {/* Imagem - TAMANHO RECOMENDADO */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src="/images/img1.jpg"
                            alt="Fisioterapia Be Move"
                            className="rounded-lg shadow-lg w-full max-w-xs lg:max-w-lg max-w-md h-auto object-cover"
                        />
                    </div>

                    
                </div>
            </div>
        </section>
    );
}