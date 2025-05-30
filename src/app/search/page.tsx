"use client";

import { useSearchParams } from "next/navigation"; // Use useSearchParams for client-side query parameters
import { useEffect, useState } from "react";
import { searchUsers } from "@/actions/user.action";
import { searchPosts } from "@/actions/post.action";
import UserCard from "@/components/UserCard";
import PostCard from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming you have a Tabs component
import { Spinner } from "@/components/ui/spinner";

interface User {
    id: string;
    email: string;
    username: string;
    name: string | null;
    image: string | null;
    _count: {
        posts: number;
        followers: number;
        following: number;
    };
}

interface Post {
    id: string;
    title?: string;
    content: string | null;
    authorId: string;
    createdAt: Date;
    updateAt: Date;
    image: string | null;
    comments: {
        id: string;
        createdAt: Date;
        postId: string;
        authorId: string;
        content: string;
        author: {
            id: string;
            username: string;
            name: string | null;
            image: string | null;
        };
    }[];
    likes: {
        userId: string;
    }[];
    _count: {
        comments: number;
        likes: number;
    };
    author: {
        id: string;
        username: string;
        name: string | null;
        image: string | null;
    };
}

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Get query param
    const dbUserId = searchParams.get("id"); // Get query param
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("posts"); // To make the posts tab as initial one

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                try {
                    const [userResults, postResults] = await Promise.all([
                        searchUsers(query as string),
                        searchPosts(query as string),
                    ]);
                    setUsers(userResults);
                    setPosts(postResults);
                } catch (error) {
                    console.error("Error searching users or posts:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchResults();
        }
    }, [query]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <div className="space-y-4">
                        {users.length > 0 ? (
                            users.map((user) => <UserCard key={user.id} user={user} />)
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="posts">
                    <div className="space-y-4">
                        {posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post.id} post={post} dbUserId={dbUserId} />)
                        ) : (
                            <p>No posts found</p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SearchResults;
