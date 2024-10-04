# MVC Library

An MVC app for managing a library.

## why?

I built this project for a few reasons:

- I wanted to try my hand at building an MVC app from scratch
- I wanted to try more deeply understand MVC architecure. I've used MVC (Rails, Phoenix), but there's nothing like doing it all yourself
- I wanted to make a traditional web app (i.e. no JS frameworks)
- I wanted to try some old technologies and new technologies (see below)
- I wanted to use JSDocs instead of TypeScript (I do love TS though)
- I wanted to hand roll my own auth using [session based auth](https://roadmap.sh/guides/session-based-authentication)

### the old and the new

_Old tech_

- MVC architecture
- SQLite
- Server rendering everything, no client JS

_New tech_

- Drizzle for the ORM
- Hono for the server (instead of Express)
- JSDocs with type checking

Additionally, I wanted to implement some things I had learned but hadn't quite mastered, specifically database relationships like using a junction table

### things I learned

A few things I learned along the way:

- using JSDoc alone can be frustrating at times, especially in something like the `BaseModel` where types need to be abstacted
- Drizzle has some cool tools, but the docs aren't quite there yet, or at least, not the most user friendly
- Since Drizzle is still in v0, it became essential to pin package versions
- For the junction table and using a foreign key, a service layer may have been necessary. I chose not to because it's all so simple

## prereqs

Have `sqlite3` installed locally.

## install

1. Clone the repo, and run

```bash
npm i
```

> [!TIP]
> If on Mac or Linux, you can run the build script `./rebuilddb.sh` which will complete steps 2-4 automatically, except for adding it to the `.env` file.

2. Create a database

```bash
sqlite3 mvcapp.db ".databases .quit"
```

and use that database name in the `.env` file:

```.env
DB_PATH="./mvcapp.db"
```

> [!NOTE]
> Ensure that your enviroment variables are available in your session by using a tool like direnv

3. Run the migrations

```bash
npm run migrate
```

4. Optionally, you can seed the database from the `seeds.sql` file by runnning

```bash
sqlite3 mvcapp.db < seeds.sql
```

_Remember to change it to you database name if it is not `mvcapp.db`._

5. Start the app

> [!NOTE]
> Ensure that you are using node 18 or 20. The latest version at this time (v22) seems to have some issues

```bash
npm run dev
```

And navigate to localhost:3000

## use

The `seeds.sql` file generates one user:

| Username | Password |
| -------- | -------- |
| admin    | super123 |

And two roles — `admin` & `user`.

`admin` has priveleges to edit & delete all records, including users.

`user` can only edit their profile.
