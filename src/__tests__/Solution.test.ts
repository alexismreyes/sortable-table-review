import { getObjectKeys, sortByProp } from '../solution/Solution';
import { Person } from '../interface/interface';

describe('Testing for Solution.ts', () => {
  describe('Testing getObjectKeys', () => {
    it('Should return the keys from a Person Object', () => {
      //Arrange
      const testObj: Person = {
        Name: 'Margarita',
        'Favorite Food': 'Pupusas',
        'Favorite Movie': 'Titanic',
        Status: 'Active',
      };

      const keys = ['Name', 'Favorite Food', 'Favorite Movie', 'Status'];

      //Act
      const getKeys = getObjectKeys(testObj);

      //Assert
      expect(getKeys).toEqual(keys);
    });

    it('Should return an empty array with no keys', () => {
      //Arrange
      const emptyObj: Person = {} as Person;

      const noKeys: [] = [];

      //Act
      const getKeys = getObjectKeys(emptyObj);

      //Assert
      expect(getKeys).toEqual(noKeys);
    });
  });

  describe('Testing sortByProps', () => {
    const peopleArray: Person[] = [
      {
        Name: 'Juan',
        'Favorite Food': 'Tamales',
        'Favorite Movie': 'El padrino',
        Status: 'Active',
      },
      {
        Name: 'Pedro',
        'Favorite Food': 'Huevos fritos',
        'Favorite Movie': 'Cantinflas',
        Status: 'Active',
      },
      {
        Name: 'Alicia',
        'Favorite Food': 'Pupusas',
        'Favorite Movie': 'Pablo Escobar',
        Status: 'Inactive',
      },
    ];

    const peopleArraySortedByName: Person[] = [
      {
        Name: 'Alicia',
        'Favorite Food': 'Pupusas',
        'Favorite Movie': 'Pablo Escobar',
        Status: 'Inactive',
      },
      {
        Name: 'Juan',
        'Favorite Food': 'Tamales',
        'Favorite Movie': 'El padrino',
        Status: 'Active',
      },
      {
        Name: 'Pedro',
        'Favorite Food': 'Huevos fritos',
        'Favorite Movie': 'Cantinflas',
        Status: 'Active',
      },
    ];

    it('Should return an array sorted by Name prop', () => {
      const sortedArrayByName = sortByProp(peopleArray, 'Name');
      expect(sortedArrayByName).toEqual(peopleArraySortedByName);
    });

    it('Should not mutate the original array', () => {
      const originalArray = [...peopleArray];
      sortByProp(peopleArray, 'Name');
      expect(peopleArray).toEqual(originalArray);
    });

    it('Should handle an empty array', () => {
      const emptyArray: Person[] = [];
      const sortedArray = sortByProp(emptyArray, 'Name');
      expect(sortedArray).toEqual([]);
    });

    it('Should handle an array with one object', () => {
      const singleItemArray: Person[] = [
        {
          Name: 'Solo',
          'Favorite Food': 'Tacos',
          'Favorite Movie': 'Star Wars',
          Status: 'Active',
        },
      ];
      const sortedArray = sortByProp(singleItemArray, 'Name');
      expect(sortedArray).toEqual(singleItemArray);
    });
  });
});
