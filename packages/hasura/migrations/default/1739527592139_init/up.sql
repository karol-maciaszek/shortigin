SET check_function_bodies = false;

CREATE TABLE public.shortcut_visits (
    id bigint NOT NULL,
    shortcut_id bigint NOT NULL,
    ip text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.shortcut_visits OWNER TO postgres;
CREATE SEQUENCE public.shortcut_visits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.shortcut_visits_id_seq OWNER TO postgres;
ALTER SEQUENCE public.shortcut_visits_id_seq OWNED BY public.shortcut_visits.id;
CREATE TABLE public.shortcuts (
    id bigint NOT NULL,
    slug text,
    url text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.shortcuts OWNER TO postgres;
CREATE SEQUENCE public.shortcuts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.shortcuts_id_seq OWNER TO postgres;
ALTER SEQUENCE public.shortcuts_id_seq OWNED BY public.shortcuts.id;
ALTER TABLE ONLY public.shortcut_visits ALTER COLUMN id SET DEFAULT nextval('public.shortcut_visits_id_seq'::regclass);
ALTER TABLE ONLY public.shortcuts ALTER COLUMN id SET DEFAULT nextval('public.shortcuts_id_seq'::regclass);
SELECT pg_catalog.setval('public.shortcut_visits_id_seq', 1, false);
SELECT pg_catalog.setval('public.shortcuts_id_seq', 1, false);
ALTER TABLE ONLY public.shortcut_visits
    ADD CONSTRAINT shortcut_visits_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shortcuts
    ADD CONSTRAINT shortcuts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shortcuts
    ADD CONSTRAINT shortcuts_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.shortcut_visits
    ADD CONSTRAINT shortcut_visits_shortcut_id_fkey FOREIGN KEY (shortcut_id) REFERENCES public.shortcuts(id) ON UPDATE CASCADE ON DELETE CASCADE;
