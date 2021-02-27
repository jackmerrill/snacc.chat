import AccountField from "./AccountField";

export default function User({ UserName, Email, Picture } : {
  UserName: string | null | undefined,
  Email: string | null | undefined,
  Picture: string | null | undefined
}) {
  return (
    <div className="flex">
      <div className={"flex-1 box-border bg-gray-800 rounded-md m-3 p-3 "}>
        <img className="object-cover w-16 h-16 mr-2 rounded-full inline" src={Picture?Picture:""} alt="Profile image"/>
        <h1 className="text-white align-text-bottom inline" >{UserName}</h1>
        <div className={"flex-1 box-border bg-gray-900 rounded-md m-3 p-4 space-y-6 align-middle"}>
          <AccountField FieldName="Username" CurrentValue={UserName}/>
          <AccountField FieldName="Email" CurrentValue={Email}/>
        </div>
      </div>
    </div>
  );
}
