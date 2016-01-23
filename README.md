## Morpheous.js
#### Created by Sam Mulqueen
---
#### What is Morpheous.js?
Morpheous.js is a simple javascript file that can be included in any HTML page. It checks for changes in the HTML file by making XMLHttpRequests and updates the title and body of the current HTML document to match the changed document. This means the document can be in a continuously morphing state; it can become a `morpheous HTML document`.

#### What are morpheous HTML documents useful for?
Morpheous HTML documents are useful when you have content that is constantly changing. A page that displays the current time would be a good example of this. Each time you refresh the page it will display the time it was when you refreshed the page. When Morpheous.js is added to this page, the time being displayed keeps updating; Morpheous.js is actively refreshing the content of the page, keeping it fresh.

This changes the way you can think of using web pages, and opens up opportunities to create new kinds of services.

#### How to use Morpheous.js:
If you want an HTML document to become morpheous, include the Morpheous.js script in the `<head>` of your HTML document:
```
<script type="text/javascript" src="Morpheous.js"></script>
```
You can also change the settings used by Morpheous by also creating your own script, like so:
```
<script type="text/javascript">
  var Morpheous = typeof Morpheous == "undefined" ? {} : Morpheous; // Required line
  Morpheous.delay = 500;  // 0.5 Seconds
</script>
```
The script above changes the delay between checking for updates. Here is a list of the settings that can be changed:

`Morpheous.delay`
- This is the amount of time in milliseconds that Morpheous will wait before checking for an update.
- Default: `1000` (One Second)

`Morpheous.pause`
- When this is `true`: Morpheous will wait until it is set back to `false` before checking for another update.
- Default: `false`

`Morpheous.stop`
- When this is `true`: Morpheous will stop checking for updates.
- To start Morpheous again, change `Morpheous.stop` back to `false` and call `Morpheous.start()`.
- Default: `false`

`Morpheous.log`
- When this is `true`: A message will be logged to the console every time the page is updated by Morpheous.
- Default: `true`

`Morpheous.location`
- This is the URL of the document that Morpheous will check for changes, and load the content of.
- Default: the current URL of the page

Any of these variables can also be changed at any time from the console.
