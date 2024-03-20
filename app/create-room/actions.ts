"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export const createRoomAction = async (
  roomData: Omit<Room, "id" | "userId">
) => {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("Must be loged to create a room");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });
};
