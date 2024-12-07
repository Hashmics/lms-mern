import { Menu, School } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Logout Successfully");
            navigate('/login');
        }
    }, [isSuccess])

    return (
        <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/* Desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <Link to='/'>
                    <div className="flex items-center gap-2">
                        <School size={"30"} />
                        <h1 className="hidden md:block font-extrabold text-2xl">E-Learning</h1>
                    </div>
                </Link>
                <div className="flex items-center gap-8">
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage
                                            src={user?.photoURL || "https://github.com/shadcn.png"}
                                            alt="User Avatar"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link to='my-learning'>
                                                My Learning
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to='profile'>
                                                Edit Profile
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuItem onClick={logoutHandler}>
                                        Log out
                                    </DropdownMenuItem>
                                    {
                                        user.role === "instructor" && (
                                            <>
                                                < DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    Dashboard
                                                </DropdownMenuItem>
                                            </>
                                        )
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                                <Button onClick={() => navigate('/login')}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div >
            {/* Mobile Device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full" >
                <h1 className="font-extrabold text-xl">E_Learning</h1>
                <MobileDevice />
            </div>
        </div >
    );
};

export default Navbar;

const MobileDevice = () => {

    const role = "instructor";

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className="mr-2" />
                <nav className="flex flex-col space-y-4">
                    <span>My Learning</span>
                    <span>Edit Profile</span>
                    <p>Log out</p>
                </nav>
                {
                    role === "instuctor" && (
                        <SheetFooter SheetFooter >
                            <SheetClose asChild>
                                <Button type="submit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet >
    )
}