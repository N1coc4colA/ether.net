import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    getUserFollowings,
    getUserFollowers,
    isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

interface PageProps {
    params: {
        username: string;
    };
}

export async function generateMetadata({ params }: PageProps) {
    const user = await getProfileByUsername(params.username);
    if (!user) {
        return;
    }

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    };
}

async function ProfilePageServer({ params }: PageProps) {
    const user = await getProfileByUsername(params.username);

    if (!user) {
        notFound();
    }

    const [posts, likedPosts, followings, followers, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        getUserFollowings(user.id),
        getUserFollowers(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
            followings={followings}
            followers={followers}
        />
    );
}

export default ProfilePageServer;
