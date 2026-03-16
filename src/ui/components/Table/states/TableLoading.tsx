import { Skeleton } from "../../Skeleton";
import { tableCellVariants } from "../styles";

export function TableLoading({
  columns,
  pageSize = 20,
}: {
  columns: number;
  pageSize?: number;
}) {
  // Use pageSize to show matching number of skeleton rows
  const calculatedRows = pageSize;

  return (
    <>
      {Array.from({ length: calculatedRows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className={tableCellVariants()}>
              <Skeleton
                height={24}
                width={
                  colIndex === 0
                    ? "70%"
                    : colIndex === columns - 1
                    ? "40%"
                    : "85%"
                }
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
