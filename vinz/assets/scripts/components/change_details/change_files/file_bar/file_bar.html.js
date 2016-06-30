export default function(context) {
  return (
    <div className="progress">
      <div className="progress-bar progress-bar-success" style={context.addedStyle}>
        <span className="sr-only">{context.added + ' Files'}</span>
      </div>
      <div className="progress-bar progress-bar-danger" style={context.subtractedStyle}>
        <span className="sr-only">{context.subtracted + ' Files'}</span>
      </div>
    </div>
  )
}