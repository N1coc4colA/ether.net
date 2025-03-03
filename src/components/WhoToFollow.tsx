import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "lucide-react";
import UserCard from "@/components/UserCard";

async function WhoToFollow() {
    const users = await getRandomUsers();
    if (users.length == 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Who to Follow</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {users.map((user) => <UserCard key={user.id} user={user} />)}
                </div>
            </CardContent>
        </Card>
    );
}

export default WhoToFollow;
