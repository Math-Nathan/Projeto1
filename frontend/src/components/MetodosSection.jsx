const metodos = [
    {
        id: 1,
        title: "Nossa Missão",
        description: "Na Be Move Fisioterapia, nossa missão é encorajar pacientes e clientes a retomarem suas atividades de vida diária, proporcionando estímulos que promovam autonomia, qualidade de vida e bem-estar.",
        image: "/images/img2.jpg",
        gradient: "from-blue-100 to-cyan-500", 

    },
    {
        id: 2,
        title: "Minha História",
        description: "Meu nome é Diogo Pena, sou fisioterapeuta com 15 anos de experiência, atuando em clínicas, academias e atendimentos domiciliares.",
        image: "/images/img3.jpg",
        gradient: "from-green-100 to-emerald-500", 

    },
    {
        id: 3,
        title: "Nossos Serviços",
        description: "Minha abordagem prioriza o desenvolvimento de capacidades físicas, incentivando os clientes retomarem suas funções de maneira ativa e integrada.",
        image: "/images/img4.jpg",
        gradient: "from-purple-100 to-pink-500", 

    }
    
];

export const MetodosSection = () => {
    return (
        <section id="metodos" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Sobre a <span className="text-primary">Be Move</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Conheça nossa filosofia de trabalho e como podemos ajudá-lo a alcançar
                    seus objetivos de saúde e bem-estar através da fisioterapia especializada.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metodos.map((metodo) => (
                        <div
                            key={metodo.id}
                            className="group bg-card rounded-2xl overflow-hidden shadow-2xl card-hover border border-border h-full flex flex-col relative transform hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Destaque  com gradiente*/}
                            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${metodo.gradient}`}></div>

                            {/* Imagem com overlay gradiente */}
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={metodo.image}
                                    alt={metodo.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    style={{ objectPosition: "center 22%" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Título na imagem */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                        {metodo.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col pt-6">
                                {/* Descrição */}
                                <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                                    {metodo.description}
                                </p>

                                {/* Botão com gradiente */}
                                <div className="mt-auto pt-4">
                                    <button className={`w-full py-0.5 px-4 bg-gradient-to-r ${metodo.gradient} text-white font-semibold rounded-xl transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                                        {metodo.buttonText}
                                    </button>
                                </div>


                            </div>

                            {/* Efeito de brilho suave */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${metodo.gradient} opacity-0 group-hover:opacity-8 transition-all duration-500 pointer-events-none`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};