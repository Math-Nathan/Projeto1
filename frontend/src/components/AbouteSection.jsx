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
                        <h3 className="text-2xl font-semibold">História pessoal na fisioterapia</h3>
                        <p className="text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio vero
                            omnis ipsa inventore cum sit fugit in, modi nesciunt commodi possimus
                            aspernatur voluptatum dolore rerum praesentium labore quam? Omnis, optio.
                        </p>
                        <p className="text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio vero
                            omnis ipsa inventore cum sit fugit in, modi nesciunt commodi possimus
                            aspernatur voluptatum dolore rerum praesentium labore quam? Omnis, optio.
                        </p>
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