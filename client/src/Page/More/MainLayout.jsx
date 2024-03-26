import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "../../components/ui/toaster";
import { LogoutButton } from "../../components/Log(in-out)Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User, useAuth0 } from "@auth0/auth0-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { CopyIcon, Dock, GroupIcon, HomeIcon, Upload } from "lucide-react";
import { Button, buttonVariants } from "../../components/ui/button";
import { DialogFooter, DialogHeader, DialogOverlay } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { AccCard } from "../../lists/Data";
import { ChatCard } from "../../components/Cards";
// import { Toast } from "../../components/ui/toast";
// import Footer from "../../Components/Footer/Footer";
// import Navbar from "../../Components/Navbar/Navbar";

const MainLayout = () => {
  const { user } = useAuth0();
  const [modal, setmodal] = useState(false)
  const location = useLocation();
  const [Active, setActive] = useState(false)
  const isButtonActive = (to) => {
    return location.pathname === to;
  };

  return (
    <div className="w-screen h-screen bg-grey-1 text-gray-5">
      <div className='absolute text-gray-5 bg-base-primary grid justify-center w-52 pt-6 h-screen'>
        <div className="text-center">
          <h1 className='flex gap-4 justify-start px-4 font-bold text-xl pb-16'><Dock /> Doc-Vault</h1>
          <ul className='grid gap-2 text-gray-3 text-md font-semibold'>
            <Link to="/" className={buttonVariants({ variant: "secondary", size: "sm", className: "flex w-52 gap-4 hover:bg-gray-5 hover:text-gray-10" })}><HomeIcon /> My Documents</Link>
            <Link to="/friends" className={buttonVariants({ variant: "secondary", size: "sm", className: "flex w-52 gap-4 hover:bg-gray-5 hover:text-gray-10" })}><GroupIcon /> Friends</Link>
            <Dialog>
              <DialogTrigger asChild onClick={() => setmodal(true)}>
                <Button className="cursor-pointer flex gap-4 w-52 hover:text-gray-10 hover:bg-gray-5"><Upload />Upload</Button>
              </DialogTrigger>
              <DialogOverlay className="grid place-items-center">
                <DialogContent className=" z-50 text-gray-10 bg-gray-5 rounded-xl w-96 p-12 grid">
                  <DialogHeader>
                    <DialogTitle className="pb-4 font-bold text-xl">Upload Documents</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-4 place-items-start">
                      <p>Your Document</p>
                      <Input id="picture" type="file" className="w-64" />
                      <p>Digital Signature:</p>
                      <Input id="picture" type="file" className="w-64" />
                    </div>
                    <Button type="submit" className="bg-semantics-1 flex gap-2 text-gray-5 justify-center"><Upload/>Upload</Button>
                  </div>

                </DialogContent>
              </DialogOverlay>

            </Dialog>
            <LogoutButton />
          </ul>
        </div>
      </div>
      <div className="">
        <Outlet />
        {/* <Footer/> */}
      </div>
      <HoverCard className="">
        <HoverCardTrigger className="absolute z-20 right-5 top-5 flex cursor-pointer items-center gap-2 bg-gray-6 p-2 rounded-3xl">
          <Avatar className="w-8">
            <AvatarImage className="rounded-full" src={user.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

        </HoverCardTrigger>
        <HoverCardContent className="z-20 mt-2 grid gap-2 text-center w-44 bg-gray-6 p-2">
          <h1 className="text-sm tracking-widest">{user.name}</h1>
          <h1 className="text-gray-1">AccountType: Sellers</h1>

        </HoverCardContent>
      </HoverCard>
      {isButtonActive("/friends") && (
        <div className=" pt-16 bg-base-primary absolute z-10 right-0 top-0 w-64 h-[100vh] flex flex-col gap-4">
          {AccCard.map((data)=>{
            return(
              <ChatCard
              {...data}
              />
            )
          })}
        </div>
      )}
    </div>
  );
};

export default MainLayout;