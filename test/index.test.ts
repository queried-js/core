import type { QueryExecuter } from '../dist';

import { resolve } from 'path';
import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

import { executeQuery } from '../dist';

const queryExecuter: QueryExecuter<
	{
		path: string;
		type: 'write' | 'read' | 'remove';
	},
	string
> = async (query, data) => {
	const path = resolve(__dirname, query.path);
	switch (query.type) {
		case 'write': {
			await writeFile(path, data);
			return;
		}
		case 'read':
			return await readFile(path, 'utf-8');
		case 'remove': {
			await unlink(path);
			return;
		}
	}
};

const path = 'store.db';
const data = 'TEST-DATA';

test('execute write query', async () => {
	await executeQuery(queryExecuter, { path, type: 'write' }, data);
	expect(existsSync(resolve(__dirname, path))).toBeTruthy();
});

test('execute read query', async () =>
	expect(
		await executeQuery(queryExecuter, { path, type: 'read' }, data)
	).toBe(data));

test('execute remove query', async () => {
	await executeQuery(queryExecuter, { path, type: 'remove' }, data);
	expect(existsSync(resolve(__dirname, path))).toBeFalsy();
});
