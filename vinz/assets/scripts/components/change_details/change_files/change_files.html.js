import FileBar from "./file_bar/file_bar.js";

export default function(state, props) {
  return (
    <div className="files-modified-list list-group">
      {
        Object.keys(state.files).map(function (key) {
          return (
            <div className="list-group-item">
              <div className="row">
                <div className="col-xs-9">
                  <a id={ key } href={ "/#/c/" + props.change + "/3/" + key } >{ key }</a>
                </div>
                <div className="col-xs-3">
                  <FileBar added={state.files[key].lines_inserted} subtracted={state.files[key].lines_deleted} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
