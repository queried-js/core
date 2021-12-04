export type AsyncReturn<ReturnType> = ReturnType | Promise<ReturnType>;

export type QueryExecuter<StorageQueryType, StorageDataType> = (
	query: StorageQueryType,
	...data: StorageDataType[]
) => AsyncReturn<StorageDataType[]>;

export type DataTransformer<InputType, TargetType> = (
	input: InputType
) => AsyncReturn<TargetType>;

export type QueriedConfiguration<
	InputDataType,
	StorageQueryType,
	StorageDataType
> = {
	executer: QueryExecuter<StorageQueryType, StorageDataType>;
	serializer?: DataTransformer<InputDataType, StorageDataType>;
	deserializer?: DataTransformer<StorageDataType, InputDataType>;
};

export async function executeQuery<
	InputDataType,
	StorageQueryType,
	StorageDataType
>(
	executer: QueryExecuter<StorageQueryType, StorageDataType>,
	query: StorageQueryType,
	serializer: DataTransformer<InputDataType, StorageDataType>,
	deserializer: DataTransformer<StorageDataType, InputDataType>,
	...data: InputDataType[]
) {
	const serializedData: StorageDataType[] = [];
	for (const unit of data || [])
		serializedData.push(
			serializer ? await serializer(unit) : (unit as any)
		);

	const deserializedData: InputDataType[] = [];
	for (const unit of (await executer(query, ...serializedData)) || [])
		deserializedData.push(
			deserializer ? deserializer(unit) : (unit as any)
		);

	return deserializedData;
}

export class Queried<InputDataType, StorageQueryType, StorageDataType> {
	constructor(
		private configuration: QueriedConfiguration<
			InputDataType,
			StorageQueryType,
			StorageDataType
		>
	) {}

	async execute(query: StorageQueryType, ...data: InputDataType[]) {
		return await executeQuery(
			this.configuration.executer,
			query,
			this.configuration.serializer,
			this.configuration.deserializer,
			...data
		);
	}
}
