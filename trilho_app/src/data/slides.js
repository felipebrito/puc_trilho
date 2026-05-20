// =============================================================================
//  ARQUEANO — Zona 1
// =============================================================================
export const arqueanoSlides = [{ type: 'video_period', period: 'arqueano', section: 'home' }];

// =============================================================================
//  PROTEROZOICO — Zona 2
// =============================================================================
export const proterozoicoSlides = [{ type: 'video_period', period: 'proterozoico', section: 'home' }];

// =============================================================================
//  CAMBRIANO — Zona 3
// =============================================================================
export const cambrianoSlides = [{ type: 'video_period', period: 'cambriano', section: 'home' }];

// =============================================================================
//  ORDOVICIANO — Zona 4
// =============================================================================
export const ordovicianoSlides = [
    // Slide 0 - HOME
    {
        type: 'home_ordoviciano',
        period: 'ordoviciano',
        section: 'home'
    },

    // Slide 1 - INTRO BIODIVERSIDADE (Canva Pg 2)
    {
        type: 'section_intro',
        period: 'ordoviciano',
        section: 'biodiversidade',
        title: 'A BIODIVERSIDADE DA ÉPOCA',
        description: 'Conheça os representantes da fauna e da flora característicos desse momento geológico.',
        videoSrc: '/assets/ordoviciano/bio_intro_bg.png'
    },

    // Slides 2-8: Espécies (Canva Pg 3 a 9)
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-homotelus',
        name: 'Homotelus sp.',
        subtitle: 'Trilobitas, com cerca de 8 cm de comprimento',
        description: 'A descoberta de muitos fósseis completos de trilobitas do gênero Homotelus juntos, indica que estes animais formavam grandes agregados sazonais, provavelmente para fins reprodutivos. Se alimentavam de restos orgânicos presentes no assoalho oceânico.',
        videoSrc: '/assets/ordoviciano/homotelus.png',
        seloSrc: '/assets/ordoviciano/homotelus_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-cameroceras',
        name: 'Cameroceras sp.',
        subtitle: 'Molusco predador, podia chegar até 10 m de comprimento',
        description: 'Seu nome significa "chifre com câmaras". Era o maior predador de sua época e assemelhava-se a uma lula, mas com uma imensa concha em forma de cone.',
        videoSrc: '/assets/ordoviciano/cameroceras.png',
        seloSrc: '/assets/ordoviciano/cameroceras_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-megalograptus',
        name: 'Megalograptus sp.',
        subtitle: 'Artrópode predador, com cerca de 1,2 m de comprimento',
        description: 'Conhecido também como "escorpião-marinho", era relativamente grande para um predador desse período e um dos escorpiões-marinhos mais antigos que se conhece.',
        videoSrc: '/assets/ordoviciano/megalograptus.png',
        seloSrc: '/assets/ordoviciano/megalograptus_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-balacrinus',
        name: 'Balacrinus sp.',
        subtitle: 'Equinodermo filtrador, com cerca de 5 cm de comprimento',
        description: 'Animais marinhos conhecidos como lírios-do-mar. Esses organismos possuem um corpo com uma base calcária e longos braços que se estendem para capturar alimento. Viviam aderidos no substrato oceânico.',
        videoSrc: '/assets/ordoviciano/balacrinus.png',
        seloSrc: '/assets/ordoviciano/balacrinus_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-sacabambaspis',
        name: 'Sacabambaspis sp.',
        subtitle: 'Peixe sem mandíbula, com aproximadamente 25 cm de comprimento',
        description: 'Alimentava-se por sucção, sua boca em forma de colher, tinha pequenas fileiras de plaqueta ósseas para raspar algas e lodo do fundo do mar. Habitava águas rasas nas margens continentais de Gondwana.',
        videoSrc: '/assets/ordoviciano/sacabambaspis.png',
        seloSrc: '/assets/ordoviciano/sacabambaspis_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-promissum',
        name: 'Promissum sp.',
        subtitle: 'Conodonte predador, com aproximadamente 40 cm de comprimento',
        description: 'Estes animais apresentavam uma boca primitiva sob os olhos, com dentes mineralizados e uma espinha dorsal primitiva. Parecia uma pequena enguia ou um grande verme, sem nenhum tipo de barbatana.',
        videoSrc: '/assets/ordoviciano/promissum.png',
        seloSrc: '/assets/ordoviciano/promissum_selo.png'
    },
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'biodiversidade',
        id: 'ord-sowerbyella',
        name: 'Sowerbyella sp.',
        subtitle: 'Braquiópodes filtradores, com 1,5 cm de comprimento',
        description: 'Animais solitários, exclusivamente marinhos e bentônicos. Apresentam corpo mole incluso numa carapaça composta por duas valvas com espinhos, viviam aderidos no fundo oceânico.',
        videoSrc: '/assets/ordoviciano/sowerbyella.png',
        seloSrc: '/assets/ordoviciano/sowerbyella_selo.png'
    },

    // Slide 9: Extinction Intro (Canva Pg 10)
    {
        type: 'section_intro',
        period: 'ordoviciano',
        section: 'extincao',
        title: 'A PRIMEIRA EXTINÇÃO EM MASSA',
        description: 'Nesse momento geológico, os níveis de dióxido de carbono no planeta diminuíram, reduzindo o efeito estufa e causando o resfriamento do planeta, o que, somado ao deslocamento de Gondwana em direção ao Polo Sul, criou uma cobertura de gelo nessa região, que também se alastrou sobre algumas áreas continentais e costeiras.',
        bgImage: '/assets/ordoviciano/extincao_intro_bg.png'
    },

    // Slide 10: Extinction Content (Canva Pg 11)
    {
        type: 'extinction_content',
        period: 'ordoviciano',
        section: 'extincao',
        imageSrc: '/assets/ordoviciano/extincao_topo.png',
        topText: 'Nesse momento geológico, a temperatura diminui de forma gradual, mas intensa.\nO nível do mar baixa e os invertebrados marinhos começam a morrer.',
        imageCaption: 'Aparência do planeta Terra durante o final do período Ordoviciano, com a cobertura de gelo alastrada devido às baixas temperaturas.',
        bottomText: 'Cerca de 85% de todas as espécies que habitavam as águas rasas pereceram congeladas. Aqueles poucos que sobreviveram se refugiaram nas águas profundas.',
    },

    // Slide 11 - E DEPOIS? Intro (Canva Pg 12)
    {
        type: 'section_intro',
        period: 'ordoviciano',
        section: 'pos_extincao',
        title: 'E DEPOIS?',
        periodLabel: 'PERÍODO',
        periodName: 'SILURIANO',
        id: 'intro',
        description: 'Aparência do planeta Terra durante o início do período Siluriano, com a cobertura de gelo sendo reduzida devido ao aumento nas temperaturas do globo terrestre.',
        bgImage: '/assets/ordoviciano/siluriano_intro_bg.png'
    },

    // Slide 12 - E DEPOIS? Globe (Canva Pg 13)
    {
        type: 'silurian_globe',
        period: 'ordoviciano',
        section: 'pos_extincao',
        id: 'globe',
        headerTitle: 'E DEPOIS?',
        content: 'Vista do globo terrestre, com a disposição da massa continental correspondente ao Período Siluriano. No início desse período, cerca de 200 mil anos após a primeira extinção em massa, houve um aumento no nível de gás carbônico atmosférico.\n\nComo consequência, a temperatura do planeta voltou a aumentar, fazendo com que as enormes geleiras derretessem e a vida tomasse um novo curso.',
        imageSrc: '/assets/ordoviciano/siluriano_globe.png'
    },

    // Slide 13 - Dalmanites sp. (Canva Pg 14)
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'pos_extincao',
        id: 'dalmanites',
        name: 'Dalmanites sp.',
        subtitle: 'Trilobita, com cerca de 8 cm de comprimento',
        topText: 'As novas mudanças alteraram a biota, com novas espécies tornando-se abundantes como:',
        description: 'Possuíam exoesqueleto levemente convexos, terminados em uma cauda com extremidade pontiaguda. Se alimentava de matéria orgânica em decomposição, como restos de plantas e outros organismos presentes no assoalho oceânico.',
        videoSrc: '/assets/ordoviciano/dalmanites.png',
        seloSrc: '/assets/ordoviciano/selo_dalmanites.png'
    },

    // Slide 14 - Halysites (Canva Pg 15)
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'pos_extincao',
        id: 'halysites',
        name: 'Halysites sp.',
        subtitle: 'Corais, que podiam chegar a 40 cm de altura',
        description: 'Conhecidos por suas estruturas em colônias ramificadas e tabulados, que se assemelham a colmeias. Seu alimento era composto basicamente por plâncton.',
        videoSrc: '/assets/ordoviciano/halysites.png',
        seloSrc: '/assets/ordoviciano/selo_halysites.png'
    },

    // Slide 15 - Cyrtograptus (Canva Pg 16)
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'pos_extincao',
        id: 'cooksonia',
        name: 'Cyrtograptus sp.',
        subtitle: 'Graptólitos filtradores, com cerca de 12 cm de diâmetro',
        description: 'Um dos primeiros animais a colonizar ambientes de mar aberto. Formado por uma espiral helicoidal baixa com 1,5 voltas firmemente enroladas, munidos de espinhos dorsolaterais.',
        videoSrc: '/assets/ordoviciano/cooksonia.png',
        seloSrc: '/assets/ordoviciano/selo_cooksonia.png'
    },

    // Slide 16 - Favosites (Canva Pg 17)
    {
        type: 'single_species',
        period: 'ordoviciano',
        section: 'pos_extincao',
        id: 'favosites',
        name: 'Favosites sp.',
        subtitle: 'Corais filtradores, podendo chegar a 30 cm de altura',
        description: 'A estrutura deste coral era parecida com um favo-de-mel, dando-lhes o nome de "coral favo-de-mel". Suas paredes apresentavam poros, que facilitavam a troca de nutrientes entre os organismos coloniais.',
        videoSrc: '/assets/ordoviciano/atrypa.png',
        seloSrc: '/assets/ordoviciano/selo_atrypa.png'
    },
];
// =============================================================================
//  SILURIANO — Zona 5
// =============================================================================
export const silurianoSlides = [{ type: 'video_period', period: 'siluriano', section: 'home' }];

