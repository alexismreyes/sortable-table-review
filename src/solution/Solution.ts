import {
  alexisObj,
  donnyObj,
  mattObj,
  miroslavObj,
  Person,
  rockyObj,
} from './People';

export const peopleArray: Person[] = [
  rockyObj,
  miroslavObj,
  donnyObj,
  mattObj,
  alexisObj,
];

const currentDate: string = new Date().toLocaleDateString();
peopleArray.forEach((person) => (person.Date = currentDate));

//console.log("peopleArray->",peopleArray);

const activePeople: Person[] = peopleArray.filter(
  (act) => act.Status === 'Active'
);

if (activePeople.length > 0) {
  activePeople.forEach((person) => {
    if (process.env.NODE_ENV === 'production') {
      //to hide console.log from testing
      console.log(
        `${person.Name} - ${person.Date} - ${person['Favorite Movie']}`
      );
    }
  });
} else {
  console.log('There are no Active people!!');
}

//Create the sort method

export const sortByProp = (
  peopleArr: Person[],
  prop: keyof Person
): Person[] => {
  const arrCopy = [...peopleArr];

  return arrCopy.sort((a, b) => {
    const propA = a[prop];
    const propB = b[prop];

    // Handle undefined values, this is needed because initially we define Date as a optional property which could lead to undefined
    if (propA === undefined) return 1;
    if (propB === undefined) return -1;

    if (propA < propB) return -1;

    if (propA > propB) return 1;

    return 0;
  });
};

//Using the sortByProp method

const arraySortedByName = sortByProp(peopleArray, 'Name');
const arraySortedByFavFood = sortByProp(peopleArray, 'Favorite Food');
const arraySortedByMovie = sortByProp(peopleArray, 'Favorite Movie');

if (process.env.NODE_ENV === 'production') {
  //to hide console.log from testing
  console.log('peopleArray sorted by Name: ', arraySortedByName);
  console.log('peopleArray sorted by FavFood: ', arraySortedByFavFood);
  console.log('peopleArray sorted by FavMovie: ', arraySortedByMovie);
}

export const getObjectKeys = (obj: Person): string[] => {
  return Object.keys(obj);
};

export const personKeys = getObjectKeys(alexisObj);
