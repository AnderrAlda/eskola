import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center ">
      {rooms.map((room, key) => (
        <div key={key}>{room.roomName}</div>
      ))}
    </main>
  );
}
