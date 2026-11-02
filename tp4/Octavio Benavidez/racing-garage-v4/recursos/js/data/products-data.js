/**
 * @fileoverview Catalog product data repository for Racing Garage.
 * Contains product definitions and query helper functions.
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for URL routing and cart tracking
 * @property {string} name - User-facing product title
 * @property {string} category - Category slug ('interior' | 'exterior' | 'limpieza' | 'iluminacion' | 'personalizacion')
 * @property {string} brand - Brand slug ('ford' | 'chevrolet' | 'volkswagen' | 'universal')
 * @property {number} price - Unit price in Argentine Pesos
 * @property {string} image - Relative path to product image
 * @property {string} shortDescription - Brief summary shown in catalog cards
 * @property {string} fullDescription - Detailed description shown on product detail page
 * @property {string} feature - Key highlight displayed in catalog card list
 * @property {string[]} specs - Array of technical specifications
 */

/**
 * Complete collection of products available in the catalog.
 * @type {Product[]}
 */
export const PRODUCTS = [
    {
        id: "llantas-forjadas-rs7",
        name: "Llantas Forjadas RS-7",
        category: "exterior",
        brand: "volkswagen",
        price: 1249,
        image: "./recursos/imagenes/producto/llantas.jpg",
        shortDescription: "Rines forjados de aluminio de alto rendimiento.",
        fullDescription: "Rines forjados de aluminio de alto rendimiento, diseñados para pistas de carreras y uso en calle. Compatibles con la mayoría de vehículos deportivos europeos y japoneses.",
        feature: 'Diámetro 18" / 19" / 20"',
        specs: [
            "Material: Aluminio forjado 6061-T6",
            'Diámetro: 18" / 19" / 20"',
            "Peso: 7.8 kg c/u",
            "Garantía: 3 años"
        ]
    },
    {
        id: "suspension-coilover-pro-r",
        name: "Suspensión Coilover Pro-R",
        category: "personalizacion",
        brand: "ford",
        price: 899,
        image: "./recursos/imagenes/producto/suspension.jpg",
        shortDescription: "Suspensión regulable de alto rendimiento.",
        fullDescription: "Kit de suspensión coilover ajustable en altura y dureza. Permite calibrar el centro de gravedad del vehículo tanto para circuito cerrado como para uso diario en calle.",
        feature: "Compatible con la mayoría de vehículos",
        specs: [
            "Ajuste de altura: 30mm a 70mm",
            "32 niveles de dureza de rebote",
            "Estructura monotubo de acero templado",
            "Garantía: 2 años"
        ]
    },
    {
        id: "escape-deportivo-titan-x",
        name: "Escape Deportivo Titan-X",
        category: "personalizacion",
        brand: "chevrolet",
        price: 649,
        image: "./recursos/imagenes/producto/escape.jpg",
        shortDescription: "Sistema de escape deportivo de alto flujo.",
        fullDescription: "Sistema de escape cat-back completo diseñado para optimizar el flujo de gases, incrementar la respuesta del acelerador y brindar una acústica deportiva profunda e inconfundible.",
        feature: "Acero inoxidable T304",
        specs: [
            "Material: Acero inoxidable T304",
            "Diámetro de tubería: 3 pulgadas",
            "Colas con acabado en titanio quemado",
            "Ganancia estimada: +12 HP"
        ]
    },
    {
        id: "volante-deportivo-carbono",
        name: "Volante Deportivo Carbono",
        category: "interior",
        brand: "ford",
        price: 189900,
        image: "./recursos/imagenes/producto/volante.jpg",
        shortDescription: "Volante de cuero con inserto de fibra de carbono.",
        fullDescription: "Volante deportivo ergonómico forrado en cuero genuino microperforado con laterales anatómicos y fibra de carbono auténtica de alta resistencia y terminación brillante.",
        feature: "Compatible con modelos europeos y asiáticos",
        specs: [
            "Material: Cuero perforado y fibra de carbono real",
            "Costuras reforzadas en color rojo",
            "Diseño de base plana estilo D-Cut",
            "Diámetro exterior: 350 mm"
        ]
    },
    {
        id: "pedales-deportivos-aluminio",
        name: "Cubre Pedales Sport Racing",
        category: "interior",
        brand: "chevrolet",
        price: 24500,
        image: "./recursos/imagenes/producto/volante.jpg",
        shortDescription: "Kit de pedaleras antideslizantes de aluminio cepillado.",
        fullDescription: "Juego de cubre pedales deportivos con tacos de goma de alta adherencia y placa de aluminio macizo cepillado. Brinda mayor agarre y seguridad en conducción deportiva.",
        feature: "Goma antideslizante de alta densidad",
        specs: [
            "Material: Aluminio macizo cepillado y caucho",
            "Fijación mediante pernos de seguridad",
            "Compatible con transmisión manual y automática",
            "Acabado resistente al desgaste"
        ]
    },
    {
        id: "kit-luces-led-xenon",
        name: "Kit Luces LED Xenon-Pro",
        category: "iluminacion",
        brand: "volkswagen",
        price: 45000,
        image: "./recursos/imagenes/producto/escape.jpg",
        shortDescription: "Kit de iluminación LED de alta potencia para ópticas.",
        fullDescription: "Lámparas LED de alto poder lumínico con disipador pasivo de aluminio aeroespacial y chip CSP ultrabrillante para una visibilidad nocturna superior sin encandilar.",
        feature: "16000 lúmenes por juego - Blanco 6000K",
        specs: [
            "Potencia: 16000 lúmenes totales",
            "Temperatura de color: 6000K blanco puro",
            "Grado de protección: IP68 a prueba de agua",
            "Vida útil: más de 50.000 horas"
        ]
    },
    {
        id: "kit-cuidado-detailing",
        name: "Kit Cerámico Cuidado y Detailing",
        category: "limpieza",
        brand: "universal",
        price: 32000,
        image: "./recursos/imagenes/producto/llantas.jpg",
        shortDescription: "Pack integral de limpieza, sellado cerámico y brillo.",
        fullDescription: "Kit profesional de detailing para el cuidado estético de la carrocería, llantas y cristales. Incluye shampoo de pH neutro, sellador cerámico hidrofóbico y microfibras premium.",
        feature: "Efecto hidrofóbico y protección UV prolongada",
        specs: [
            "Shampoo pH neutro concentrado 500ml",
            "Sellador cerámico con SiO2 250ml",
            "2 paños de microfibra de alta densidad (400 GSM)",
            "Aplicador de espuma ergonómico"
        ]
    },
    {
        id: "aleron-trasero-sport",
        name: "Alerón Trasero GT Carbon Look",
        category: "exterior",
        brand: "ford",
        price: 98000,
        image: "./recursos/imagenes/producto/suspension.jpg",
        shortDescription: "Spoiler aerodinámico con acabado símil carbono.",
        fullDescription: "Alerón aerodinámico de perfil bajo diseñado para incrementar la carga aerodinámica en el eje trasero a altas velocidades y acentuar las líneas deportivas del auto.",
        feature: "Acabado fibra de carbono brillante",
        specs: [
            "Material: Plástico ABS de alto impacto",
            "Acabado: Patrón fibra de carbono con laca UV",
            "Montaje: Adhesivo 3M VHB de grado automotor",
            "Longitud: 120 cm adaptable"
        ]
    }
];

/**
 * Returns all products registered in the catalog.
 * @returns {Product[]} Complete list of products
 */
export function getAllProducts() {
    return PRODUCTS;
}

/**
 * Finds a single product matching the provided ID.
 * @param {string} productId - Unique product ID to look up
 * @returns {Product | undefined} Matching product or undefined if not found
 */
export function getProductById(productId) {
    return PRODUCTS.find((product) => product.id === productId);
}

/**
 * Filters the product list by optional category and brand filters.
 * @param {Object} [filters={}] - Filter criteria object
 * @param {string} [filters.category] - Category slug filter
 * @param {string} [filters.brand] - Brand slug filter
 * @returns {Product[]} Products that match all supplied filter criteria
 */
export function filterProducts({ category, brand } = {}) {
    return PRODUCTS.filter((product) => {
        const matchesCategory = !category || product.category === category;
        const matchesBrand =
            !brand || product.brand === brand || product.brand === "universal";
        return matchesCategory && matchesBrand;
    });
}
