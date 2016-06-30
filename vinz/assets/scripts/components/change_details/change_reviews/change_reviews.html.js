import ReviewBox from "./review_box/review_box.js";

export default function(props) {
  return (
    <div className="code-review-list">
    {
      Object.keys(props.labels).map(function (key) {
        return (
          <ReviewBox name={key} item={props.labels[key]} />
        )
      })
    }
    </div>
  )
}