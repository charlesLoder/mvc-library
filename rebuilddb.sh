rm mvcapp.db
sqlite3 mvcapp.db ".databases .quit"
npm run migration
npm run migrate
sqlite3 mvcapp.db < seeds.sql