DELIMITER $$
CREATE  PROCEDURE `SP_Add_New_Customer`(in c_fname varchar(50),in c_lname varchar(50),in c_email varchar(60),in c_pass char(128),out id int)
BEGIN
	insert into customer_users(fname,lname,email,pass) values(c_fname,c_lname,c_email,c_pass);
    set id=LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `SP_ADD_NEW_DELIVERY_ADDRESS`(in c_id int, in d_name varchar(50), in d_add varchar(150),in d_city varchar(50), in d_zip varchar(10), out id int)
BEGIN
	insert into DELIVERY_ADDRESS(cust_id,cname,address,city,zipcode) values(c_id,d_name,d_add,d_city,d_zip);
 set id=LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `SP_ADD_NEW_DISH`(in rid int,in dname varchar(60),in ingre varchar(255),in dimg varchar(150),in dprice varchar(15),in ddesc varchar(255),in dcat VARCHAR(30),in dtype VARCHAR(30) ,out id int)
BEGIN
insert into restaurant_dishes (REST_ID,DISH_NAME,INGREDIENTS,IMAGE,PRICE,DISH_DESCR,CATEGORY,DISH_TYPE) VALUES (rid,dname,ingre,dimg,dprice,ddesc,dcat,dtype);
set id=LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `SP_ADD_NEW_FAV`(in c_id int, in r_id int , out id int)
BEGIN
if not exists( select fav_id from CUSTOMER_FAVOURITES where cust_id=c_id and rest_id=r_id) then
	insert into  CUSTOMER_FAVOURITES(cust_id,rest_id) values(c_id,r_id);
    set id=LAST_INSERT_ID();
    end if;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `SP_ADD_NEW_IMAGE`(IN R_ID INT,IN IMG VARCHAR(200),OUT ID INT )
BEGIN
 INSERT INTO RESTAURANT_IMAGES(REST_ID,IMAGE) VALUES(R_ID,IMG);
 set id=LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `SP_ADD_NEW_ORDER`(IN R_ID INT,IN C_ID INT,IN O_STATUS VARCHAR(50), IN O_TYPE VARCHAR(50),in O_AMOUNT int,in dishes json,in o_time varchar(200),in address int,OUT ID INT )
BEGIN
INSERT INTO ORDERS(REST_ID,CUST_ID,ORD_STATUS,ORD_TYPE,AMOUNT,DISH_DETAILS,ORD_TIMESTAMP,ORD_DEL_ADDRESS) VALUES(R_ID,C_ID,O_STATUS,O_TYPE,O_AMOUNT,dishes,o_time,address);
set id=LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `SP_Add_New_Restaurant`(in r_name varchar(50),in r_add varchar(120), in r_city varchar(40),in r_state varchar(49),in r_zip varchar(5),in r_country varchar(40),in r_email varchar(60),in r_pass char(128),out id int)
BEGIN
	insert into RESTAURANT_USERS(rname,email,pass,street,city,state,country,zipcode,rdelivery_mode) values(r_name,r_email,r_pass,r_add,r_city,r_state,r_country,r_zip,"both");
    set id=LAST_INSERT_ID();
END$$
DELIMITER ;
