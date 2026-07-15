"use server";
import { getCurrentUser } from "@/features/auth/actions";
import { inngest } from "@/features/inngest/client";
import { MessageRole, MessageType } from "@/generated/prisma/client";
import { generateSlug } from "random-word-slugs";
import { prisma } from "@/lib/db";

export const createProject = async (value: string) => {
    const user = await getCurrentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    try {
        const project = await prisma.project.create({
            data: {
                name: generateSlug(2, { format: "kebab" }),
                userId: user.id,
                messages: {
                    create: {
                        content: value,
                        role: MessageRole.USER,
                        type: MessageType.RESULT,
                    },
                },
            },
        });

        //TODO: add inngest
        return project;
    } catch (error) {
        console.error("❌ Error creating project:", error);
        return {
            error: "Failed to create project",
        };
    }
};

export const getProjects = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return projects;
    } catch (error) {
        console.error("❌ Error getting projects:", error);
        return {
            error: "Failed to get projects",
        };
    }
};
