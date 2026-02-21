export interface RatingCategory {
    score: number; // 1-5
    comment: string;
}

export interface RatingSet {
    story: RatingCategory;
    graphics: RatingCategory;
    gameplay: RatingCategory;
    quality: RatingCategory;
    total: number;    // 1-5
}

export interface GameHubData {
    id: string;
    slug: string;
    name: string;
    releaseDate: string;
    company: string;
    genre: string;
    coverImage: string;

    // Pre-Game Content
    storyline: string;
    recommendedFor: string[];
    notRecommendedFor: string[];

    // Metadata and Theming
    views: number;
    updatedAt: string; // ISO date string
    themeClass: string;

    // Post-Game Content
    ratings: RatingSet;
    overallReview: string;
    analysisArticles: {
        id: string;
        title: string;
        excerpt: string;
    }[];
}

export const MOCK_GAMEDATA: Record<string, GameHubData> = {
    "cyberpunk-2077": {
        id: "cp2077",
        slug: "cyberpunk-2077",
        name: "Cyberpunk 2077",
        releaseDate: "Dec 10, 2020",
        company: "CD Projekt Red",
        genre: "Action RPG",
        coverImage: "/images/cyberpunk.jpg",
        views: 15420,
        updatedAt: "2023-11-15T10:00:00Z",
        themeClass: "theme-cyberpunk",

        storyline: "In the megalopolis of Night City, you play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
        recommendedFor: ["Fans of deep narratives", "Open world explorers", "Sci-fi enthusiasts"],
        notRecommendedFor: ["Players sensitive to bugs", "Those looking for a simple arcade shooter"],

        ratings: {
            story: { score: 5, comment: "The central narrative with Johnny Silverhand is gripping, emotional, and thought-provoking." },
            graphics: { score: 5, comment: "Night City is arguably the most visually stunning open world ever created, especially with Ray Tracing." },
            gameplay: { score: 4, comment: "Combat is versatile and fun, though enemy AI can sometimes feel a bit simplistic." },
            quality: { score: 4, comment: "Massively improved since launch. Very few bugs remain, and performance is solid." },
            total: 4.5
        },
        overallReview: "After many updates, Cyberpunk 2077 has become the masterpiece it was promised to be. The city is alive, and the story of V and Johnny Silverhand is one of the best in modern gaming.",
        analysisArticles: [
            { id: "art1", title: "The Ending Explained: Johnny's Fate", excerpt: "What exactly happens when you reach the roof? We break down every possible outcome..." },
            { id: "art2", title: "Night City Lore: The Corpos", excerpt: "Arasaka and Militech rule the streets. Here is their history." }
        ]
    },
    "elden-ring": {
        id: "er",
        slug: "elden-ring",
        name: "Elden Ring",
        releaseDate: "Feb 25, 2022",
        company: "FromSoftware",
        genre: "Action RPG",
        coverImage: "/images/elden-ring.jpg",
        views: 42100,
        updatedAt: "2023-10-01T12:00:00Z",
        themeClass: "theme-eldenring",

        storyline: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        recommendedFor: ["Dark Souls veterans", "Exploration lovers", "Players who love a challenge"],
        notRecommendedFor: ["Casual gamers looking for an easy time", "Players who need quest markers"],

        ratings: {
            story: { score: 4, comment: "The lore is incredibly deep, though you have to dig for it in item descriptions." },
            graphics: { score: 5, comment: "Art direction is unparalleled, even if pure technical fidelity isn't industry-leading." },
            gameplay: { score: 5, comment: "Tight, responsive, and punishingly rewarding combat with endless build variety." },
            quality: { score: 4, comment: "Solid performance on current-gen, some minor stuttering on older machines." },
            total: 4.8
        },
        overallReview: "A masterful evolution of the Souls formula. The open world is dense, mysterious, and consistently rewarding.",
        analysisArticles: [
            { id: "art3", title: "Lore: The Shattering", excerpt: "What caused the demigods to war? Unpacking the Night of the Black Knives." }
        ]
    },
    "god-of-war-ragnarok": {
        id: "gowr",
        slug: "god-of-war-ragnarok",
        name: "God of War Ragnarok",
        releaseDate: "Nov 9, 2022",
        company: "Santa Monica Studio",
        genre: "Action Adventure",
        coverImage: "/images/god of war.jpg",
        views: 28900,
        updatedAt: "2023-12-05T09:30:00Z",
        themeClass: "theme-gowr",

        storyline: "Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
        recommendedFor: ["Story-driven action fans", "Mythology geeks", "Those wanting cinematic spectacles"],
        notRecommendedFor: ["Players wanting completely open-ended unguided exploration"],

        ratings: {
            story: { score: 5, comment: "A deeply emotional conclusion to the Norse saga focusing on father-son dynamics." },
            graphics: { score: 5, comment: "Breathtaking realms, incredibly detailed character models, and flawless performance." },
            gameplay: { score: 5, comment: "Combat is satisfyingly brutal with meaningful improvements to Atreus's utility." },
            quality: { score: 5, comment: "Incredibly polished experience from start to finish." },
            total: 5.0
        },
        overallReview: "A stunning achievement in gaming that manages to surpass its predecessor in nearly every way.",
        analysisArticles: []
    }
};
