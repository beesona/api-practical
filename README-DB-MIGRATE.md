# Installation and Usage for DB-Migration package

## Installation

Run ```npm install db-migrate db-migrate-pg --save-dev```

## Configuration

Create or copy database and environment configuration in the file database.json.
In this file specifiy the database driver, user, password, host, database and schema for each environment.  The current 
environment for running migrations is set based on the NODE_ENV environment variable.

## Usage

[See db-migration usage](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)

Set initial node and database envionment:
For MAC: export NODE_ENV=dev
For Windows: set NODE_ENV=dev

```
export NODE_ENV=migrate
export DB_USERID='<USERID>'
export DB_PASSWORD='<PASSWORD>' 
export DB_PORT='5450' 
export DB_NAME='DBNAME'
```

Create initial table script:

```db-migrate create create-table-{tablename}```

Add your sql to the yyyymmddhhmmsss-create-table-{tablename}.sql file under ./migrations/sqls/

Create an alter table script as needed:

```db-migrate create alter-table-{tablename}```

Add your sql to the yyyymmddhhmmsss-alter-table-{tablename}.sql file under ./migrations/sqls/

To run the migrations

```db-migrate up```

```db-migrate down```

Create Table Example
```
CREATE TABLE IF NOT EXISTS public.<TABLENAME>
(
    table_name_id uuid NOT NULL,
    ...
    CONSTRAINT table_name_pkey PRIMARY KEY (table_name_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

GRANT ALL ON TABLE public.<TABLENAME> TO dbadmin;

GRANT ALL ON TABLE public.<TABLENAME> TO quasaradmin;
```

Alter Table Example
```
ALTER TABLE <TABLENAME> ADD COLUMN IF NOT EXISTS <NEWCOLUMN> TEXT DEFAULT '';
````