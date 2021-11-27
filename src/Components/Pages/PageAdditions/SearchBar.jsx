export default function SearchBar( {searchQuery, setSearchQuery}) {
    return (
        <form action="/" method="get">
            <input
                onInput={e =>setSearchQuery(e.target.value)}
                value={searchQuery}
                type="text"
                id="header-search"
                placeholder="Search users"
                name="s" 
            />
            <button type="submit">Search</button>
        </form>
    );
}