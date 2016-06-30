import ChangeFiles from "./change_files/change_files.js";
import ChangeReviews from "./change_reviews/change_reviews.js";
import ChangeCommit from "./change_commit/change_commit.js";
import ChangeLog from "./change_log/change_log.js";

export default function(context) {
  return (
    <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="#" className="navbar-brand">OpenStack Review</a>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li className="active">
                <a href="#">Change Detail</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-user"></span>
                  <span> Anonymous</span></a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="page-header">
            <h1 id="header" className="jumbotron">
              <span>#{ context.topic } </span>
              <small>{ context.subject }</small>
              <h3>{ context.owner.username }<small> { context.owner.name }</small>
                <form className="form-inline pull-right">
                  <div className="form-group">
                    <label for="vote" className="sr-only">Vote:</label>
                    <div role="group" className="btn-group">
                      <button id="voteup" type="button" className="form-control btn btn-primary">
                        <span className="glyphicon glyphicon-thumbs-up"></span>
                      </button>
                      <button id="votedown" type="button" className="form-control btn btn-primary">
                        <span className="glyphicon glyphicon-thumbs-down"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </h3>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="info col-md-5">
            <h2>Commit Message:</h2>
            {(
              context.current_revision
                ? <ChangeCommit change='336143' revision={ context.current_revision } />
                : <div className="well">No Commit is loaded</div>
            )}
            <h2>Code Review:</h2>
            {(
              context.current_revision
                ? <ChangeReviews labels={ context.labels } change='336143' revision={ context.current_revision } />
                : <div className="well">No Reviews are loaded</div>
            )}
          </div>
          <div className="files col-md-7">
            <h2>Files changed: </h2>
            {(
              context.current_revision
                ? <ChangeFiles change='336143' revision={ context.current_revision } />
                : <div className="well">No Files are loaded</div>
            )}
          </div>
          <div className="info col-md-12">
            <h2>Information:</h2>
            {(
              context.current_revision
                ? <ChangeLog details={ context.messages } />
                : <div className="well">No Logs are loaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};