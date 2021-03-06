-- Table: public.news

-- DROP TABLE public.news;

CREATE TABLE public.news
(
    id integer NOT NULL,
    body text COLLATE pg_catalog."default",
    CONSTRAINT news_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.news
    OWNER to postgres;

INSERT INTO news VALUES (1, 'Some text');
INSERT INTO news VALUES (2, 'Other text');
