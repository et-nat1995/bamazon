create database bamazon;
use bamazon;

create table products(
	item_id int not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price DECIMAL(10,2) NULL,
    stock_quantity int not null,
    primary key (item_id)
);


insert into products(product_name, department_name, price, stock_quantity)
values ("MacBook Pro", "Computers", 2400.00, 200);

insert into products(product_name, department_name, price, stock_quantity)
values ("audio-technica ATH-M40x", "Accesories", 99.98, 40);

insert into products(product_name, department_name, price, stock_quantity)
values ("audio-technica ATH-M50x", "Computers", 149.98, 20);

insert into products(product_name, department_name, price, stock_quantity)
values ("Harry Potter Year One BlueRay", "Movies", 24.98, 200);

insert into products(product_name, department_name, price, stock_quantity)
values ("Dyson v6 Vacuum", "Home Appliances", 249.98, 340);

insert into products(product_name, department_name, price, stock_quantity)
values ("iPhone 8 Space Gray 64GB Unlocked", "Phones", 599.00, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("iPhone 8 Space Gray 256GB Unlocked", "Phones", 749.00, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("PlayStation 4 Slim", "Video Games", 300.00, 200);