create user cms_express_ts;
create database cms_express_ts;
create database cms_express_ts_test;
GRANT ALL PRIVILEGES ON cms_express_ts.* TO 'cms_express_ts'@'localhost' identified by 'cms_express_ts';
GRANT ALL PRIVILEGES ON cms_express_ts_test.* TO 'cms_express_ts'@'localhost' identified by 'cms_express_ts';

drop table users;
create table users(
    email varchar(80) not null primary key,
    firstName varchar(80),
    lastName varchar(80),
    passwd varchar(200),
    guid varchar(80),
    userType enum('ADMIN', 'USER')
);