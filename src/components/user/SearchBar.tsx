"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsSearchOpen(true)}
        className="cursor-pointer"
      >
        <Search className="w-5 h-5 hover:text-primary hover:cursor-pointer" />
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default SearchBar;
