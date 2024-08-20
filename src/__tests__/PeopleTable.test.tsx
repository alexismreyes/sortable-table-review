import { fireEvent, render, screen } from '@testing-library/react';
import { Person } from '../solution/People';
import PeopleTable from '../components/PeopleTable';
import Sortable from '../components/Sortable';
import * as SolutionModule from '../solution/Solution.ts'; // Adjust the import as per your module structure

//Creating mock data
//Arrange
const people: Person[] = [
  {
    Name: 'John Doe',
    'Favorite Food': 'Pizza',
    'Favorite Movie': 'Inception',
    Status: 'Active',
  },
  {
    Name: 'Jane Smith',
    'Favorite Food': 'Burger',
    'Favorite Movie': 'Matrix',
    Status: 'Inactive',
  },
];

describe('Testing for PeopleTable react component->', () => {
  describe('UNIT TESTING ->', () => {
    it('Should render PeopleTable component', () => {
      //Act
      render(<PeopleTable people={people} handleSort={() => {}} />);
      //Assert
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Favorite Food')).toBeInTheDocument();
      expect(screen.getByText('Favorite Movie')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('calls handleSort with correct key on header click->', () => {
      //Arrange
      const mockHandleSort = jest.fn();
      //Act
      render(<PeopleTable people={people} handleSort={mockHandleSort} />);
      fireEvent.click(screen.getByText('Name'));
      //Assert
      expect(mockHandleSort).toHaveBeenCalledWith('Name');
    });

    it('renders people data in table rows->', () => {
      //Act
      render(<PeopleTable people={people} handleSort={() => {}} />);
      //Assert
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  //Integration testing focuses on how different parts of the application work together.
  describe('INTEGRATION TEST ->', () => {
    it('integration with parent component', () => {
      //ARRANGE
      // Mock the peopleArray used in the Sortable component
      const testPeople: Person[] = [
        {
          Name: 'John Doe',
          'Favorite Food': 'Pizza',
          'Favorite Movie': 'Inception',
          Status: 'Active',
        },
        // Add more test data as needed
      ];

      // Override the peopleArray export with test data
      (SolutionModule.peopleArray as Person[]) = testPeople;

      render(<Sortable />);

      // Assuming Sortable renders PeopleTable and passes data and handleSort, Simulate user interactions and verify behavior
      // Example: Verify table is rendered
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      // Example: Check sorting behavior
      fireEvent.click(screen.getByRole('columnheader', { name: 'Name' }));
      // Verify that sorting is triggered
    });

    it('updates table when props change', () => {
      //ARRANGE
      const initialPeople: Person[] = [
        {
          Name: 'John Doe',
          'Favorite Food': 'Pizza',
          'Favorite Movie': 'Inception',
          Status: 'Active',
        },
      ];
      const updatedPeople: Person[] = [
        {
          Name: 'Jane Smith',
          'Favorite Food': 'Burger',
          'Favorite Movie': 'Matrix',
          Status: 'Inactive',
        },
      ];

      //ACT
      const { rerender } = render(
        <PeopleTable people={initialPeople} handleSort={() => {}} />
      );

      //ASSERT
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      rerender(<PeopleTable people={updatedPeople} handleSort={() => {}} />);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
