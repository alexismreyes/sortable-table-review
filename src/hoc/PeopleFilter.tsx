import React, { ChangeEvent, useState } from 'react';
import { Person } from '../solution/People';

interface PeopleFilterProps {
  people: Person[];
}

const PeopleFilter = <P extends PeopleFilterProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const FilterComponent: React.FC<P> = (props: P) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    //filter the people array based on the Search term
    const filteredPeople = props.people.filter((person) =>
      person.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <div className="table-container-sort">
          <label className="sortable-label">Filter by Name:</label>
          <input type="text" value={searchTerm} onChange={handleSearch} />
        </div>
        <WrappedComponent {...props} people={filteredPeople} />
      </>
    );
  };

  return FilterComponent; // Return the functional component
};

export default PeopleFilter;
