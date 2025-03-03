import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    getUserFollowings,
    isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername((await params).username);
    if (!user) {
        return;
    }

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    };
}

async function ProfilePageServer({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername((await params).username);

    if (!user) {
        notFound();
    }

    const [posts, likedPosts, followings, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        getUserFollowings(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
            followings={followings}
        />
    );
}

export default ProfilePageServer;
