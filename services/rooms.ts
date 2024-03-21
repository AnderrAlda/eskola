import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export const getRooms = async () => {
  unstable_noStore();
  const rooms = await db.query.room.findMany();
  return rooms;
};

//with this 1 layer of absctraction we separate the front from the back
//unstable_noStore is used in nextjs so that the front component that uses this func is dynamic and not static. Do npm run build to see what is static/dynamic
//this makes the function dynamic and as consequence the route that uses this function also dynamic.
