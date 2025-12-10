const servicos = [
    {
        id: 1,
        title: "Avaliação Fisioterapêutica",
        description: "Na Be Move Fisioterapia, a avaliação fisioterapêutica é o primeiro passo para um tratamento eficaz. A partir daí desenvolvemos um plano personalizado que atenda às suas necessidades, ajudando você a alcançar uma recuperação completa e saudável.",
        gradient: "from-orange-500 to-amber-600",
    },
    {
        id: 2,
        title: "Educação em Dor",
        description: "A educação em dor é um componente essencial da fisioterapia. Na Be Move Fisioterapia, nossa missão é educar os pacientes por meio da integração dessa abordagem em nossa prática diária. Ao fazer isso, conseguimos criar um ambiente mais colaborativo e eficaz, onde cada paciente se sente mais no controle de sua saúde e bem-estar.",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: 3,
        title: "Prática de Movimentação Preventiva",
        description: "Na Be Move Fisioterapia, acreditamos no poder do movimento como ferramenta essencial para a prevenção e promoção da saúde. Nosso foco é ajudá-lo a alcançar seus objetivos, garantindo uma vida ativa, saudável e equilibrada.",
        gradient: "from-green-500 to-teal-600",
    },
    {
        id: 4,
        title: "Reabilitação Pós-Cirúrgica",
        description: "A recuperação após uma cirurgia pode ser desafiadora. Na Be Move Fisioterapia, o programa de reabilitação pós-cirúrgica é projetado para ajudar os pacientes a recuperar força, velocidade, resistência, flexibilidade, mobilidade, agilidade e equilíbrio de forma segura e eficiente.",
        gradient: "from-purple-500 to-violet-600",
    },
    {
        id: 5,
        title: "Fisioterapia para Lesões Esportivas",
        description: "Se você é um atleta ou apenas gosta de se exercitar, as lesões esportivas podem ser um obstáculo frustrante. Na Be Move Fisioterapia, oferecemos fisioterapia especializada para ajudar na recuperação de lesões esportivas.",
        gradient: "from-pink-500 to-rose-600",
    },
    {
        id: 6,
        title: "Prática de Movimento para Idosos",
        description: "Na Be Move Fisioterapia, o bem-estar dos idosos é uma prioridade. Desenvolvemos programas de fisioterapia especialmente adaptados às suas necessidades. Nosso compromisso é oferecer um cuidado personalizado, ajudando a manter a independência e a vitalidade em cada fase da vida.",
        gradient: "from-red-500 to-red-600",
    },
   

    
];

export const ServicosSection = () => {
    // Dividindo os serviços em dois grupos
    const leftServices = [servicos[0], servicos[2], servicos[4]]; // IDs 1, 3, 5
    const rightServices = [servicos[1], servicos[3], servicos[5]]; // IDs 2, 4, 6

    return (
        <section id="servicos" className="py-24 px-4 relative bg-background">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Nossos <span className="text-primary">Serviços</span>
                </h2>

                <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
                    Conheça nossa abordagem completa e personalizada para cuidar 
                    da sua saúde e bem-estar através da fisioterapia especializada.
                </p>

                {/* Container principal com dois lados */}
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                    
                    {/* Lado Esquerdo - 3 Cards */}
                    <div className="flex-1 flex flex-col gap-6">
                        {leftServices.map((servico, index) => (
                            <div
                                key={servico.id}
                                className={`group p-6 bg-card rounded-xl border border-border transition-all duration-300 cursor-pointer h-full min-h-[260px] flex flex-col ${index === 2 ? 'lg:mt-auto' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Círculo minimalista */}
                                    <div className={`flex-shrink-0 w-3 h-12 bg-gradient-to-b ${servico.gradient} rounded-full`}></div>
                                    
                                    {/* Conteúdo */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-foreground mb-3">
                                            {servico.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {servico.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lado Direito - 3 Cards */}
                    <div className="flex-1 flex flex-col gap-6">
                        {rightServices.map((servico, index) => (
                            <div
                                key={servico.id}
                                className={`group p-6 bg-card rounded-xl border border-border transition-all duration-300 cursor-pointer h-full min-h-[260px] flex flex-col ${index === 2 ? 'lg:mt-auto' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Círculo minimalista */}
                                    <div className={`flex-shrink-0 w-3 h-12 bg-gradient-to-b ${servico.gradient} rounded-full`}></div>
                                    
                                    {/* Conteúdo */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-foreground mb-3">
                                            {servico.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {servico.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};