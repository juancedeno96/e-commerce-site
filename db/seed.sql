CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name,
    varchar(255) not null,
    last_name,
    varchar(255) not null,
    email,
    varchar(255) not null,
    password varchar(255) not null,
    profile_pic text
);

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name varchar(50) not null,
    unit_price numeric,
    img_url text
)

insert into product (product_name, unit_price, img_url)
values ($1, $2, $3);                                       
select * from product

create table order_item (
    order_id serial primary key,
    total numeric,
    users_id int references users(users_id),
    product_id int references product(product_id),
    quantity int
)