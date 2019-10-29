DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(60)NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("KitchenAid 5 quart","Kitchen and dining",250,20);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Apple Watch Series 5","Watches",600,10);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("7 habits of highly effective people","Books",18,20);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Blood Pressure Monitor","Health",45,30);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Peppa Pig's Deluxe House Playset","Toys",40,9);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("","Beauty",33,40);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("PlayStation 4 Pro 1TB Console","Games",375,10);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Acer Aspire 5 Slim Laptop","Electronics",600,15);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Digital Camera ","Electronics",125,40);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Airpod","Music",180,80);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_cost INT NOT NULL,
        PRIMARY KEY (department_id)

);