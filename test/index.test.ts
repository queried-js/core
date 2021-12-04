import type { QueryExecuter } from '../dist';

import { resolve } from 'path';
import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

import { Queried } from '../dist';

type Query = {
	path: string;
	type: 'write' | 'read' | 'remove';
};

type DataType = { [key: string]: string };

const executer: QueryExecuter<Query, string> = async (query, ...data) => {
	const path = resolve(__dirname, query.path);
	switch (query.type) {
		case 'write': {
			await writeFile(path, data.join(''));
			return;
		}
		case 'read':
			return [await readFile(path, 'utf-8')];
		case 'remove': {
			await unlink(path);
			return;
		}
	}
};

const path = 'store.db';
const data = { content: 'test-data' };

const queried = new Queried<DataType, Query, string>({
	executer,
	serializer: JSON.stringify,
	deserializer: JSON.parse,
});

test('execute write query', async () => {
	await queried.execute({ path, type: 'write' }, data);
	expect(existsSync(resolve(__dirname, path))).toBeTruthy();
});

test('execute read query', async () =>
	expect(await queried.execute({ path, type: 'read' })).toStrictEqual([
		data,
	]));

test('execute remove query', async () => {
	await queried.execute({ path, type: 'remove' });
	expect(existsSync(resolve(__dirname, path))).toBeFalsy();
});
