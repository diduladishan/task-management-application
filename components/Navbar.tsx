import { LuAlignJustify } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="flex items-center py-1 bg-[#ffff]">
      <div className="text-[30px] text-black w-[290px]  h-full px-4 cursor-pointer">
        <Image
          src="/logo/code94 labs logo.png"
          alt="My Logo"
          width={234}
          height={63}
        />
      </div>

      <div className="flex items-center justify-between px-6 w-full">
        <Input type="text" placeholder="Search Tasks" className="w-[500px]" />
        <div className="ml-auto">
          <div className="flex items-center gap-2  border rounded-full px-2 py-[3px] drop-shadow-md cursor-pointer">
            <LuAlignJustify />
            <Image
              src="/logo/profile img.png"
              alt="My Logo"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
