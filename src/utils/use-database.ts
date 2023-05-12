import client from "../database";

export const useDatabase = async <T>(
  sql: string,
  params?: any[]
): Promise<T[]> => {
  const conn = await client.connect();
  const { rows } = await conn.query<T>(sql, params);
  conn.release();

  return rows;
};
