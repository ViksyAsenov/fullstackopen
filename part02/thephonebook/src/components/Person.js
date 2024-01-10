const Person = ({ name, number, handleDelete }) => <p>{name} {number} <button onClick={handleDelete}>delete</button></p>

export default Person