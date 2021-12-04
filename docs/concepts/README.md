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

[**Documentation**](../) > **Concepts**

---

## Architecture

Queried, abstract data driver, is designed to seprate your storage **Data Types** and your **Data Models**, with a custom **Query Type**:

-   `queryExecuter` serializes your data with **Serializer**.
-   Serialized data will be passed to the **Executer** with provided query.
-   **Executer**'s result will ran through the **Deserializer** before return.

## Definitions

-   [Query Executer](query-executer.md)
-   [Transformers](transformers.md)
