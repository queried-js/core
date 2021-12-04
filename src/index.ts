export type AsyncReturn<ReturnType> = ReturnType | Promise<ReturnType>;

export type QueryExecuter<QueryType, DataType> = (
	query: QueryType,
	data?: DataType
) => AsyncReturn<DataType>;

export async function executeQuery<QueryType, DataType>(
	executer: QueryExecuter<QueryType, DataType>,
	query: QueryType,
	data: DataType
) {
	return await executer(query, data);
}
