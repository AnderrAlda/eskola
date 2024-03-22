"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountDropdown = () => {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session.data ? (
          <Button variant={"outline"}>
            <Avatar>
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session.data?.user?.name}
          </Button>
        ) : (
          ""
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session.data ? (
          <DropdownMenuLabel
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <div className="flex gap-3">
              <LogOutIcon />
              <p>Sign Out</p>
            </div>
          </DropdownMenuLabel>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const session = useSession(); //to now if a user is loged

  return (
    <header className="bg-gray-50 py-4 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <div>LOGO</div>
        <div className="flex items-center gap-5">
          {session.data ? (
            <AccountDropdown />
          ) : (
            <Button onClick={() => signIn("google")}>
              <div className="flex gap-3">
                <LogInIcon />
                <p>Sign in</p>
              </div>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
