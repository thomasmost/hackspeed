import { Sequelize } from "sequelize-typescript";

const query = `
CREATE TABLE project (
   id SERIAL PRIMARY KEY,
   name varchar(255) NOT NULL
);
 
CREATE TABLE db_info (
   id SERIAL PRIMARY KEY,
   key varchar(255) NOT NULL,
   value varchar(255) NOT NULL
);
 
INSERT INTO db_info (id, key, value)
VALUES
    (1,'framework_version','0.0.1');
 
CREATE TABLE "user" (
   id SERIAL PRIMARY KEY,
   profile_photo_url VARCHAR(255),
   created timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   handle varchar(20) NOT NULL,
   email varchar(100) NOT NULL,
   verified smallint NOT NULL DEFAULT '0',
   CONSTRAINT user_handle UNIQUE  (handle),
   CONSTRAINT user_email UNIQUE  (email)
);
 
CREATE TABLE "user_login" (
   id SERIAL PRIMARY KEY,
   user_id int check (user_id > 0) NOT NULL,
   timestamp timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT user_login_ibfk_1 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE INDEX user_login_user_id ON "user_login" (user_id);
 
`;

export function initializeDB(conn: Sequelize) {
   return conn.query(`select * from information_schema.tables where table_name = 'db_info'`)
   .then(function (res: any[]) {
      if (res[0].length < 1) {
         return conn.query(query);
      }
   });
}