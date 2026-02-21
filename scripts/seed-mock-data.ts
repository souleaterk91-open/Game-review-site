import { PrismaClient } from "@prisma/client";
import { MOCK_GAMEDATA } from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting database migration...");

    for (const key of Object.keys(MOCK_GAMEDATA)) {
        const data = MOCK_GAMEDATA[key];
        console.log(`Processing ${data.name}...`);

        try {
            // 1. Create the Game
            const game = await prisma.game.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    title: data.name,
                    releaseDate: new Date(data.releaseDate),
                    company: data.company,
                    genre: data.genre,
                    coverImage: data.coverImage,
                    storyline: data.storyline,
                    recommendedFor: data.recommendedFor,
                    notRecommendedFor: data.notRecommendedFor,
                },
            });

            console.log(`  Created game: ${game.title}`);

            // 2. Create the PostReview if it has ratings
            if (data.ratings) {
                await prisma.postReview.upsert({
                    where: { gameId: game.id },
                    update: {},
                    create: {
                        gameId: game.id,
                        storyScore: data.ratings.story.score,
                        storyComment: data.ratings.story.comment,
                        graphicsScore: data.ratings.graphics.score,
                        graphicsComment: data.ratings.graphics.comment,
                        gameplayScore: data.ratings.gameplay.score,
                        gameplayComment: data.ratings.gameplay.comment,
                        qualityScore: data.ratings.quality.score,
                        qualityComment: data.ratings.quality.comment,
                        totalScore: data.ratings.total,
                        overallReview: data.overallReview,
                    },
                });
                console.log(`  Added PostReview for: ${game.title}`);
            }
        } catch (e) {
            console.error(`Error processing ${data.name}:`, e);
        }
    }

    console.log("Migration complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
