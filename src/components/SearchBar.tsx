"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SearchBar({ dbUserId }: { dbUserId: string | null }) {
    const [searchString, setSearchString] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchString.trim() !== "") {
            router.push(`/search?id=${dbUserId}&query=${searchString}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search users..."
                className="flex-grow"
            />
            <Button onClick={handleSearch}>
                <Search/>
                <span className="hidden md:block">Search</span>
            </Button>
        </div>
    );
}

export default SearchBar;
