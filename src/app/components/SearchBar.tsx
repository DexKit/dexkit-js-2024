interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
  }
  
  export const SearchBar = ({ placeholder = "Buscar...", onSearch }: SearchBarProps) => {
    return (
      <div className="w-full max-w-xl mx-auto mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  };