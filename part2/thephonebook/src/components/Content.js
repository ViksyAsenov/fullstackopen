import Person from "./Person"

const Content = ({ persons, handleDelete }) => 
  (<div>
    {persons.map(person => 
      <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>
    )}
  </div>)

export default Content