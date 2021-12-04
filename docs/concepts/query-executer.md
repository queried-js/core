<div align="center">
    <img alt="Queried Logo" width="64" src="https://raw.githubusercontent.com/queried-js/brand/master/dark/main-fill.svg">
    <h1>
		<a href="https://github.com/queried-js/core">
        	@Queried/Core
    	</a>
		<span>Documentations</span>
	</h1>
</div>

<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/queried-js/core">

---

[**Documentation**](../) > [**Concepts**](README.md) > **Query Executer**

---

## Explain

### Query Executer

Data strategies cannot be limited to simple CRUD, you may want your custom functionalities. With that in mind Queried only presents an `execute` operation to execute a query. Query executers are functions that are expected to handle provided query and data:

```ts
type QueryExecuter<StorageQueryType, StorageDataType> = (
	query: StorageQueryType,
	...data: StorageDataType[]
) => StorageDataType[] | Promise<StorageDataType[]>;
```

## Examples

Simple file system executer:

```ts
import { readFile, writeFile, unlink } from 'fs/promises';

type CustomQuery = {
	path: string;
	type: 'write' | 'read' | 'remove';
};

const executer: QueryExecuter<CustomQuery, string> = async (query, ...data) => {
	const path = resolve(__dirname, query.path);

	switch (query.type) {
		case 'write': {
			await writeFile(path, data.join(''));
			break;
		}
		case 'read':
			return [await readFile(path, 'utf-8')];
		case 'remove': {
			await unlink(path);
		}
	}
};
```
