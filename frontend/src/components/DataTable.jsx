import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-semibold text-foreground"
              >
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(row)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(row)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
