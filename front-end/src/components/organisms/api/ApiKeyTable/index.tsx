import { ApiKeyTableProps, InputTableProps, OutputTableProps } from '@/types/props/ApiProps';
import styles from './ApiKeyTable.module.scss';

function ApiKeyTable({ type, ...props }: ApiKeyTableProps) {
  const inputHeaders = ['Name', 'Type', 'Description', '필수'];
  const outputHeaders = ['Name', 'Type', 'Description'];

  if (type === 'input') {
    const { keyList } = props as InputTableProps;
    return (
      <div>
        <table className="w-full">
          <thead>
            <tr>
              {inputHeaders.map((header) => (
                <th key={header} className="bgItdaBlue text-white pr-3 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white w-full">
            {keyList.map((list) => (
              <tr key={list.name} className="text-center">
                <td className={styles.tr}>
                  <div>{list.name}</div>
                </td>
                <td className={styles.tr}>
                  <div>{list.type}</div>
                </td>
                <td className={styles.tr}>
                  <div>{list.description}</div>
                  <div className="italic itdaSecondary text-sm">Example : {list.example}</div>
                </td>
                <td className={`pr-3 ${styles.tr}`}>
                  <div>{list.required === 'true' ? 'O' : 'X'}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const { keyList } = props as OutputTableProps;
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            {outputHeaders.map((header) => (
              <th key={header} className="bgItdaBlue text-white py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white w-full">
          {keyList.map((list) => (
            <tr key={list.name} className="text-center">
              <td className={styles.trOutput}>
                <div>{list.name}</div>
              </td>
              <td className={styles.trOutput}>
                <div>{list.type}</div>
              </td>
              <td className={styles.trOutput}>
                <div>{list.description}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiKeyTable;
