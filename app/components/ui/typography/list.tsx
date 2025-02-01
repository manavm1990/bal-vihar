interface ListProps {
  items: string[]
  ordered?: boolean
}

export default function List({ items, ordered = false }: ListProps) {
  const ListTag = ordered ? 'ol' : 'ul'
  const listStyle = ordered ? 'list-decimal' : 'list-disc'

  return (
    <ListTag className={`my-6 ml-6 ${listStyle} [&>li]:mt-2`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ListTag>
  )
}
