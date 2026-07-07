import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { imageService } from './image.service.js';

export const generationService = {
  async generate(userId, { prompt, style, aspectRatio }) {
    // Check user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) {
      throw ApiError.notFound("User not found.");
    }

    if (user.credits < 1) {
      throw ApiError.payment(
        "You have no credits left. Please buy more to continue."
      );
    }

    // Generate image FIRST (this may take 20-30 seconds)
    const imageUrl = await imageService.generate({
      prompt,
      style,
      aspectRatio,
    });

    // Deduct one credit
    const updated = await prisma.user.updateMany({
      where: {
        id: userId,
        credits: {
          gte: 1,
        },
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    if (updated.count === 0) {
      throw ApiError.payment("You have no credits left.");
    }

    // Save image
    const image = await prisma.image.create({
      data: {
        userId,
        prompt,
        imageUrl,
        style,
        aspectRatio,
      },
    });

    // Get latest credits
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    return {
      image,
      credits: updatedUser.credits,
    };
  },
};
