import '../solution/Solution.ts';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Person } from '../solution/People.ts';
import { peopleArray, personKeys, sortByProp } from '../solution/Solution.ts';
import PeopleTable from './PeopleTable.tsx';
import '../assets/Sortable.css';

const reducer = (state: sortableState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_PEOPLE':
      return { ...state, people: action.payload };

    case 'UPDATE_SORTEDPEOPLE':
      return { ...state, sortedPeople: action.payload };

    case 'UPDATE_SELECTEDKEY':
      return { ...state, selectedKey: action.payload };

    case 'UPDATE_SORTORDER':
      return { ...state, sortOrder: action.payload };

    default:
      return state;
  }
};

const initialState: sortableState = {
  people: [],
  sortedPeople: [],
  selectedKey: 'Name',
  sortOrder: 'asc',
};

interface sortableState {
  people: Person[];
  sortedPeople: Person[];
  selectedKey: keyof Person;
  sortOrder: 'asc' | 'desc';
}

type Action =
  | { type: 'UPDATE_PEOPLE'; payload: Person[] }
  | { type: 'UPDATE_SORTEDPEOPLE'; payload: Person[] }
  | { type: 'UPDATE_SELECTEDKEY'; payload: keyof Person }
  | { type: 'UPDATE_SORTORDER'; payload: 'asc' | 'desc' };

const Sortable = () => {
  //useState() approach for simplicity

  /* const [people, setPeople] = useState<Person[]>([]);
    const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
    const [selectedKey, setSelectedKey] = useState<keyof Person>("Name");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>("asc"); 

    useEffect(()=>{
        setPeople(peopleArray);
        sortPeople(selectedKey, sortOrder);
    },[]);

    useEffect(() => {
        sortPeople(selectedKey,sortOrder);
    }, [selectedKey, sortOrder, people]);


    const sortPeople = (key: keyof Person, order: 'asc' | 'desc') =>{

        const sorted = sortByProp(people, key);
        setSortedPeople(order === 'asc' ? sorted : sorted.reverse());
    };

    const handleSort = (key: keyof Person) =>{

        const order = ( key === selectedKey && sortOrder === 'asc' ? 'desc' : 'asc');
        setSortOrder(order);
        setSelectedKey(key);
    };

    const sendKey = (e: ChangeEvent<HTMLSelectElement>) =>{
        setSelectedKey(e.target.value as keyof Person);
        setSortOrder('asc');
    };
    */

  //useReducer approach
  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PEOPLE',
      payload: peopleArray,
    });
    sortPeople(data.selectedKey, data.sortOrder);
  }, []);

  const sortPeople = (key: keyof Person, order: 'asc' | 'desc') => {
    const sorted = sortByProp(data.people, key);
    dispatch({
      type: 'UPDATE_SORTEDPEOPLE',
      payload: order === 'asc' ? sorted : sorted.reverse(),
    });
  };

  useEffect(() => {
    sortPeople(data.selectedKey, data.sortOrder);
  }, [data.selectedKey, data.sortOrder, data.people]);

  const handleSort = (key: keyof Person) => {
    const order =
      key === data.selectedKey && data.sortOrder === 'asc' ? 'desc' : 'asc';

    dispatch({
      type: 'UPDATE_SORTORDER',
      payload: order,
    });

    dispatch({
      type: 'UPDATE_SELECTEDKEY',
      payload: key,
    });
  };

  const sendKey = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_SELECTEDKEY',
      payload: e.target.value as keyof Person,
    });

    dispatch({
      type: 'UPDATE_SORTORDER',
      payload: 'asc',
    });
  };

  return (
    <>
      <div className="table-container-sort">
        <div className="table-wrapper">
          <PeopleTable people={data.sortedPeople} handleSort={handleSort} />
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
