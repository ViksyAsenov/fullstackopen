import { setFilter } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter.message)
  
  return (
    <div>
      all
      <input
        type='radio'
        name='filter'
        checked={filter === 'ALL'}
        onChange={() => dispatch(setFilter('ALL'))}
      />
      important
      <input
        type='radio'
        name='filter'
        checked={filter === 'IMPORTANT'}
        onChange={() => dispatch(setFilter('IMPORTANT'))}
      />
      none important
      <input
        type='radio'
        name='filter'
        checked={filter === 'NONE_IMPORTANT'}
        onChange={() => dispatch(setFilter('NONE_IMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter