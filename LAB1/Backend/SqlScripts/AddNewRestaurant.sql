CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Add_New_Restaurant`(in r_name varchar(50),in r_add varchar(120), in r_city varchar(40),in r_state varchar(49),in r_zip varchar(5),in r_country varchar(40),in r_email varchar(60),in r_pass char(128),out id int)
BEGIN
	insert into RESTAURANT_USERS(rname,email,pass,street,city,state,country,zipcode) values(r_name,r_email,r_pass,r_add,r_city,r_state,r_country,r_zip);
    set id=LAST_INSERT_ID();
END