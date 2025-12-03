/*CREATE DATABASE nodejs_rest_api;
USE nodejs_rest_api;

LOAD DATA LOCAL INFILE '/home/linus/demodata.csv'  INTO TABLE
Varor FIELDS TERMINATED BY ',' IGNORE 1 LINES (Month, Category, Sales);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);*/

CREATE DATABASE industrial_products;
USE industrial_products;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255) NOT NULL
);
