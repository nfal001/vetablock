import React from 'react'

// _________
// | | | | |
// _________
// | | | | |    table->thead->trow->[cell,cell,cell]
// _________    table->tbody->trow->[cell,cell,cell]

export const TableContainer = ({ children }) => {
  return (
    <>
  <div className="w-full overflow-x-auto">
    {children}
  </div>
    </>
  )
}

export const Table = ({ children }) => {
  return (
    <table className='w-full whitespace-no-wrap'>
      {children}
    </table>
  )
}

export const TableHead = ({children}) => {
  return (
    <>
    <thead className='px-4 py-3'>
      {children}
    </thead>
    </>
  )
}
export const TableHeadRow = ({children}) => {
  return (
    <>
    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border dark:border-0 dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      {children}
    </tr>
    </>
  )
}
export const TableHeadCell = ({children}) => {
  return (
    <>
    <th className='px-4 py-3'>
      {children}
    </th>
    </>
  )
}

export const TableBody = ({children}) => {
  return (
    <>
    <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
      {children}
    </tbody>
    </>
  )

}

export const TableBodyRow = ({children}) => {
  return (
    <>
    <tr className='text-gray-700 dark:text-gray-400'>
      {children}
    </tr>
    </>
  )
}

// <TableBodyCell children={} textSize={}/>
export const TableBodyCell = ({children , textSize}) => {
    const classList = !textSize ? "px-4 py-3" : `px-4 py-3 ${textSize}`; 
    return(
      <>
    <td className={classList}>
      {children}
    </td>
      </>
    )
}

export const TableFooter = ({children}) => {
    return(
      <>
        <div className="grid grid-cols-3 px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border dark:border-0 dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        {children}
        </div>
      </>
      )
}

export const TableExamples = () => {
  return(
    <>
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
    <TableContainer>
      <Table>
      <TableHead>
        <TableHeadRow>
        <TableHeadCell>No.</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Devices</TableHeadCell>
        <TableHeadCell>Edit</TableHeadCell>
        <TableHeadCell></TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>1.</TableBodyCell>
          <TableBodyCell>Mt.Pro</TableBodyCell>
          <TableBodyCell>3 devices / room</TableBodyCell>
          <TableBodyCell>Edit | Delete</TableBodyCell>
          <TableBodyCell>&gt;</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>2.</TableBodyCell>
          <TableBodyCell>cz</TableBodyCell>
          <TableBodyCell>cz</TableBodyCell>
          <TableBodyCell>cz</TableBodyCell>
          <TableBodyCell>&gt;</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>3.</TableBodyCell>
          <TableBodyCell>sds</TableBodyCell>
          <TableBodyCell>sds</TableBodyCell>
          <TableBodyCell>sds</TableBodyCell>
          <TableBodyCell>&gt;</TableBodyCell>
        </TableBodyRow>
      </TableBody>
      </Table>
    </TableContainer>
    <TableFooter>HI man</TableFooter>
    </div>
    </>
  )
}

