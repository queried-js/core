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

[**Documentation**](../) > [**Usage**](README.md) > **Functional**

---

## Explain

`executeQuery` function exported by Queried Serialize input before executing the query with provided executer and deserializes the result before return:

```ts
function executeQuery<InputDataType, StorageQueryType, StorageDataType>(
	executer: QueryExecuter<StorageQueryType, StorageDataType>,
	query: StorageQueryType,
	serializer: DataTransformer<InputDataType, StorageDataType>,
	deserializer: DataTransformer<StorageDataType, InputDataType>,
	...data: InputDataType[]
): Promise<StorageQueryType[]>;
```

If no transformers provided, a fallback echo transformer will be used instead:

```ts
const echoTransformer: DataTransformer<Input, Output> = (input: Input) =>
	input as any;
```

## Examples

No tricks:

```ts
import { executeQuery } from '@queried/core';

await executeQuery(executer, query, serializer, deserializer, ...data);
```
