import { PrismaClient } from "@prisma/client";
import HomeContent from "@/components/HomeContent";

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch games from PostgreSQL and include their PostReview for the score
  const games = await prisma.game.findMany({
    include: {
      postReview: {
        select: {
          totalScore: true,
        },
      },
    },
    // We sort by release date to show latest first
    orderBy: {
      releaseDate: "desc",
    },
  });

  return <HomeContent initialGames={games} />;
}
