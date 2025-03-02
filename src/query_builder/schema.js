export const customTypes = { JSON: 'TEXT' }

/* Creates a string with the columns to create a table like:
 *  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER
 */
export function _createTableColumns(columnMapping) {
  let primary = [];
  let query = Object.entries(columnMapping)
    .map(i => {
      const type = i[1].type
      const parts = [i[0], customTypes[type] || type]
      if (i[1].primary_key) {
        primary.push(i[0]);
        parts.push('NOT NULL');
      } else {
        if (i[1].unique) parts.push('UNIQUE')
        if (i[1].not_null) parts.push('NOT NULL')
      }
      return parts.join(' ')
    })
    .join(', ')
  let res = `${query}, PRIMARY KEY(${primary.join(', ')})`;
  return res;
}

// Creates the "CREATE TABLE" sql statement
export function createTable(tableName, columnMapping) {
  const columns = _createTableColumns(columnMapping)
  return `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`
}

// Creates the "DROP TABLE" sql statement
export function dropTable(tableName) {
  return `DROP TABLE IF EXISTS ${tableName};`
}

export default { createTable, dropTable }
