# Aloha Editor plugin: Photobooth

With this plugin you can add images of your webcam into an Aloha Editor editable area.

## Usage

* Add the plugin folder ("photobooth") to your 3rd-party or extra plugin directory in Aloha Editor.
* Add adjust the Aloha Editor configuration so that the photobooth button show up at the "insert" tab:
```
    Aloha.settings.toolbar = {
        tabs: [{
                label: 'tab.insert.label',
                components: [
                        "photobooth"
                ]
            }
        ]
    };
```

* Add the photobooth plugin CSS to your HTML
```
<link rel="stylesheet" href="/paht-to-aloha-editor/plugins/extra/photobooth/css/photobooth.css" type="text/css">
```

* Add the jQuery UI CSS to your HTML
```
<link href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
```


## Examples:
Here's an example of a picture postcard created with Aloha Editor, the photobooth plugin and PhantomJS:
http://aloha-editor.org/postamt/id/A1361535329085.html

To try it yourself navigate to http://aloha-editor.org/postamt/photobooth.html click on the default text to start editing, select the "insert" tab and click the webcam icon to capture an image via the webcam.

