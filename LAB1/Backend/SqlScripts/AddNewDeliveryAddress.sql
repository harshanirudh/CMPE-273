CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ADD_NEW_DELIVERY_ADDRESS`(in c_id int, in d_name varchar(50), in d_add varchar(150),in d_city varchar(50), in d_zip varchar(10), out id int)
BEGIN
	insert into DELIVERY_ADDRESS(cust_id,cname,address,city,zipcode) values(c_id,d_name,d_add,d_city,d_zip);
 set id=LAST_INSERT_ID();
END