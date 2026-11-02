// Datos de los productos del catálogo
// Cada producto es un objeto con sus propiedades

export const productos = [
    {
        id: "llantas-rs7",
        nombre: "Llantas Forjadas RS-7",
        categoria: "exterior",
        marca: "volkswagen",
        precio: 1249,
        imagen: "./recursos/imagenes/producto/llantas.jpg",
        descripcionCorta: "Rines forjados de aluminio de alto rendimiento",
        caracteristica: 'Diámetro 18" / 19" / 20"',
        descripcionLarga: "Rines forjados de aluminio de alto rendimiento, diseñados para pistas de carreras y uso en calle. Compatibles con la mayoría de vehículos deportivos europeos y japoneses.",
        especificaciones: [
            "Material: Aluminio forjado 6061-T6",
            'Diámetro: 18" / 19" / 20"',
            "Peso: 7.8 kg c/u",
            "Garantía: 3 años"
        ]
    },
    {
        id: "suspension-pro-r",
        nombre: "Suspensión Coilover Pro-R",
        categoria: "personalizacion",
        marca: "ford",
        precio: 899,
        imagen: "./recursos/imagenes/producto/suspension.jpg",
        descripcionCorta: "Suspensión regulable de alto rendimiento",
        caracteristica: "Compatible con la mayoría de vehículos",
        descripcionLarga: "Kit de suspensión coilover ajustable en altura y dureza. Permite calibrar el centro de gravedad del auto para un mejor agarre y estabilidad.",
        especificaciones: [
            "Ajuste de altura: 30mm a 70mm",
            "32 niveles de dureza",
            "Monotubo de acero templado",
            "Garantía: 2 años"
        ]
    },
    {
        id: "escape-titan-x",
        nombre: "Escape Deportivo Titan-X",
        categoria: "personalizacion",
        marca: "chevrolet",
        precio: 649,
        imagen: "./recursos/imagenes/producto/escape.jpg",
        descripcionCorta: "Sistema de escape deportivo de alto flujo",
        caracteristica: "Acero inoxidable T304",
        descripcionLarga: "Sistema de escape deportivo para optimizar el flujo de gases, aumentar la respuesta del motor y brindar un sonido más profundo.",
        especificaciones: [
            "Material: Acero inoxidable T304",
            "Diámetro: 3 pulgadas",
            "Colas con acabado en titanio quemado",
            "Ganancia estimada: +12 HP"
        ]
    },
    {
        id: "volante-carbono",
        nombre: "Volante Deportivo Carbono",
        categoria: "interior",
        marca: "ford",
        precio: 189900,
        imagen: "./recursos/imagenes/producto/volante.jpg",
        descripcionCorta: "Volante de cuero con inserto de fibra de carbono",
        caracteristica: "Compatible con modelos europeos y asiáticos",
        descripcionLarga: "Volante ergonómico forrado en cuero perforado con detalles en fibra de carbono real. Buen agarre para conducción deportiva.",
        especificaciones: [
            "Material: Cuero perforado y fibra de carbono",
            "Costuras reforzadas en color rojo",
            "Forma: Base plana estilo D-Cut",
            "Diámetro: 350 mm"
        ]
    },
    {
        id: "cubre-pedales",
        nombre: "Cubre Pedales Sport Racing",
        categoria: "interior",
        marca: "chevrolet",
        precio: 24500,
        imagen: "./recursos/imagenes/producto/volante.jpg",
        descripcionCorta: "Kit de pedaleras antideslizantes de aluminio",
        caracteristica: "Goma antideslizante de alta densidad",
        descripcionLarga: "Juego de cubre pedales con tacos de goma de alta adherencia y placas de aluminio. Mayor seguridad y estilo.",
        especificaciones: [
            "Material: Aluminio y goma antideslizante",
            "Fijación con tornillos y grapas",
            "Compatible con caja manual y automática"
        ]
    },
    {
        id: "luces-led",
        nombre: "Kit Luces LED Xenon-Pro",
        categoria: "iluminacion",
        marca: "volkswagen",
        precio: 45000,
        imagen: "./recursos/imagenes/producto/escape.jpg",
        descripcionCorta: "Kit de iluminación LED de alta potencia",
        caracteristica: "16.000 lúmenes - Blanco frío 6000K",
        descripcionLarga: "Lámparas LED de alto poder lumínico con disipador de aluminio. Excelente visibilidad nocturna y bajo consumo.",
        especificaciones: [
            "Potencia: 16.000 lúmenes",
            "Temperatura: 6000K blanco puro",
            "Protección contra agua IP68",
            "Conexión plug and play"
        ]
    },
    {
        id: "kit-limpieza",
        nombre: "Kit Cuidado y Detailing Cerámico",
        categoria: "limpieza",
        marca: "volkswagen",
        precio: 32000,
        imagen: "./recursos/imagenes/producto/llantas.jpg",
        descripcionCorta: "Pack integral de lavado, cera y brillo",
        caracteristica: "Efecto hidrofóbico y protección UV",
        descripcionLarga: "Kit de productos para el lavado y mantenimiento estético del vehículo. Protege la pintura y repele el agua.",
        especificaciones: [
            "Shampoo pH neutro 500ml",
            "Sellador cerámico rápido 250ml",
            "2 microfibras premium"
        ]
    },
    {
        id: "aleron-gt",
        nombre: "Alerón Trasero GT Carbon Look",
        categoria: "exterior",
        marca: "ford",
        precio: 98000,
        imagen: "./recursos/imagenes/producto/suspension.jpg",
        descripcionCorta: "Spoiler aerodinámico con acabado símil carbono",
        caracteristica: "Acabado brillante fibra de carbono",
        descripcionLarga: "Alerón deportivo que mejora la estabilidad a alta velocidad y resalta la estética trasera del auto.",
        especificaciones: [
            "Material: Plástico ABS de alta resistencia",
            "Acabado: Patrón fibra de carbono",
            "Montaje con cinta doble faz 3M",
            "Medida: 120 cm de largo"
        ]
    }
];
