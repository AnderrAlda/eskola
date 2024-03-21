import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github, Code } from "lucide-react";
import { getRooms } from "@/services/rooms";

const RoomCard = ({
  roomName,
  description,
  codingLanguage,
  githubRepository,
  id,
}: Omit<Room, "userId">) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{roomName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {githubRepository && (
          <Link
            href={githubRepository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex gap-3">
              <Github />
              <p> Github Project</p>
            </div>
          </Link>
        )}
        <div className="flex gap-3">
          <Code />
          <p>{codingLanguage}</p>
        </div>
        <CardFooter className="p-0 pt-3">
          <Button>
            <Link href={`/rooms/${id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="flex min-h-screen justify-between p-20  container mx-auto">
      <div>
        <h1 className="font-bold text-4xl">Find Rooms</h1>
        {rooms.map((room, key) => (
          <RoomCard
            key={key}
            roomName={room.roomName}
            description={room.description}
            codingLanguage={room.codingLanguage}
            githubRepository={room.githubRepository}
            id={room.id}
          />
        ))}
      </div>
      {/*       asChild is used in shadcn so that in the DOM will appear only the link but with the style of the button */}
      <Button asChild>
        <Link href="/create-room">Create Room</Link>
      </Button>
    </main>
  );
}
