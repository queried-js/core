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

[**Documentation**](../) > [**Concepts**](README.md) > **Transformers**

---

## Explain

## Transformers

Transformers are functions which transform an input type to an output type, and it helps Queried to serialize/deserialize data:

```ts
type DataTransformer<InputType, TargetType> = (
	input: InputType
) => TargetType | Promise<TargetType>;
```

### Serializer

```ts
type Deserializer = DataTransformer<InputDataType, DatabaseDataType>;
```

### Deserializer

```ts
type Deserializer = DataTransformer<DatabaseDataType, InputDataType>;
```

## Examples

JSON.stringify and JSON.parse are string/JSON transformers:

```ts
const contextGenerator: Generator<string, JSON> = JSON.stringify;
const responseGenerator: Generator<JSON, string> = JSON.parse;
```
