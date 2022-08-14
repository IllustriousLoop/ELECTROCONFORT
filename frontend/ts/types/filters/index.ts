import type { ColumnType } from "antd/es/table";

export type filter = (dataIndex: string) => ColumnType<any>;