// =============================================================================
//  DEVONIANO — Zona 6
// =============================================================================
export const devonianoSlides = [
    // Slide 0 - HOME DEVONIANO
    {
        type: 'home_devonian',
        period: 'devoniano',
        section: 'home'
    },

    // Slide 1 - INTRO BIODIVERSIDADE (Canva Pg 2)
    {
        type: 'section_intro',
        period: 'devoniano',
        section: 'biodiversidade',
        title: 'A BIODIVERSIDADE DA ÉPOCA',
        description: 'Conheça os representantes da fauna e da flora característicos desse momento geológico.',
        videoSrc: '/assets/devoniano_biodiversidade_bg.png'
    },

    // Slides 2-12: Espécies (Canva Pg 3 a 13)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'dunkleosteus',
        name: 'Dunkleosteus sp.',
        subtitle: 'Peixe predador, média de 4 a 10 m de comprimento',
        description: 'Um dos maiores predadores da época, com um corpo dotado de placas que formavam uma armadura óssea. Era capaz de partir um tubarão ao meio com uma única mordida.',
        videoSrc: '/assets/devoniano/img_dunkleosteus.png',
        seloSrc: '/assets/devoniano/selo_dunkleosteus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'campbellodus',
        name: 'Campbellodus sp.',
        subtitle: 'Peixe carnívoro, com cerca de 40 cm de comprimento',
        description: 'Era um peixe dotado de placas ósseas. Seu fóssil foi encontrado em perfeita forma tridimensional. Seus dentes eram feitos de placas ósseas para quebrar e triturar conchas.',
        videoSrc: '/assets/devoniano/img_campbellodus.png',
        seloSrc: '/assets/devoniano/selo_campbellodus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'ctenacanthus',
        name: 'Ctenacanthus sp.',
        subtitle: 'Peixe cartilaginoso predador, com cerca de 2 m de comprimento',
        description: 'Tubarões com uma mandíbula poderosa, que apresentavam as espinhas das nadadeiras cobertas por fileiras de tubérculos, apresentando uma aparência de “pente”.',
        videoSrc: '/assets/devoniano/img_ctenacanthus.png',
        seloSrc: '/assets/devoniano/selo_ctenacanthus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'gogonasus',
        name: 'Gogonasus sp.',
        subtitle: 'Peixe carnívoro, com cerca de 30 cm de comprimento',
        description: 'Possuía dois pares de nadadeiras lobadas e musculosas, além de um par de narinas externas.',
        videoSrc: '/assets/devoniano/img_gogonasus.png',
        seloSrc: '/assets/devoniano/selo_gogonasus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'griphognatus',
        name: 'Griphognatus sp.',
        subtitle: 'Peixe dipnoico carnívoro, com cerca de 60 cm de comprimento',
        description: 'Peixe conhecido por apresentar um focinho em forma de “bico de pato”, que era usado para procurar vermes e artrópodes no lodo do assoalho marinho.',
        videoSrc: '/assets/devoniano/img_griphognatus.png',
        seloSrc: '/assets/devoniano/selo_griphognatus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'furcaster',
        name: 'Furcaster sp.',
        subtitle: 'Equinodermo carnívoro, com cerca de 60 cm de comprimento',
        description: 'Gênero extinto de “Brittle Stars” (estrelas frágeis). Seus 5 longos e finos braços eram utilizados para locomoção, de forma rastejante, no fundo do mar.',
        videoSrc: '/assets/devoniano/img_furcaster.png',
        seloSrc: '/assets/devoniano/selo_furcaster.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'palaeoisopus',
        name: 'Palaeoisopus problematicus',
        subtitle: 'Artrópode predador, com cerca de 20 cm de comprimento',
        description: 'Este quelicerado marinho apresentava pernas de até 18 cm e fortes pinças, tornando-o um caçador extremamente ativo.',
        videoSrc: '/assets/devoniano/img_palaeoisopus.png',
        seloSrc: '/assets/devoniano/selo_palaeoisopus.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'archaeopteris',
        name: 'Archaeopteris sp.',
        subtitle: 'Árvore, com porte de até 30 m',
        description: 'Progimnosperma, com folhas semelhantes às das samambaias. Considerada a primeira árvore lenhosa e primeira árvore a formar florestas.',
        videoSrc: '/assets/devoniano/img_archaeopteris.png',
        seloSrc: '/assets/devoniano/selo_archaeopteris.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'tiktaalik',
        name: 'Tiktaalik roseae',
        subtitle: 'Peixe predador, média de 1 a 2 m de comprimento',
        description: 'Vivia em lagos e rios de água doce, próximo à beira d’água. Era um predador de emboscada. Utilizava suas nadadeiras para se elevar no raso e poderia sobreviver por curtos períodos fora d’água, mecanismo desenvolvido para sobreviver aos grandes predadores marinhos da época. Foi um precursor dos tetrápodes.',
        videoSrc: '/assets/devoniano/img_tiktaalik.png',
        seloSrc: '/assets/devoniano/selo_tiktaalik.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'ichthyostega',
        name: 'Ichthyostega gunnari',
        subtitle: 'Tetrapodomorfo predador, de aproximadamente 1 m de comprimento',
        description: 'Um dos primeiros vertebrados terrestres. Se alimentavam de pequenos animais, como insetos, crustáceos e peixes que viviam em pântanos e ambientes alagados, os quais capturava através de emboscadas. Seus olhos ficavam no topo da cabeça, possibilitando uma boa visão para caça.',
        videoSrc: '/assets/devoniano/img_ichthyostega.png',
        seloSrc: '/assets/devoniano/selo_ichthyostega.png'
    },
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'biodiversidade',
        id: 'drepanophycus',
        name: 'Drepanophycus sp.',
        subtitle: 'Aproximadamente 50 cm',
        description: 'Plantas vasculares de folhas micrófilas (pequenas folhinhas). Seu talo era decumbente, fazendo-a crescer rasteiro ao solo.',
        videoSrc: '/assets/devoniano/img_drepanophycus.png',
        seloSrc: '/assets/devoniano/selo_drepanophycus.png'
    },

    // Slide 13 - Extinction (Canva Pg 31)
    {
        type: 'section_intro',
        period: 'devoniano',
        section: 'extincao',
        title: 'A 2ª EXTINÇÃO\nEM MASSA',
        periodLabel: 'PERÍODO',
        periodName: 'DEVONIANO',
        content: 'Ao final do Devoniano, fortes aumentos e reduções na temperatura do planeta, unidos a uma variação no nível do mar e a queda dos níveis de oxigênio na atmosfera e nos oceanos, causaram a extinção de animais terrestres e aquáticos, por intoxicação e fome. Neste caso, restaram apenas alguns poucos sobreviventes, que mais tarde originarão a linhagem dos tetrápodes que dominará a terra.',
        bgImage: '/assets/devoniano/extincao_bg.png',
    },

    // Slide 14 - Ambientes Aquático + Terrestre (Canva Pg 32)
    {
        type: 'devonian_extinction_environments',
        period: 'devoniano',
        section: 'extincao',
        speciesLeft: {
            name: 'AMBIENTE AQUÁTICO',
            subtitle: 'Representação do ambiente aquático no final do Devoniano.',
            description: '',
            imageSrc: '/assets/devoniano/extincao_aquatico.png'
        },
        speciesRight: {
            name: 'AMBIENTE TERRESTRE',
            subtitle: 'Representação do ambiente terrestre do Devoniano.',
            description: '',
            imageSrc: '/assets/devoniano/extincao_terrestre.png'
        }
    },

    // Slide 15 - E DEPOIS? Intro (Canva Pg 33)
    {
        type: 'section_intro',
        period: 'devoniano',
        section: 'pos_extincao',
        title: 'E DEPOIS?',
        periodLabel: 'PERÍODO',
        periodName: 'CARBONÍFERO',
        content: '',
        bgImage: '/assets/devoniano/carbonifero_intro_bg.png'
    },

    // Slide 16 - E DEPOIS? Globe (Canva Pg 34)
    {
        type: 'silurian_globe',
        id: 'globe',
        period: 'devoniano',
        section: 'pos_extincao',
        headerTitle: 'E DEPOIS?',
        content: 'Vista do globo terrestre, com a disposição da massa continental correspondente à nova época retratada: o Período Carbonífero.\n\n“Carbonífero”, é uma referência às grandes formações de jazidas de carvão que datam desse período, marcado também por uma notável proliferação de animais e plantas terrestres.\n\nNesse período, os continentes se juntaram para formar a Pangeia. Grupos outrora dominantes, como peixes com placas ósseas e tubarões espinhados, deram lugar a novos grupos de peixes (como os de nadadeiras raiadas) e aos tetrápodes.',
        imageSrc: '/assets/devoniano/carbonifero_globe_bg.png',
    },

    // Slide 17 - E DEPOIS? Resumo (Canva Pg 35)
    {
        type: 'silurian_globe',
        id: 'summary',
        period: 'devoniano',
        section: 'pos_extincao',
        headerTitle: 'E DEPOIS?',
        content: 'O Carbonífero também foi marcado por grandes quantidades de oxigênio presente na atmosfera, o que possibilitou o surgimento de animais com tamanhos grandes, como a Meganeura. Embora a maioria da vida marinha tenha sido extinta, alguns animais sobreviveram e se diversificaram posteriormente.\n\nAs novas mudanças alteraram a biota, com novas espécies tornando-se abundantes.\n\nAs espécies a seguir são características do novo momento.',
        imageSrc: '/assets/devoniano/carbonifero_summary_bg.png',
    },

    // Slide 18 - Meganeura (Canva Pg 36)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'meganeura',
        name: 'Meganeura monyi',
        subtitle: 'Libélula gigante, com cerca de 70 cm de envergadura de asa',
        description: 'Semelhantes às libélulas atuais, porém muito maior. Seu tamanho era similar ao de um pombo-comum e pesava cerca de 1,2 kg.',
        imageSrc: '/assets/carbonifero/img_meganeura.png',
        seloSrc: '/assets/carbonifero/selo_meganeura.png'
    },

    // Slide 19 - Stethacanthus (Canva Pg 37)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'stethacanthus',
        name: 'Stethacanthus sp.',
        subtitle: 'Peixe cartilaginoso carnívoro, com cerca de 70 cm de comprimento',
        description: 'Similar aos tubarões de hoje em dia, acredita-se que a sua barbatana dorsal, além de hidrodinâmica, tenha servido para proteção passiva contra os predadores e para cortejo de fêmeas, pois só os machos possuíam esta estrutura.',
        imageSrc: '/assets/carbonifero/img_stethacanthus.png',
        seloSrc: '/assets/carbonifero/selo_stethacanthus.png'
    },

    // Slide 20 - Arthropleura (Canva Pg 38)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'arthropleura',
        name: 'Arthropleura sp.',
        subtitle: 'Artrópode herbívoro, com aproximadamente 2,5 m de comprimento',
        description: 'Maior invertebrado terrestre que já existiu. Acredita-se que possuía pouquíssimos predadores, devido ao seu tamanho massivo. Como as meganeuras, seu tamanho se dá devido à alta abundância de oxigênio na época.',
        imageSrc: '/assets/carbonifero/img_arthropleura.png',
        seloSrc: '/assets/carbonifero/selo_arthropleura.png'
    },

    // Slide 21 - Amphibamus (Canva Pg 39)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'amphibamus',
        name: 'Amphibamus sp.',
        subtitle: 'Anfíbio ancestral carnívoro, com cerca de 20 cm de comprimento',
        description: 'Estudos indicam que ele seja o ancestral dos anfíbios atuais. Como estes anfíbios, precisavam pôr seus ovos em corpos d’água, pois eles não possuíam uma casca protetora.',
        imageSrc: '/assets/carbonifero/img_amphibamus.png',
        seloSrc: '/assets/carbonifero/selo_amphibamus.png'
    },

    // Slide 22 - Sphenophyllum (Canva Pg 40)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'sphenophyllum',
        name: 'Sphenophyllum sp.',
        subtitle: 'Cavalinha, com porte de até 1 m de altura',
        description: 'Esta cavalinha do período Carbonífero crescia enrolada como as videiras atuais. Apresentava um caule central estriado que se ramificava através de seus nódulos. Cada ramo tinha 6 folhas em formato de cunha, sempre distribuídos em espiral.',
        imageSrc: '/assets/carbonifero/img_sphenophyllum.png',
        seloSrc: '/assets/carbonifero/selo_sphenophyllum.png'
    },

    // Slide 23 - Calamites (Canva Pg 41)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'calamites',
        name: 'Calamites sp.',
        subtitle: 'Cavalinha, alcançava de 30 a 50 m de altura',
        description: 'Era uma espécie de cavalinha primitiva que apresentava uma arquitetura nó-entrenó bem definida, semelhante às cavalinhas modernas, e seus galhos e folhas emergiam em espirais desses nós. Se situavam principalmente ao longo das margens arenosas dos rios, e tinham a capacidade de brotar vigorosamente de rizomas subterrâneos quando as porções superiores da planta eram danificadas.',
        imageSrc: '/assets/carbonifero/img_calamites.png',
        seloSrc: '/assets/carbonifero/selo_calamites.png'
    },

    // Slide 24 - Cordaites (Canva Pg 42)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'cordaites',
        name: 'Cordaites sp.',
        subtitle: 'Árvore, com porte de até 30 m de altura',
        description: 'Relacionadas à coníferas, os cordaites cresceram tanto em terra seca quanto em pântanos úmidos em toda a sua área de distribuição.',
        imageSrc: '/assets/carbonifero/img_cordaites.png',
        seloSrc: '/assets/carbonifero/selo_cordaites.png'
    },

    // Slide 25 - Sigillaria (Canva Pg 43)
    {
        type: 'single_species',
        period: 'devoniano',
        section: 'pos_extincao',
        id: 'sigillaria',
        name: 'Sigillaria sp.',
        subtitle: 'Árvore, com porte entre 30 e 50 m de altura',
        description: 'Dominava os manguezais que deram origem às famosas jazidas de carvão do carbonífero. Tinha um tronco único ou pouco ramificado, caracterizado por um fino fio de madeira e casca grossa. Folhas longas e finas cresciam em espiral ao longo do tronco.',
        imageSrc: '/assets/carbonifero/img_sigillaria.png',
        seloSrc: '/assets/carbonifero/selo_sigillaria.png'
    },
];
// =============================================================================
//  CARBONÍFERO — Zona 7
// =============================================================================
export const carboniferoSlides = [{ type: 'video_period', period: 'carbonifero', section: 'home' }];

