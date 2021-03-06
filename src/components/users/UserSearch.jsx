import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

const UserSearch = () => {
  const [text, setText] = useState('')

  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Upisite nesto u pretragu.', 'error')
    } else {
      //Pretraga korisnika
      dispatch({ type: 'SET_LOADING' })
      const users = await searchUsers(text)
      dispatch({ type: 'GET_USERS', payload: users })
      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full input text-black bg-gray-200 input-lg pr-40'
                placeholder='Pretraga'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type='submit'
                className='btn btn-lg absolute top-0 right-0 rounded-l-none'
              >
                Pretraži
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className='btn btn-ghost btn-lg'
            onClick={() => dispatch({ type: 'RESET_SEARCH' })}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
