CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Add_New_Restaurant`(in r_name varchar(100),in r_email varchar(60),in r_pass char(128),in r_address varchar(120),in r_zipcode varchar(5))
begin
insert into restaurant_users(rname,email,pass,address,zipcode) values (r_name,r_email,r_pass,r_address,r_zipcode);
commit;

end