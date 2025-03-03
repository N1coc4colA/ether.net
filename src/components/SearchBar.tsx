"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchBar() {
    const [searchString, setSearchString] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchString.trim() !== "") {
            router.push(`/search?query=${searchString}`);
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
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
}

export default SearchBar;
