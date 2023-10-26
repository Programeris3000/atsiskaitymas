import './Card.css'

const Card = (props) => {
  const { children, borderRadius, className} = props

  if (!children) {
    return
  }

  const borderClass = borderRadius ? 'border-' + borderRadius : ''
  const classes = className ? className : ''

  return (
    <div className={`card ${borderClass} ${classes}`}>{children}</div>
  )
}

export default Card