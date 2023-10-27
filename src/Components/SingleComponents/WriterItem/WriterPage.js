import { Link, useParams } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import Card from "../../Card/Card"
import './WriterItem.css'

const WriterItem = ({ data }, { key }) => {

  const { age, biography, born, childrens, id, parents, name, photoUrl } = data

  const { ID } = useParams()



  //Childrens
  let childrensElement = <p>{name} Don't have childrens</p>

  if (childrens && childrens.length >= 2) {
    childrensElement = childrens.map((child, index) => {
      return (
          <li key={index}>{child}</li>
      )
    })
  } else if (childrens.length === 1) {
    childrensElement = childrens.map((child) => {
      return (
        <span>{child}</span>
      )
    })
  }
let childrensChecker = childrens && childrens.length >= 2 ? <ul>{childrensElement}</ul> : childrensElement






  //Parents
  let parentsElement = ''

  if(parents && parents.length > 0){
    parentsElement = parents.map((parent, index)=>{
      return(
        <li key={index}>{parent}</li>
      )
    })
  }

  const parentsChecker = parents.length > 0 ? (
    <div className="parrents-wrapper">
      <h3>Parrents: </h3>
      <ul>{parentsElement}</ul>
    </div>) : null

  return (
    <>
      {data ? (
        <Card className="border-medium" key={key}>
          <Link to={`/project/songwriterslist/${id}`}>Read more about {name}</Link>
          <h2>{ID}Artist {name}</h2>
          <span>Age {age}</span>
          <span>Born date {born}</span>
          <p>Biography: {biography}</p>
          <div className="childrens-wrapper">
          <h3>{name} childrens: </h3>
          {childrensChecker}
          </div>
          {parentsChecker}
        </Card>
      ) : (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  )
}

export default WriterItem