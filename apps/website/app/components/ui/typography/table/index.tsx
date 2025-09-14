import Tbody, { type TbodyProps } from './tbody'
import Thead, { type TheadProps } from './thead'

interface TableProps extends TheadProps, TbodyProps {
  footer?: React.ReactNode
}

export default function Table({ headers, rows, footer }: TableProps) {
  return (
    <div className="my-4 w-full overflow-y-auto">
      <table className="w-full">
        <Thead headers={headers} />
        <Tbody rows={rows} />
      </table>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  )
}
