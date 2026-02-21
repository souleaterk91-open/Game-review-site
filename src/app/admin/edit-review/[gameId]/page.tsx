import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import EditReviewForm from "./EditReviewForm";

const prisma = new PrismaClient();

export default async function EditReviewPage(props: { params: Promise<{ gameId: string }> }) {
    const params = await props.params;
    const gameId = params.gameId;

    // 1. Fetch the game AND its existing review
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: { postReview: true }
    });

    if (!game || !game.postReview) {
        notFound();
    }

    // 2. Render the client-side form, passing the existing data as defaultValues
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Edit Review: {game.title}</h1>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Update your ratings and commentary.</p>
            </div>

            <EditReviewForm review={game.postReview} />
        </div>
    );
}
