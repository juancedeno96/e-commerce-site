SELECT first_name, product_name, img_url, total, u.user_id, p.product_id, quantity from

users u join order_item o on u.user_id = o.user_id join product p on o.product_id = p.product_id

where u.user_id = $1;
