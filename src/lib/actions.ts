"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Helper to check admin status
async function requireAdmin() {
    const session = await auth();
    // @ts-ignore
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized Access");
    }
    return session;
}

export async function createGame(formData: FormData) {
    await requireAdmin();

    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const genre = formData.get("genre") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const coverImage = formData.get("coverImage") as string;
    const storyline = formData.get("storyline") as string;

    // Parse comma separated strings into arrays
    const recommendedForStr = formData.get("recommendedFor") as string;
    const recommendedFor = recommendedForStr.split(',').map(s => s.trim()).filter(Boolean);

    const notRecommendedForStr = formData.get("notRecommendedFor") as string;
    const notRecommendedFor = notRecommendedForStr.split(',').map(s => s.trim()).filter(Boolean);

    // Generate a simple slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        const game = await prisma.game.create({
            data: {
                title,
                slug,
                company,
                genre,
                releaseDate: new Date(releaseDate),
                coverImage,
                storyline,
                recommendedFor,
                notRecommendedFor
            }
        });

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true, gameId: game.id };
    } catch (error) {
        console.error("Failed to create game:", error);
        return { success: false, error: "Failed to create game in database" };
    }
}

export async function updateGame(gameId: string, formData: FormData) {
    await requireAdmin();

    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const genre = formData.get("genre") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const coverImage = formData.get("coverImage") as string;
    const storyline = formData.get("storyline") as string;

    // Parse comma separated strings into arrays
    const recommendedForStr = formData.get("recommendedFor") as string;
    const recommendedFor = recommendedForStr.split(',').map(s => s.trim()).filter(Boolean);

    const notRecommendedForStr = formData.get("notRecommendedFor") as string;
    const notRecommendedFor = notRecommendedForStr.split(',').map(s => s.trim()).filter(Boolean);

    // Update slug if title changed
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        const game = await prisma.game.update({
            where: { id: gameId },
            data: {
                title,
                slug,
                company,
                genre,
                releaseDate: new Date(releaseDate),
                coverImage,
                storyline,
                recommendedFor,
                notRecommendedFor
            }
        });

        revalidatePath("/");
        revalidatePath("/admin");
        revalidatePath(`/games/${game.slug}`);
        return { success: true, gameId: game.id };
    } catch (error) {
        console.error("Failed to update game:", error);
        return { success: false, error: "Failed to update game in database" };
    }
}

export async function createPostReview(gameId: string, formData: FormData) {
    await requireAdmin();

    // Extract all scores and parse them to numbers
    const storyScore = parseInt(formData.get("storyScore") as string, 10);
    const graphicsScore = parseInt(formData.get("graphicsScore") as string, 10);
    const gameplayScore = parseInt(formData.get("gameplayScore") as string, 10);
    const qualityScore = parseInt(formData.get("qualityScore") as string, 10);

    // Input validation for safety
    const scores = [storyScore, graphicsScore, gameplayScore, qualityScore];
    if (scores.some(s => isNaN(s) || s < 1 || s > 5)) {
        return { success: false, error: "All scores must be numbers between 1 and 5" };
    }

    // Auto-calculate the total score (average) as standard practice for such reviews
    const totalScore = parseFloat((scores.reduce((a, b) => a + b, 0) / 4).toFixed(1));

    try {
        const review = await prisma.postReview.create({
            data: {
                gameId,
                storyScore,
                storyComment: formData.get("storyComment") as string,
                graphicsScore,
                graphicsComment: formData.get("graphicsComment") as string,
                gameplayScore,
                gameplayComment: formData.get("gameplayComment") as string,
                qualityScore,
                qualityComment: formData.get("qualityComment") as string,
                overallReview: formData.get("overallReview") as string,
                totalScore,
            }
        });

        revalidatePath("/");
        revalidatePath("/admin");
        revalidatePath(`/games/${gameId}`); // Or wherever the detail page is hosted

        return { success: true, reviewId: review.id };
    } catch (error) {
        console.error("Failed to create review:", error);
        return { success: false, error: "Failed to save review to database" };
    }
}

export async function updatePostReview(reviewId: string, formData: FormData) {
    await requireAdmin();

    // Extract all scores and parse them to numbers
    const storyScore = parseInt(formData.get("storyScore") as string, 10);
    const graphicsScore = parseInt(formData.get("graphicsScore") as string, 10);
    const gameplayScore = parseInt(formData.get("gameplayScore") as string, 10);
    const qualityScore = parseInt(formData.get("qualityScore") as string, 10);

    // Input validation for safety
    const scores = [storyScore, graphicsScore, gameplayScore, qualityScore];
    if (scores.some(s => isNaN(s) || s < 1 || s > 5)) {
        return { success: false, error: "All scores must be numbers between 1 and 5" };
    }

    // Auto-calculate the total score
    const totalScore = parseFloat((scores.reduce((a, b) => a + b, 0) / 4).toFixed(1));

    try {
        const review = await prisma.postReview.update({
            where: { id: reviewId },
            data: {
                storyScore,
                storyComment: formData.get("storyComment") as string,
                graphicsScore,
                graphicsComment: formData.get("graphicsComment") as string,
                gameplayScore,
                gameplayComment: formData.get("gameplayComment") as string,
                qualityScore,
                qualityComment: formData.get("qualityComment") as string,
                overallReview: formData.get("overallReview") as string,
                totalScore,
            }
        });

        revalidatePath("/");
        revalidatePath("/admin");
        revalidatePath(`/games/${review.gameId}`);

        return { success: true, reviewId: review.id };
    } catch (error) {
        console.error("Failed to update review:", error);
        return { success: false, error: "Failed to update review in database" };
    }
}

export async function deleteGame(gameId: string) {
    await requireAdmin();

    try {
        await prisma.game.delete({
            where: { id: gameId }
        });

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete game:", error);
        return { success: false, error: "Failed to delete game from database" };
    }
}
