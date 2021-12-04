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

[**Documentation**](../) > **API Refrence**

---

## Types

```ts
type AsyncReturn<ReturnType> = ReturnType | Promise<ReturnType>;

type QueryExecuter<StorageQueryType, StorageDataType> = (
	query: StorageQueryType,
	...data: StorageDataType[]
) => AsyncReturn<StorageDataType[]>;

type DataTransformer<InputType, TargetType> = (
	input: InputType
) => AsyncReturn<TargetType>;

type QueriedConfiguration<InputDataType, StorageQueryType, StorageDataType> = {
	executer: QueryExecuter<StorageQueryType, StorageDataType>;
	serializer?: DataTransformer<InputDataType, StorageDataType>;
	deserializer?: DataTransformer<StorageDataType, InputDataType>;
};
```

## Functions

```ts
async function executeQuery<InputDataType, StorageQueryType, StorageDataType>(
	executer: QueryExecuter<StorageQueryType, StorageDataType>,
	query: StorageQueryType,
	serializer: DataTransformer<InputDataType, StorageDataType>,
	deserializer: DataTransformer<StorageDataType, InputDataType>,
	...data: InputDataType[]
): Promise<StorageQueryType[]>;
```

## Constructors

```ts
class Queried<InputDataType, StorageQueryType, StorageDataType> {
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
