# PUG Template Engine

## Embedding CSS 

Adding a period after the pug tag indicates that the following indentations are to be treated like plain text over several new lines: 

```pug
html 
    head
        style.
            div {
                color: red;
            }
        title Embedded CSS
```

## External CSS

Use a link with the following attributes to reference a css file that is publically and statically reachable on the server. The `/style/home.css` in the href will be prefixed with `localhost:5000` which is were static files are being served by our express server.
```pug
head
    link(rel='stylesheet' href='/style/home.css')
```

## Conditional Attributes

Lists, drop-downs and navigation are often rendered with a loop iterating through a collection but by default the first item in the list is selected. This may not be the case for updating an existing item in a CMS for example and its previously value needs to be selected when the user visits this page. 

We can conditionally add attributes to the tag in the following way:

```pug
doctype html 
p please update your car make:
select(name="car")
    - const cars = ["car1","car2"]
    - const selectedCar = "car2";
    each item in cars
        - const selected = item === selectedCar
        option(value=item selected=selected)
```
output
```html
<select>
    <option value="car1">car 1</option>
    <option value="car2" selected>car 2</option>
</select>
```

Note if `doctype html` is missing from the pug file, then the selected attribute will be compiled to the following which may or may not be compatible with browsers. 

```html
<option value="car2" selected="selected">car 2</option>
```

# SASS

## Partial files 

A leading underscore in front of the .scss file tells the preprocessor that this file need not be converted to an indepedent .css file. It should not exist alone. It is to be imported by other scss files that build on top of it. 

```scss
// _partial.scss
@import 'partial'
@import '_partial' // is the same as above! just clearer that its a partial 
```
> **NB.** The Sass proecessory is smart enough to ignore the `underscore` and `file extension` when importing files!

# Express 

## Serving Static Files

Assets such as images and stylesheets possibility even javascript files needs to be accessible from the client's browser. Placing these assets in the server directory will not work unless it is publically accessible. This is what `express.static` will do for you. Given the directory structure below:

``` text
root
| - public
  | - images
  | - style
| - views
  | - main.pug
| - index.js
```

We can make the public subdirectory accessible by writing either:

```javascript
const express = require('express');
const app = express();

app.use('/static',express.static(__dirname + "/public"));
// alternatively
app.use(express.static(__dirname + "/public"));
```
The images and style subdirectory are now accessible via `localhost:5000/static/image`. Note the `'/static'` is optional routing. Removing this parameter makes the image directory accessible without `static` in the url.

sass-middleware must be declared before express.static in order to work. I suspect this maybe because of the loading sequence but who knows.

## Adding Sass middleware 

The real css file is not generated until a specific request for the page is received. There is also a prefix to tell the preprocessor how to identify the main file without its roots. 

# FORM

## File Upload in forms

Forms that take files as input need to declare the encoding type and the `enctype` attribute is only available for POST methods. 

```html
<form method='post' enctype='multipart/form-data'>
    <input type='file' />
</form>
```