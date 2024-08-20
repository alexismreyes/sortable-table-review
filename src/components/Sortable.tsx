import '../solution/Solution.ts';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Person } from '../solution/People.ts';
import { peopleArray, personKeys, sortByProp } from '../solution/Solution.ts';
import PeopleTable from './PeopleTable.tsx';
import '../assets/Sortable.css';

const Sortable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  /* const [sortedPeople, setSortedPeople] = useState<Person[]>([]); */
  const [selectedKey, setSelectedKey] = useState<keyof Person>('Name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setPeople(peopleArray);
    /* sortPeople(selectedKey, sortOrder); */
  }, []);

  /*  useEffect(() => {
    sortPeople(selectedKey, sortOrder);
  }, [selectedKey, sortOrder, people]); */

  //Memoize the sortedPeople array to avoid unnecessary recalculations
  const sortedPeople = useMemo(() => {
    const sorted = sortByProp(people, selectedKey);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }, [people, selectedKey, sortOrder]);

  /* const sortPeople = (key: keyof Person, order: 'asc' | 'desc') => {
    const sorted = sortByProp(people, key);
    setSortedPeople(order === 'asc' ? sorted : sorted.reverse());
  }; */

  const handleSort = (key: keyof Person) => {
    const order = key === selectedKey && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSelectedKey(key);
  };

  const sendKey = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value as keyof Person);
    setSortOrder('asc');
  };

  return (
    <>
      <div className="table-container-sort">
        <div className="table-wrapper">
          <PeopleTable people={sortedPeople} handleSort={handleSort} />
        </div>
        <div className="select-container">
          <p>
            <label className="sortable-label">Sort by:</label>
            <select onChange={sendKey}>
              {personKeys.map((key, index) => (
                <option key={index} value={key} className="sortable-label">
                  {key}
                </option>
              ))}
            </select>
          </p>
        </div>
      </div>
    </>
  );
};

export default Sortable;
