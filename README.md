# Dalia Task
Email subscription web component

---

[Online Demo](https://anassmohamedons.github.io/dalia-task/index.html)

# How to use?

This is a web component so it can be included in any webpage, and there are two ways to add it:

#### 1. HTML Element
You can include `<email-subscription></email-subscription>` element to your **BODY**
*Using this method uses all the default options and theme values*

```` html
<!--Put this line in head section-->
<script src="https://anassmohamedons.github.io/dalia-task/email-subscription.js"></script>

<!--Put anywhere in the dom-->
<email-subscription></email-subscription>
```` 

#### 2. Using JavaScript
You can initialize the component by adding the following snippet to your web page

```` html
<script src="https://anassmohamedons.github.io/dalia-task/email-subscription.js"></script>
<script>
    new EmailSubscription(OPTS)
</script>
````

Initializing the component with the `EmailSubscription` class which takes an optional argument `options` that can manipulate **configuration** and **theme colors** with the following **OPTIONAL** properties:

````js
const opts = {
    config: {
        right: Number,
        bottom: Number,
        btnWidth: Number,
        btnHeight: Number,
        bodyWidth: Number,
        closeTimeout: Number,
        content: {
            title: String,
            subtitle: String,
            inputPlaceholder: String,
            submitBtn: String,
            doneTitle: String,
            doneSubtitle: String,
            doneWillClose: String,
            doneSeconds: String,
            errorTitle: String,
            errorSubtitle: String,
            errorBtn: String,
        }
    },
    ...
}
````

| Property   |      Default value      |  Description |
|----------|:-------------:|------:|
| right |  20 | Amount of pixels from the right side of the page |
| bottom |  20 | Amount of pixels from the bottom side of the page |
| btnWidth |  60 | Width value in pixels for the floating button |
| btnHeight |  60 | Height value in pixels for the floating button |
| bodyWidth |  60 | Width value in pixels for the popup content |
| closeTimout |  5 | Value in seconds for how long it takes to close the popup after successfull submission |
| content |  -- | Object to set text localization values |
| content.title |  "Don't miss our latest news" | Title value for first popup step |
| content.subtitle |  "Subscribe to our newsletter to receive exclusive offers, latest news and updates." | Subtitle value for first popup step |
| content.inputPlaceholder |  "Enter your email here" | Text for email input placeholder |
| content.submitBtn |  "Subscribe" | Text for email submit button |
| content.doneTitle |  "Thanks for subscribing" | Title value for success popup step |
| content.doneSubtitle |  "You will receive your first email shortly." | Subtitle value for success popup step |
| content.doneWillClose |  "This popup will close itself in " | Text for third paragraph in success popup step |
| content.doneSeconds |  "second(s)" | Text for third paragraph after the counter text in success popup step |
| content.errorTitle |  "Something wen't wrong" | Title value for error popup step |
| content.errorSubtitle |  "Something wen't wrong" | Subtitle value for error popup step |
| content.errorBtn |  "Try again" | Text for retry submit button in error popup step |

````js
const opts = {
    theme: {
        primary: Text,
        primaryDark: Text,
        textLight: Text,
        textDark: Text,
    },
    ...
}
````

| Property   |      Default value      |  Description |
|----------|:-------------:|------:|
| primary |  "#5C00F5" | CSS value for primary color |
| primaryDark |  "#4b00c7" | CSS value for dark primary color |
| textLight |  "white" | CSS value for light text color |
| textDark |  "#333" | CSS value for dark text color |

#### Example initialization snippet
````js
const opts = {
    config: {
        right: 40,
        bottom: 50,
    },
    theme: {
        primary: "red"
    }
}
new EmailSubscription(opts)
````
----

### Tests
To start the unit testing on the component run the following commands

````bash
cd .\web-component\
npm run test
````

----

### Todo

- [ ] Add more configurations, like position, shape, etc..
- [ ] Add more theming options (more control over how the component look)
- [ ] Provide a minified version of the component