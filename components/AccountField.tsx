export default function AccountField({ FieldName, CurrentValue} : {
  FieldName: string,
  CurrentValue: string | null | undefined
}) {
  return (
    <div className="flex flex-row justify-between mb-auto">
      <div className={"flex flex-col"}>
        <div className="flex-1 mr-3">
          <h5 className="text-gray-400 align-text-top mb-0.5">{FieldName}</h5>
          <span className="text-white">{CurrentValue}</span>
        </div>
      </div>
    </div>
  );
}
