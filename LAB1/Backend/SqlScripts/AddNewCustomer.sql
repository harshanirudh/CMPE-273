CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Add_New_Customer`(in c_fname varchar(50),in c_lname varchar(50),in c_email varchar(60),in c_pass char(128),in c_address varchar(120),in c_zipcode varchar(5))
BEGIN
insert into customer_users(fname,lname,email,pass,address,zipcode) values (c_fname,c_lname,c_email,c_pass,c_address,c_zipcode);
END