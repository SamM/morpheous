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
