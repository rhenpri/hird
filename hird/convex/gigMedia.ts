import { v } from "convex/values";
import { mutation, query }  from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
    args: { storageId: v.id("_storage"), format: v.string(), gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        //check how many images have already been uploaded
        const gigMedia = await ctx.db
            .query("gigMedia")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();

        if (gigMedia.length >= 5) {
            throw new Error("Maximum number of image uploads reached");
        }

        await ctx.db.insert("gigMedia", {
            storageId: args.storageId,
            format: args.format,
            gigId: args.gigId,
        });
    }
})

export const remove = mutation({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        const media = await ctx.db.query("gigMedia")
            .withIndex("by_storageId", (q) => q.eq("storageId", args.storageId))
            .unique();

        if (!media) {
            throw new Error("Media not found");
        }

        await ctx.db.delete(media._id)
    }
})