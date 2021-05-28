insert into
    order_item (total, user_id, product_id, quantity)
values
    ($1, $2, $3, $4);
    
select * from order_item where user_id = $2;