import Tbody, { type TbodyProps } from './tbody'
import Thead, { type TheadProps } from './thead'

interface TableProps extends TheadProps, TbodyProps {}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="my-4 w-full overflow-y-auto">
      <table className="w-full">
        <Thead headers={headers} />
        <Tbody rows={rows} />
      </table>
    </div>
  )
}
