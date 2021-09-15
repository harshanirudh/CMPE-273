CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Add_New_Customer`(in c_fname varchar(50),in c_lname varchar(50),in c_email varchar(60),in c_pass char(128),out id int)
BEGIN
	insert into customer_users(fname,lname,email,pass) values(c_fname,c_lname,c_email,c_pass);
    set id=LAST_INSERT_ID();
END