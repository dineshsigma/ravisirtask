# ravisirtask
mysql> use world;
Database changed
mysql> CREATE TABLE `cart` (  `cart_id` varchar(20) NOT NULL DEFAULT '',  `user_id` varchar(20) DEFAULT NULL,  PRIMARY KEY (`cart_id`));
Query OK, 0 rows affected (0.12 sec)

mysql> CREATE TABLE `cartproducts` (
    ->   `id` varchar(20) NOT NULL DEFAULT '',
    ->   `pro_id` varchar(20) DEFAULT NULL,
    ->   `cart_id` varchar(20) DEFAULT NULL,
    ->   `quantity` int(11) DEFAULT NULL,
    ->   `price` int(11) DEFAULT NULL,
    ->   PRIMARY KEY (`id`),
    ->   KEY `cat_id` (`cart_id`),
    ->   CONSTRAINT `cartproducts_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
    -> )
    ->
    -> ^C
mysql> CREATE TABLE `cartproducts` (
    ->   `id` varchar(20) NOT NULL DEFAULT '',
    ->   `pro_id` varchar(20) DEFAULT NULL,
    ->   `cart_id` varchar(20) DEFAULT NULL,
    ->   `quantity` int(11) DEFAULT NULL,
    ->   `price` int(11) DEFAULT NULL,
    ->   PRIMARY KEY (`id`),
    ->   KEY `cat_id` (`cart_id`),
    ->   CONSTRAINT `cartproducts_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
    -> );
Query OK, 0 rows affected, 2 warnings (0.05 sec)

mysql> CREATE TABLE `products` (
    ->   `pro_id` varchar(20) NOT NULL DEFAULT '',
    ->   `productname` varchar(20) DEFAULT NULL,
    ->   `productstock` int(11) DEFAULT NULL,
    ->   `productprice` int(11) DEFAULT NULL,
    ->   PRIMARY KEY (`pro_id`)
    -> );
Query OK, 0 rows affected, 2 warnings (0.03 sec)

mysql> INSERT INTO `products` VALUES ('1a8yYknNS2','t-shirt',6,200),('iC02ulQGGV','red-shirt',6,260),('ScKHNkXU8g','green-shirt',6,260),('vMhJqfCmcN','blue-shirt',6,260),('yzbxuDZHUq','plain-shirt',6,200);
Query OK, 5 rows affected (0.02 sec)
Records: 5  Duplicates: 0  Warnings: 0

mysql> select * from products;
+------------+-------------+--------------+--------------+
| pro_id     | productname | productstock | productprice |
+------------+-------------+--------------+--------------+
| 1a8yYknNS2 | t-shirt     |            6 |          200 |
| iC02ulQGGV | red-shirt   |            6 |          260 |
| ScKHNkXU8g | green-shirt |            6 |          260 |
| vMhJqfCmcN | blue-shirt  |            6 |          260 |
| yzbxuDZHUq | plain-shirt |            6 |          200 |
+------------+-------------+--------------+--------------+
5 rows in set (0.00 sec)

mysql> INSERT INTO `cart` VALUES ('x7JkR124RT','dinesh'),('yaAEiZ8pFb','dinesh');
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> select * from cart;
+------------+---------+
| cart_id    | user_id |
+------------+---------+
| x7JkR124RT | dinesh  |
| yaAEiZ8pFb | dinesh  |
+------------+---------+
2 rows in set (0.00 sec)

mysql> INSERT INTO `cartproducts` VALUES ('7txKfpAvkh','1a8yYknNS2','x7JkR124RT',4,800);
Query OK, 1 row affected (0.02 sec)

mysql> select * from cartproducts;
+------------+------------+------------+----------+-------+
| id         | pro_id     | cart_id    | quantity | price |
+------------+------------+------------+----------+-------+
| 7txKfpAvkh | 1a8yYknNS2 | x7JkR124RT |        4 |   800 |
+------------+------------+------------+----------+-------+
1 row in set (0.00 sec)
