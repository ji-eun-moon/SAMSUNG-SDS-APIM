export interface RowTableProps {
  type: string;
  title: string;
  headerContent: string[];
  bodyContent: (string[] | number[] | Date[] | { [key: string]: string | number | Date })[];
  onApproveDeny: (action: string, content: string) => void;
}
