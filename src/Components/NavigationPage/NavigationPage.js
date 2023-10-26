import Container from '../Container/Container'
import { NavLink } from 'react-router-dom'
import './NavigationPage.css'


const NavigationPage = () => {

  return (
    <Container>
      <nav className="navigation-element">
        <ul className="navigation-list">

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/'>Home</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/songwriters'>Song Writers</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/albumspage'>Albums</NavLink>
          </li>

          <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/project/songspage'>Songs</NavLink>
          </li>



      

        </ul>

      </nav>
    </Container>
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