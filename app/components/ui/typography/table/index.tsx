import Thead, { type TheadProps } from './thead'
import Tbody, { type TbodyProps } from './tbody'

interface TableProps extends TheadProps, TbodyProps {}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <Thead headers={headers} />
        <Tbody rows={rows} />
      </table>
    </div>
  )
}
