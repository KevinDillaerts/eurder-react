interface FilterProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

const Filter = ({searchTerm, setSearchTerm}: FilterProps) => {
    return (
        <div className="mb-3 d-flex align-content-center">
            <label htmlFor="filter" className="form-label m-0 me-2">Filter</label>
            <input type="text" className="form-control" id="filter" value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    );
};

export default Filter;