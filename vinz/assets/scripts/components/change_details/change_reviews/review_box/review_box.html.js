export default function(props) {
  return (
    <ul className="list-group">
      <li className="list-group-item active">{ props.name }</li>
        {
          props.item.all.map(function (elem) {
            if(!parseInt(elem.value, 10)) {
              return
            }
            return (
              <li className="list-group-item">
                <span className="badge">{ elem.value }</span>
                <span>{ elem.name }</span>
              </li>
            )
          })
        }
    </ul>
  )
}