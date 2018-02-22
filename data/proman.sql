CREATE TABLE boards (
    id integer NOT NULL,
    user_id character varying(20) NOT NULL,
    title character varying(1000) NOT NULL
);


CREATE SEQUENCE boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE boards_id_seq OWNED BY boards.id;


CREATE TABLE cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    user_id character varying(20) NOT NULL,
    status_id integer NOT NULL,
    title character varying(100),
    "order" integer NOT NULL,
    last_access timestamp without time zone NOT NULL
);


CREATE SEQUENCE cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE cards_id_seq OWNED BY cards.id;




CREATE TABLE statuses (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


CREATE SEQUENCE statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE statuses_id_seq OWNED BY statuses.id;


CREATE TABLE users (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    submission_time timestamp without time zone NOT NULL
);


CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY boards ALTER COLUMN id SET DEFAULT nextval('boards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY statuses ALTER COLUMN id SET DEFAULT nextval('statuses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);



--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public;     
--

SELECT pg_catalog.setval('boards_id_seq', 1, false);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public;     
--

SELECT pg_catalog.setval('cards_id_seq', 1, false);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public;     
--

SELECT pg_catalog.setval('statuses_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public;     
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public;     
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards_pkey; Type: CONSTRAINT; Schema: public;     
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: statuses_pkey; Type: CONSTRAINT; Schema: public;     
--

ALTER TABLE ONLY statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public;     
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: boards_id_uindex; Type: INDEX; Schema: public;     
--

CREATE UNIQUE INDEX boards_id_uindex ON boards USING btree (id);


--
-- Name: cards_id_uindex; Type: INDEX; Schema: public; 
--

CREATE UNIQUE INDEX cards_id_uindex ON cards USING btree (id);


--
-- Name: statuses_id_uindex; Type: INDEX; Schema: public;     
--

CREATE UNIQUE INDEX statuses_id_uindex ON statuses USING btree (id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public;     
--

CREATE UNIQUE INDEX users_id_uindex ON users USING btree (id);


