import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";

function UserCard({ user }: { user: object }) {
    return (
        <div key={user.id} className="flex gap-2 items-center justify-between ">
            <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                    <Avatar className="size-8 sm:w-10 sm:h-10">
                        <AvatarImage 
                            className="size-8 rounded-full sm:w-10 sm:h-10"
                            src={user.image ?? "/avatar.png"} />
                    </Avatar>
                </Link>
                <div className="text-xs">
                    <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer">
                        {user.name}
                    </Link>
                    <p className="text-muted-foreground">@{user.username}</p>
                    <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
            </div>
            <FollowButton userId={user.id} />
        </div>
    );
}

export default UserCard;