// =============================================================================
//  PERMIANO — Zona 8
// =============================================================================
export const permianoSlides = [
    {
        type: 'home_permiano',
        period: 'permiano',
        section: 'home'
    },
    {
        id: 'biodiversidade-intro',
        type: 'section_intro',
        period: 'permiano',
        section: 'biodiversidade',
        title: 'A BIODIVERSIDADE DA ÉPOCA',
        description: 'Conheça os representantes da fauna e da flora característicos desse momento geológico.',
        videoSrc: '',
        bgImage: '/assets/permiano/bg_biodiversidade.jpg'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-archosaurus',
        name: 'Archosaurus rossicus',
        subtitle: 'Arcossauriforme predador, atingia de 1 a 3 m de comprimento',
        description: 'Possuia membros curtos e postura semelhante a crocodilianos modernos. Foi um dos primeiros arcossauriformes descobertos.',
        imageSrc: '/assets/permiano/especies/archosaurus.png',
        seloSrc: '/assets/permiano/especies/archosaurus_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-scutosaurus',
        name: 'Scutosaurus sp.',
        subtitle: 'Réptil herbívoro, com cerca de 2 m de comprimento',
        description: 'Maior herbívoro de sua época, seu crânio em forma de capacete e seu corpo revestido por placas ósseas ofereciam uma forte defesa contra os predadores da época.',
        imageSrc: '/assets/permiano/especies/scutosaurus.png',
        seloSrc: '/assets/permiano/especies/scutosaurus_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-dvinia',
        name: 'Dvinia prima',
        subtitle: 'Cinodonte onívoro, com cerca de 50 cm de comprimento',
        description: 'Como todos os cinodontes, eles eram relacionados aos mamíferos. Grande parte de sua dieta era composta por plantas. Vivia próximo a corpos d’água, provavelmente em tocas.',
        imageSrc: '/assets/permiano/especies/dvinia.png',
        seloSrc: '/assets/permiano/especies/dvinia_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-arctotypus',
        name: 'Arctotypus sylvaensis',
        subtitle: 'Libélula gigante, com cerca de 30 cm de envergadura de asa',
        description: 'Depositava seus ovos em plantas similares às cavalinhas atuais. Vivia em regiões de floresta ou pântanos, com água fresca, onde caçavam pequenos insetos e animais. Também serviam de alimento a outros animais.',
        imageSrc: '/assets/permiano/especies/arctotypus.png',
        seloSrc: '/assets/permiano/especies/arctotypus_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-dicynodon',
        name: 'Dicynodon sp.',
        subtitle: 'Dicinodonte herbívoro, com aproximadamente 1,2 m',
        description: 'Foi o primeiro fóssil descrito da África, mostrando evidências de características mamalianas em animais fora do grupo dos mamíferos. Além dos dois dentes canídeos, possuíam um tipo de bico, para ajudar a cortar a vegetação.',
        imageSrc: '/assets/permiano/especies/dicynodon.png',
        seloSrc: '/assets/permiano/especies/dicynodon_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-glossopteris',
        name: 'Glossopteris sp.',
        subtitle: 'Árvore, com porte de até 30 m de altura',
        description: 'As folhas desta gimnosperma semelhante à samambaia são alongadas, lembrando o formato de uma língua, e com um veio central proeminente. Formava grandes florestas durante este período.',
        imageSrc: '/assets/permiano/especies/glossopteris.png',
        seloSrc: '/assets/permiano/especies/glossopteris_selo.png'
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'biodiversidade',
        id: 'perm-bio-phyllotheca',
        name: 'Phyllotheca sp.',
        subtitle: 'Cavalinha, com porte de até 3 m de altura',
        description: 'Espécie de cavalinha primitiva que era bastante comum nas florestas glossopterídeas. Caracteriza-se por folhas finas dispostas em espiral, aglomeradas em discos.',
        imageSrc: '/assets/permiano/especies/phyllotheca.png',
        seloSrc: '/assets/permiano/especies/phyllotheca_selo.png'
    },
    {
        type: 'section_intro',
        period: 'permiano',
        section: 'extincao',
        id: 'perm-ext-intro',
        title: 'A 3ª EXTINÇÃO EM MASSA',
        content: 'Com o consequente movimento tectônico desencadeando eventos vulcânicos, derrames de lava cobriram milhões de quilômetros, somados a uma forte emissão de gases envolvidos no efeito estufa, o que desencadeou um forte aquecimento global.\n\nNos mares, os movimentos tectônicos liberaram grandes quantidades de gás metano preso no assoalho oceânico, tornando as águas oceânicas, o que contribuiu para eliminar a maioria da vida terrestre e aquática. Apenas alguns poucos animais sobreviveram em uma terra desolada.',
        bgImage: '/assets/permiano/extincao_bg.png'
    },
    {
        type: 'section_intro',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'perm-pos-ext-intro',
        title: 'E DEPOIS?',
        periodLabel: 'PERÍODO',
        periodName: 'TRIÁSSICO',
        hideLines: true,
        bgImage: '/assets/permiano/pos_extincao_bg.png'
    },
    {
        type: 'extinction_content',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'perm-pos-ext-mundo',
        imageSrc: '/assets/permiano/pos_extincao_mundo.png',
        imageCaption: 'Aparência do planeta Terra durante o início do período Triássico.',
        topText: 'Após a extinção do final do Permiano, as temperaturas dispararam de 15ºC para 22ºC, o que fez com que as calotas polares desaparecessem por completo. No período Triássico, o ambiente se tornou mais árido e as chuva sazonais formavam rios, planícies de inundação e lagos.',
        bottomText: 'Os répteis foram duramente atingidos e apenas alguns representantes de pequeno porte sobreviveram. Os seres que dominavam a paisagem eram basicamente raros peixes, anfíbios primitivos aquáticos de cerca de 1 m e alguns poucos dicinodontes.',
    },
    {
        type: 'extinction_content',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'perm-pos-ext-resistencia',
        imageSrc: '/assets/permiano/pos_extincao_resistencia.png',
        imageCaption: '',
        topText: 'As novas mudanças alteraram a biota, com novas espécies tornando-se abundantes.\n\nAs espécies a seguir são características do novo momento.',
        bottomText: '',
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'benthosuchus',
        name: 'Benthosuchus sp.',
        subtitle: 'Anfíbio predador, com 1,80 m de comprimento',
        description: 'Vivia em lagos, se alimentando de peixes e pequenos anfíbios como um predador de emboscada, com os olhos posicionados no topo da cabeça.',
        imageSrc: '/assets/permiano/especies/benthosuchus.png',
        seloSrc: '/assets/permiano/especies/benthosuchus_selo.png',
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'lystrosaurus',
        name: 'Lystrosaurus sp.',
        subtitle: 'Dicinodonte herbívoro, entre 1 m e 2,5 m de comprimento',
        description: 'Há evidências de que tinha hábito semiaquático. Alguns estudos indicam que cavavam tocas para se abrigar e se alimentavam de plantas resistentes a secas, como as cavalinhas primitivas.',
        imageSrc: '/assets/permiano/especies/lystrosaurus.png',
        seloSrc: '/assets/permiano/especies/lystrosaurus_selo.png',
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'thrinaxodon',
        name: 'Thrinaxodon sp.',
        subtitle: 'Cinodonte carnívoro, com aproximadamente 50 cm de comprimento',
        description: 'Se alimentava de pequenos insetos e répteis, vermes e outros cinodontes. Com o tamanho próximo ao de um gato, apresentava mudanças importantes para a trajetória dos mamíferos, como modificações do crânio, na mandíbula, no dorso e na cauda.',
        imageSrc: '/assets/permiano/especies/thrinaxodon.png',
        seloSrc: '/assets/permiano/especies/thrinaxodon_selo.png',
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'procolophon',
        name: 'Procolophon sp.',
        subtitle: 'Réptil herbívoro, com até 40 cm de comprimento',
        description: 'Vivia em grupos, se abrigando em ocos ou buracos no solo. Pertencente a um gênero que sobreviveu à extinção do período Permiano. Alguns estudos indicam que este animal também pode ter apresentado uma boa visão noturna.',
        imageSrc: '/assets/permiano/especies/procolophon.png',
        seloSrc: '/assets/permiano/especies/procolophon_selo.png',
    },
    {
        type: 'single_species',
        period: 'permiano',
        section: 'pos_extincao',
        id: 'voltziopsis',
        name: 'Voltziopsis sp.',
        subtitle: 'Árvore, alcançava de 5 a 10 m de altura',
        description: 'Formavam florestas de baixa altitude, próximas a cursos d’água. Essa planta pertence à linhagem ancestral das quais surgiram os grupos modernos de coníferas.',
        imageSrc: '/assets/permiano/especies/voltziopsis.png',
        seloSrc: '/assets/permiano/especies/voltziopsis_selo.png',
    },
];

