import {Person} from "../solution/People.ts";
import "../assets/PeopleTable.css";
import "../assets/Common.css";


interface Props{
    people: Person[];
    handleSort: (key: keyof Person) => void;
}

const PeopleTable: React.FC<Props> = ({people, handleSort}) => {
    return (
        <>
            <div>
            <table className="table-container people-table">
                <thead>
                <tr>
                <th onClick={()=> handleSort("Name")}>Name</th>
                <th onClick={()=> handleSort("Favorite Food")}>Favorite Food</th>
                <th onClick={()=> handleSort("Favorite Movie")}>Favorite Movie</th>
                <th onClick={()=> handleSort("Status")}>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    people.map((person, index) => (
                        <tr key={index}>
                            <td>{person.Name}</td>
                            <td>{person["Favorite Food"]}</td>
                            <td>{person["Favorite Movie"]}</td>
                            <td>{person.Status}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
        </>
    )
}

export default  PeopleTable;