# test_transpile
Set up a build environment using Babel and Webpack
# Set up a build environment using Babel and Webpack.

We will transpile ECMAScript 6 into ECMAScript 2015

## Step 1: Install Node

[Installing Node.js® and NPM on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)
[Installing Node.js® and NPM on Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html)

## Step 2: Use New ECMAScript 6 Features

- Create a main folder called "test_transpile" - Inside that directory, create two subdirectories "src" and "public"

	The "src" directory is a source folder that will host the original version of the JavaScript files for the application.
	The "public" directory is for hosting the compiled version of the files for the application as well as other static files.

- Inside the directory "public" create a subdirectory called "js"
Babel will place the compiled JS into this test_transpile/public/js directory

- Inside the directory "src" create a file called "script.js"

### Lets write some JavaScript

Open test_transpile/src/script.js in your favorite code editor.

Modify the "script.js" file as follows to use some new features in ECMAScript 6:
- Use let and const instead of var definitions.
- Use arrow functions instead of function() definitions
- Use template strings instead of string concatenation
- Do NOT use ECMAScript 6 promises just yet since those require extra configurations and polyfills.

#### Sample JS: 

 test_transpile/src/script.js

```javascript
const greeting = (name) => {
	const msg = `Hello ${name}`;

	console.log(msg);

	const element = document.createElement('div');
	element.innerHTML = msg;
	document.body.appendChild(element);
}

const name = "moya";
greeting(name);
```

## Step 3: Set Up Babel and Webpack

Now that the application uses ECMAScript 6 features, you need to compile it using Babel.

Open a command prompt, and navigate (cd) to the test_transpile directory.
Type the following command to install the Babel and Webpack modules:

```bash
npm install @babel/core @babel/preset-env babel-loader  webpack webpack-cli --save-dev
```

In the **test_transpile** directory, create a new file named "webpack.config.js" defined as follows:


test_transpile/webpack.config.js

```javascript
    const path = require("path");

    module.exports = {
    entry: "./src/script.js",
    module: {
        rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "public", "js"),
        publicPath: "/",
        filename: "script.bundle.js",
    },
    stats: {
        colors: true,
    },
    mode: "production",
    devtool: "source-map",
    };
```


- run "npm init -y" to auto create a "package.json" file
- Open package.json in your favorite code editor.
In the scripts section, add a script named webpack that builds your application using Webpack and Babel.

The scripts section should now look like this:

test_transpile/package.json

```javascript
    "scripts": {
        "webpack": "webpack"
    },
```

- Place your Babel configuration into a separate .babelrc configuration file.

test_transpile/.babelrc


```javascript
{
"presets": ["@babel/preset-env"]
}
```


## Step 4: Build and Run

In the test_transpile directory, double check to make sure that you created a "public/js" directory to host the compiled version of the JavaScript file.
The build process will fail if you did not create this directory

- On the command line, make sure you are in the test_transpile directory, and type the following command to build the app:

```bash
npm run webpack
```

- In the test_transpile/public directory, create a new file named "index.html" defined as follows:


test_transpile/public/index.html

```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Test transpiled JS</title>
    </head>

    <body>
    <script src="../src/script.js"></script>

    </body>
    </html>
```

Open index.html file from the public directory in your browser and, if everything went right, you should see the following text: 'Hello moya'.

## Step 5: create a local "node" web server to run the application

run the command :

```bash
    npm install express -save
```



In the test_transpile directory, create a new file named "server.js" defined as follows:

test_transpile/server.js

```javascript
    var express = require("express");
    var app = express();
    var path = require("path");

    app.use(express.static(path.resolve(__dirname, "public")));

    app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
    });

    const hostname = "127.0.0.1";
    const port = 3000;

    // Prints a log once the server starts listening
    app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });
```



## Step 6: Use the compiled version of src/script.js

Open index.html in your code editor, and modify the **script** tag as follows to load test_transpile/public/js/script.bundle.js, which is the compiled version of src/script.js:


Note: the full url of the script.bundle.js file is not needed in the html since the webserver knows that the file is located in test_transpile/public/js/script.bundle.js.


```html
<script src="js/script.bundle.js"></script>
```

## Step 7: Run server

make sure the local http server is started,
npm start
open a browser and access http://localhost:3000.