// =============================================================================
//  EXPORT UNIFICADO
// =============================================================================
export const slidesData = [
    ...arqueanoSlides,
    ...proterozoicoSlides,
    ...cambrianoSlides,
    ...ordovicianoSlides,
    ...silurianoSlides,
    ...devonianoSlides,
    ...carboniferoSlides,
    ...permianoSlides
];

export const periodStartIndex = {
    arqueano: 0,
    proterozoico: arqueanoSlides.length,
    cambriano: arqueanoSlides.length + proterozoicoSlides.length,
    ordoviciano: arqueanoSlides.length + proterozoicoSlides.length + cambrianoSlides.length,
    siluriano: arqueanoSlides.length + proterozoicoSlides.length + cambrianoSlides.length + ordovicianoSlides.length,
    devoniano: arqueanoSlides.length + proterozoicoSlides.length + cambrianoSlides.length + ordovicianoSlides.length + silurianoSlides.length,
    carbonifero: arqueanoSlides.length + proterozoicoSlides.length + cambrianoSlides.length + ordovicianoSlides.length + silurianoSlides.length + devonianoSlides.length,
    permiano: arqueanoSlides.length + proterozoicoSlides.length + cambrianoSlides.length + ordovicianoSlides.length + silurianoSlides.length + devonianoSlides.length + carboniferoSlides.length,
};
