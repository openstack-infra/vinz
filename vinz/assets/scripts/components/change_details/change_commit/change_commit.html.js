export default function(context) {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <span className="commit-message">{ context.message }</span>
      </div>
    </div>
  )
}
