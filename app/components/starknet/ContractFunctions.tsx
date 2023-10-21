import { useConfig } from "~/root";

export default function ContractFunctions() {
  const { viewFunctions } = useConfig();

  if (viewFunctions.length === 0) {
    return (
      <div>
        No data to view on this contract
      </div>
    );
  }

  return (
    <>
      <h2>View functions</h2>
      <ul>
        {viewFunctions.map((func: any, index) => (
          <li key={index}>{func.name}</li>
        ))}
      </ul>
    </>
  );
}