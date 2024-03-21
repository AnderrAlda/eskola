"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const createRoomAction = async (
  roomData: Omit<Room, "id" | "userId">
) => {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("Must be loged to create a room");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });

  //this is so that after creating room the new added room will show when you go back to home "/" and you dont have to reload the page for that. This will clear the cache.
  revalidatePath("/");
};
