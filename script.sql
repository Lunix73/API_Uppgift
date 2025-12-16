
CREATE DATABASE industrial_products;
USE industrial_products;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255) NOT NULL
);
