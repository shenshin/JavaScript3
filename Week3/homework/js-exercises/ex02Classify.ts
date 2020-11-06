/* 
In this exercise you'll read a little story. It's your job to turn the characters in it into classes and instantiate the class into the characters you read about!

# STORY ################

Abdulkareem is a 35 year old man, that lives in Riyadh. He has a wife and 3 children. As a day job he's a construction worker, that makes houses. He likes to eat dates and smoke water pipe.

Abdulkareem has a horse, named Adel. The horse is 15 years old and has the color brown. Usually the horse eats grass or helps transport materials for Abdulkareem.

And they lived happily ever after! 

##########################

After reading this story, you have to:

Create a class for Adbulkareem and Adel
Instantiate those classes to create an Abdulkareem object and Adel object
*/

// I took the liberty of doing this assignment in the TypeScript
// because all the classes stuff is a year better worked in this language

// possible relationships between the characters of the story
enum RelationsState {
  husband = 'man',
  wife = 'wife',
  child = 'child',
  parent = 'parent',
  pet = 'pet',
  owner = 'owner',
}

// types of organisms participating in the story
enum Species {
  human = 'human',
  horse = 'horse',
}

// general structure of orgamisms
abstract class Creature {
  readonly species: Species;
  // all other creatures that have relations with the current
  interconnections: { creature: Creature; status: RelationsState }[] = [];
  // optionals
  dateOfBirth?: Date;
  hairColor?: string;
  favouriteFood?: string;

  constructor(species: Species) {
    this.species = species;
  }
  // gets relation status between 'this' and 'creature' in parameter
  getRelation(creature: Creature): RelationsState | null {
    const interconnection = this.interconnections.find(
      i => i.creature === creature,
    );
    return interconnection !== undefined ? interconnection.status : null;
  }
  // add a creature to the interconnections of 'this'
  addInterconnection(creature: Creature, status: RelationsState) {
    this.interconnections.push({ creature, status });
  }
  // getters for different information about an organizm
  get age(): number {
    return new Date().getFullYear() - this.dateOfBirth?.getFullYear();
  }
  get children(): Creature[] {
    return this.getCreatures(RelationsState.child);
  }
  get parents(): Creature[] {
    return this.getCreatures(RelationsState.parent);
  }
  protected getCreatures(state: RelationsState): Creature[] {
    return this.interconnections
      .filter(relative => relative.status === state)
      .map(relative => relative.creature);
  }
  // class method connecting two instances of Creature class
  // by setting relation states
  static setRelation(
    creature1: Creature,
    creature2: Creature,
    status1: RelationsState,
    status2: RelationsState = status1,
  ) {
    creature1.addInterconnection(creature2, status2);
    creature2.addInterconnection(creature1, status1);
  }
}

// a Human in general
class Human extends Creature {
  // only humans and their pets have names
  readonly name: string;
  // optional properties
  homeTown?: string;
  job?: string;
  favouriteSmoke?: string;

  constructor(name: string) {
    super(Species.human);
    this.name = name;
  }
}

// a Horse in general
class Horse extends Creature {
  readonly name: string;
  job?: string;
  constructor(name: string) {
    super(Species.horse);
    this.name = name;
  }
  get owner(): Human {
    return this.getCreatures(RelationsState.owner)[0] as Human;
  }
}

// Instanciating ##########################

// Abdulkarim
const abdulkarim = new Human('Abdulkarim');
abdulkarim.dateOfBirth = new Date(1984, 23, 7);
abdulkarim.homeTown = 'Ryadh';
abdulkarim.job = 'construction worker, that makes houses';
abdulkarim.favouriteFood = 'dates';
abdulkarim.favouriteSmoke = 'water pipe';

// his wife
const gulnara = new Human('Gulnara');

// call static method to set creatures interconnection
Creature.setRelation(
  abdulkarim,
  gulnara,
  RelationsState.husband,
  RelationsState.wife,
);

// their children
[new Human('Mahmud'), new Human('Abdulla'), new Human('Fatima')].forEach(
  child => {
    // set Abdulkarim and his wife as the parents for the children
    Creature.setRelation(
      child,
      abdulkarim,
      RelationsState.child,
      RelationsState.parent,
    );
    Creature.setRelation(
      child,
      gulnara,
      RelationsState.child,
      RelationsState.parent,
    );
  },
);

// horse
const adel = new Horse('Adel');
Creature.setRelation(
  adel,
  abdulkarim,
  RelationsState.pet,
  RelationsState.owner,
);
adel.dateOfBirth = new Date(2005, 1, 1);
adel.hairColor = 'brown';
adel.favouriteFood = 'grass';
adel.job = `helps transport materials for ${adel.owner.name}`;

// OUTPUT ######################################

console.log(
  `${abdulkarim.name} is a ${abdulkarim.age} old ${
    abdulkarim.species
  } that lives in ${abdulkarim.homeTown}. He has a ${abdulkarim.getRelation(
    gulnara,
  )} and ${abdulkarim.children.length} children. As a day job he's a ${
    abdulkarim.job
  }. He likes to eat ${abdulkarim.favouriteFood} and smoke ${
    abdulkarim.favouriteSmoke
  }. ${abdulkarim.name} has a ${adel.species}, named ${adel.name}. The ${
    adel.species
  } is ${adel.age} years old and has the color ${adel.hairColor}. Usually the ${
    adel.species
  } eats ${adel.favouriteFood} or ${
    adel.job
  }. And they lived happily ever after!`,
);
