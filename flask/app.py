

from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":

    context = ('ssl-cert-snakeoil.pem', 'ssl-cert-snakeoil.key')
    app.run(host='127.0.0.1', port=1234, ssl_context=context, threaded=True, debug=True)
