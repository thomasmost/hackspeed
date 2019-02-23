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
 
CREATE TABLE "participant" (
   id SERIAL PRIMARY KEY,
   name varchar(128) NOT NULL,
   profile_photo_url VARCHAR(255),
   created timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   handle varchar(20) NOT NULL,
   email varchar(100) NOT NULL,
   verified smallint NOT NULL DEFAULT '0',
   CONSTRAINT participant_handle UNIQUE  (handle),
   CONSTRAINT participant_email UNIQUE  (email)
);
 
CREATE TABLE "participant_login" (
   id SERIAL PRIMARY KEY,
   participant_id int check (participant_id > 0) NOT NULL,
   timestamp timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT participant_login_ibfk_1 FOREIGN KEY (participant_id) REFERENCES "participant" (id) ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE INDEX participant_login_participant_id ON "participant_login" (participant_id);
 
`;

export function initializeDB(conn: Sequelize) {
   return conn.query(`select * from information_schema.tables where table_name = 'db_info'`)
   .then(function (res: any[]) {
      if (res[0].length < 1) {
         return conn.query(query);
      }
   });
}