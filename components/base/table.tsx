import React from "react"

// TODO: needs to be updated to use the new design system
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="max-w-full min-w-full table-auto">{children}</table>
    </div>
  )
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="text-left">{children}</thead>
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="">{children}</tbody>
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b-1 border-muted-foreground">{children}</tr>
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="p-3">{children}</th>
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-3">{children}</td>
}
