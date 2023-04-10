# creating React App from scratch

## Prerequisites 
- Install node 
## Follow the instructions
- Step 1: Node initialization
 
    * Create an empty folder and open it in VSCode
    * In terminal run 
    ```
    npm init -y
    ```
    , it will create a package.json file.
- Step 2: React and React-dom installation
    * Run 
    ```
    npm install react react-dom
    ```
- Step 3: Install Babel and Configuration
    * Run 
    ```
    npm install @babel/core @babel/preset-env @babel/preset-react babel-loader
    ```
    * After installation create a .babelrc file and write following code
    ```
    {
    "presets": ["@babel/preset-react", "@babel/preset-env"]
    }
    ```
- Step 4: Webpack installation and configuration
    * Run
    ```
    npm install webpack webpack-cli webpack-dev-server
    ```
    * Now, create webpack.config.js file and add below code
    ```
    
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const path = require("path");

    module.exports = {
        entry: "./src/index.js",
        output: {
            filename: "bundle.[hash].js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
        ],
        resolve: {
            modules: [__dirname, "src", "node_modules"],
            extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
        },
        module: {
            rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
    };
    ```
    
- Step 5: Make file structure Like this
```
    my-project/
    ├── node_modules
    ├── src/
    │   ├── App.js
    │   ├── App.css 
    │   ├── index.html 
    │   ├── index.js
    │   └── index.js
    ├── .babelrc
    ├── package-lock.json
    ├── package.json
    └── webpack.config.js
```

Now Run 
* ```npm start``` for development build
and 
* ```npm run build``` for production build