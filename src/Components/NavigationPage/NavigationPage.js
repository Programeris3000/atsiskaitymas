import Container from '../Container/Container'
import { NavLink } from 'react-router-dom'
import './NavigationPage.css'


const NavigationPage = () => {

  return (

      <nav className="navigation-element">
        <ul className="navigation-list">

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/'>Home</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/songwriterslist'>Song Writers</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/albumslist'>Albums</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/songslist'>Songs</NavLink>
          </li>



      

        </ul>

      </nav>

  )
}

export default NavigationPage

// export const searchAction = async ( {request} )=>{
//   const data = await request.formData()
//   const submission = {
//     text: data.get('search-bar')
//   }
//   console.log(submission)
// }