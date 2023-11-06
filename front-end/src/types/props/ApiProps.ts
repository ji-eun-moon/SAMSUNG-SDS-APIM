import { TApiInputList, TApiOutputList } from '../Api';

export interface InputTableProps {
  type: 'input';
  keyList: TApiInputList;
}

export interface OutputTableProps {
  type: 'output';
  keyList: TApiOutputList;
}

export type ApiKeyTableProps = InputTableProps | OutputTableProps;
