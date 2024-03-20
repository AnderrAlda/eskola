import CreateRoomForm from "@/app/create-room/create-room-form";
import React from "react";

const CreateRoomPage = () => {
  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
};

export default CreateRoomPage;
