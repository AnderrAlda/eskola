import { getRoom } from "@/services/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VideoChat } from "@/app/rooms/[roomId]/video-player";

const RoomPage = async (props: { params: { roomId: string } }) => {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room with this ID found</div>;
  }

  const languages = room.codingLanguage.split(",").map((lang) => lang.trim());

  return (
    <div className="flex w-screen h-screen">
      <div className="w-2/3 p-12">
        <div className=" rounded-lg border bg-card text-card-foreground shadow-sm bg-white p-12">
          <p className="text-black">
            <VideoChat room={room} />
          </p>
        </div>
      </div>
      <div className="w-1/3 p-12">
        <div className=" rounded-lg border bg-card text-card-foreground shadow-sm bg-white p-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-2xl">{room?.roomName}</h1>
            <p className="text-black ">{room?.description}</p>
            <Link
              href={room.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex gap-3 text-black">
                <Github />
                <p> Github Project</p>
              </div>
            </Link>

            <div className="flex gap-2 flex-wrap">
              {languages.map((language, key) => (
                <Badge className="w-fit" key={key}>
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;

//asyn function will be render in the server in nextjs
