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

[**Documentation**](../) > [**Usage**](README.md) > **Object Oreinted**

---

## Explain

Exported `executeQuery` has its own wrapper class. Recives subscriber and transformers while constructoring to make executing queries easier:

```ts
type QueriedConfiguration<InputDataType, StorageQueryType, StorageDataType> = {
	executer: QueryExecuter<StorageQueryType, StorageDataType>;
	serializer?: DataTransformer<InputDataType, StorageDataType>;
	deserializer?: DataTransformer<StorageDataType, InputDataType>;
};

export class Queried<InputDataType, StorageQueryType, StorageDataType> {
	constructor(
		private configuration: QueriedConfiguration<
			InputDataType,
			StorageQueryType,
			StorageDataType
		>
	): void;

	async execute(
		query: StorageQueryType,
		...data: InputDataType[]
	): Promise<StorageQueryType[]>;
}
```

## Examples

Even easier than `executeQuery` functio:

```ts
import { Queried } from '@queried/core';

const database = new Queried({
	executer,
	serializer,
	deserializer,
});

const result = await database.execute(query, ...data);
```
