vinz
====

Vinz is a replacement UI for gerrit.


Status
------

Vinz is currently highly experimental and is implemented as a greasemonkey script.
At current it is completely unusable as a review tool. It is a proof of concept that the apis and authentication can be used in this fashion.



Architecture
------------

Vinz uses a greasemonkey shim to pull in the static vinz web application. That application, despite being static content, is served by a flask application running locally on the developers workstation. This isn't needed (apache would have sufficed) but ssl needed to be enabled and CORS headers needed to be set.

In production, the static vinz artifacts would be served by the apache that fronts gerrit, requiring neither greasemonkey or flask.


Installation
------------


1) Install greasemonkey.

2) On the greasemonkey icon in the toolbar, click the drop down.

3) Select 'New user script'

4) Name: vinz, namespace: vinz, description: vinz. Includes:   ``https://review.openstack.org/vinz*  ``

5) Close and quit the file that opens.

6) Clone this repository somewhere.

7) Find the vinz script inside your firefox profile. E.g. ``.mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js``

8) Remote that file and replace it with a symlink to the file managed in git. Any git pull operation will be picked up automatically by firefox and greasemonkey.

```
rm .mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js
ln -s /full/path/to/vinz/vinz-shim.user.js .mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js
```

9) Get your distributions form of snakeoil cert. (/etc/ssl/certs/*snakeoil* perhaps.)

10) Put copies of the cert in the flask directory

11) Run the flask python application

```
python app.py
 * Running on https://127.0.0.1:1234/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger pin code: 339-432-318

```

12) Navigate to the flask url directly with your browser, and accept the untrusted certificate



Use
---


To see it in action navigate to a change screen under vinz.
Make sure you are logged in to gerrit.

```
https://review.openstack.org/vinz/c/331377/
```

The voting buttons work!
