# pipeline-ui
A user interface for the DAISY Pipeline 2

## Dev notes

This project was created from [this electron template](https://github.com/daltonmenezes/electron-app).

### Pipeline script values in use

As of Oct 2022

#### All the `mediaType` values

* `application/oebps-package+xml`
* `application/vnd.pipeline.tts-config+xml`
* `application/x-dtbook+xml`
* `application/xml`
* `application/z3998-auth+xml`
* `application/epub+zip`
* `application/xhtml+xml`
* `text/html`
* `text/css`
* `application/xslt+xml`
* `text/plain`
* `application/vnd.oasis.opendocument.text-templa`

#### All the option `type` values

* `boolean`
* `integer`
* `anyFileURI`
* `px:dtbook-validator.script-mathml-version`
* `px:epub2-to-epub3.script-validation`
* `px:epub3-to-daisy202.script-validation`
* `string`
* `px:html-to-pef.script-stylesheet`
* `transform-query`
* `liblouis-table-query`
* `px:html-to-pef.script-hyphenation`
* `px:html-to-pef.script-hyphenation-at-page-breaks`
* `px:html-to-pef.script-line-spacing`
* ``
* `px:html-to-pef.script-notes-placement`
* `px:dtbook-to-zedai.script-validation`
* `px:epub3-to-epub3.script-ensure-pagenum-text`
* `px:epub3-to-epub3.script-tts`
* `xs:integer`
* `px:dtbook-to-pef.script-stylesheet`
* `px:dtbook-to-pef.script-hyphenation`
* `px:dtbook-to-pef.script-hyphenation-at-page-breaks`
* `px:dtbook-to-pef.script-line-spacing`
* `px:dtbook-to-pef.script-notes-placement`
* `px:epub3-to-pef.script-stylesheet`
* `px:epub3-to-pef.script-hyphenation`
* `px:epub3-to-pef.script-hyphenation-at-page-breaks`
* `px:epub3-to-pef.script-line-spacing`
* `px:epub3-to-pef.script-notes-placement`
* `px:zedai-to-pef.script-stylesheet`
* `px:dtbook-to-odt.script-asciimath`
* `px:dtbook-to-odt.script-images`
* `px:epub-to-daisy.script-validation`
* `px:epub-to-daisy.script-tts`
* `px:epub3-to-daisy3.script-validation`

## Current status

* When the app starts, it also starts the Pipeline engine (dynamically using the first free port)
* The list of scripts loads
* The user is presented with a choice of scripts
* The user adds inputs and options to their script choice
* The job runs and the app displays its latest status
* When the job is done, the user may view the results in a folder
* Many jobs can run at once, in a tabbed interface

## Known to-dos

### Script selection
* Drag and drop files to filter suggested scripts
* Or just pick a script

### Job submission
* After a user starts filling out a new job form, if they press "cancel", ask them if they want to cancel
* Validate job submission form fields
* Support multiple files

### Job details
* Confirm deleting a job

### General
* Move the pipeline "online" status to a preferences pane where you can specify the pipeline installation
* Redesign main menu

### Behind the scenes todos

* Global state via redux
* Basic testing framework via selenium


"electron": "^20.0.3",
"electron-builder": "^23.3.3",
"electron-react-devtools": "^0.5.3",