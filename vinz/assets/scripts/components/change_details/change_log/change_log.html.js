export default function(props) {
  return (
    <div className="review-messages-list list-group">
      {
        props.details.map(function (elem) {
          return (
            <p className="list-group-item">{ elem.author.name + ' -- ' + elem.message }</p>
          )
        })
      }
    </div>
  )
}
