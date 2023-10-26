import { useParams } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import Card from "../Components/Card/Card"

const WriterPage = ({ data }, { key }) => {

  const { age, biography, born, childrens, id, parrents, name, photoUrl } = data

  const { ID } = useParams()




  //Childrens
  let childrensElement = <p>{name} Don't have childrens</p>

  if (childrens && childrens.length >= 2) {
    childrensElement = childrens.map(child => {
      return (
          <li key={child}>{child}</li>
      )
    })
  } else if (childrens.length === 1) {
    childrensElement = childrens.map(child => {
      return (
        <span>{child}</span>
      )
    })
  }


  //Parrents

  return (
    <>
      {data ? (
        <Card className="border-medium" key={key}>
          <h2>{ID}Artist {name}</h2>
          <span>Age {age}</span>
          <span>Born date {born}</span>
          <p>Biography: {biography}</p>
          {childrens && childrens.length >= 2 ? <ul>{childrensElement}</ul> : childrensElement}

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

export default WriterPage