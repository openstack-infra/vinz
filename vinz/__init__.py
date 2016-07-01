# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import pkg_resources

from os import environ, path
from flask import Flask, render_template, send_from_directory
from flask_cors import CORS
from flask_webpack import Webpack


__version__ = pkg_resources.require("vinz")[0].version
here = path.abspath(path.dirname(__file__))

app = Flask(__name__)
CORS(app)
debug = "DEBUG" in environ

webpack = Webpack()
app.config["WEBPACK_MANIFEST_PATH"] = path.join(here, "manifest.json")
webpack.init_app(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/assets/<path:filename>")
def send_asset(filename):
    return send_from_directory(path.join(here, "public"), filename)

if __name__ == "__main__":
    app.debug = debug

    context = ('certs/ssl-cert-snakeoil.crt', 'certs/ssl-cert-snakeoil.key')
    app.run(
        host='127.0.0.1',
        port=1234,
        ssl_context=context,
        threaded=True,
        debug=True,
        extra_files=[app.config["WEBPACK_MANIFEST_PATH"]]
    )
