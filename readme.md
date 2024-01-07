# Building a CRUD API with Node.js and MySQL
### Step 1: Set Up a Node.js Project
The first step is to create a new directory for your project and navigate to it in your terminal:

````
mkdir node-mysql-crud-api
cd node-mysql-crud-api
````
Next, initialize a new Node.js project:

````
npm init -y
````
This command creates a package.json file with default settings.

### Step 2: Install Dependencies
You’ll need to install the necessary packages for building the API and connecting to MySQL. Open your terminal and run the following command:

````
npm i express express-validator mysql2
````

- express: is used for building the API.
- mysql2: is the MySQL driver for Node.js.
- express-validator: is used for data validation.

### Step 3: Enable ES6 Import
In this project, we will use es6 import, so you have to add "type": "module" in the package.json.

### Step 4: Creation of MySQL Database and Table
In this project we will perform CRUD operations by creating, reading, updating and deleting posts. Therefore we have to design the database and table accordingly.

First, create a database with the name you want, I named it node_crud_api.

After that, we need to create a table called posts, and there will be 6 columns inside the table – 

- id: Post ID.
- title: Title of the post.
- content: Post content.
- author: Author name of the post
- created_at: Post creation date and time.
- updated_at: Date and time of Post update.

After creating the database, use the following SQL code to create the posts table and its structure.

````
CREATE TABLE `posts` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(100) NOT NULL,
    `content` text NOT NULL,
    `author` varchar(30) NOT NULL,
    `created_at` date NOT NULL DEFAULT current_timestamp(),
    `updated_at` date NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
````

