import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import EditGameForm from "./EditGameForm";

const prisma = new PrismaClient();

export default async function EditGamePage(props: { params: Promise<{ gameId: string }> }) {
    const params = await props.params;
    const gameId = params.gameId;

    // Fetch the game data by ID
    const game = await prisma.game.findUnique({
        where: { id: gameId }
    });

    if (!game) {
        notFound();
    }

    // Render the client-side form, passing the existing data as defaultValues
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Edit Game Info: {game.title}</h1>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Update the pre-game information and general details.</p>
            </div>

            <EditGameForm game={game} />
        </div>
    );
}
