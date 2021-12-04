export type AsyncReturn<ReturnType> = ReturnType | Promise<ReturnType>;

export type QueryExecuter<QueryType, DataType> = (
	query: QueryType,
	data?: DataType
) => AsyncReturn<DataType>;

export type QueriedConfiguration<QueryType, DataType> = {
	executer: QueryExecuter<QueryType, DataType>;
};

export async function executeQuery<QueryType, DataType>(
	executer: QueryExecuter<QueryType, DataType>,
	query: QueryType,
	data: DataType
) {
	return await executer(query, data);
}

export class Queried<QueryType, DataType> {
	constructor(
		private configuration: QueriedConfiguration<QueryType, DataType>
	) {}

	async execute(query: QueryType, data?: DataType) {
		return await executeQuery(this.configuration.executer, query, data);
	}
}
