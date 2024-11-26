import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		accountId: '0e9b5fad61935c0d6483962f4a522a89',
		databaseId: '07429540-d320-4467-b534-05dbe856ec35',
		token: 'XvWhxVnRQ0eps6rxqbgHd_Tg_stKnlFBGY6o2Gqy'
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite'
});
