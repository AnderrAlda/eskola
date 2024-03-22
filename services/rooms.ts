import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

//with this 1 layer of absctraction we separate the front from the back
//unstable_noStore is used in nextjs so that the front component that uses this func is dynamic and not static. Do npm run build to see what is static/dynamic
//this makes the function dynamic and as consequence the route that uses this function also dynamic.

export const getRooms = async () => {
  unstable_noStore();
  const rooms = await db.query.room.findMany();
  return rooms;
};

export const getRoom = async (RoomId: string) => {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, RoomId),
  });
};
