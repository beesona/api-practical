CREATE TABLE table_name (
    entity_id uuid NOT NULL,
    tenant_id integer NOT NULL,
    servicer_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT entity_pkey PRIMARY KEY (entity_id)
);

ALTER TABLE table_name
    OWNER to quasar_deployers;

GRANT ALL ON TABLE public.table_name TO dbadmin;

GRANT ALL ON TABLE public.table_name TO quasaradmin;

GRANT ALL ON TABLE public.table_name TO quasar_deployers;

GRANT ALL ON TABLE public.table_name TO quasar_writers;
