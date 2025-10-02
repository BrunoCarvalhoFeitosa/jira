import { IoChevronUpSharp } from "react-icons/io5"

interface PriorityLabelProps {
  level: "alta" | "media" | "baixa"
}

const priorityMap = {
  alta: {
    text: "Alta",
    count: 3,
    color: "text-red-600",
  },
  media: {
    text: "Média",
    count: 2,
    color: "text-yellow-600",
  },
  baixa: {
    text: "Baixa",
    count: 1,
    color: "text-green-600",
  },
}

export const PriorityLabel = ({ level }: PriorityLabelProps) => {
  const { text, count, color } = priorityMap[level]

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center ${color}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <IoChevronUpSharp key={idx} className="size-5" />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {`- (${text})`}
      </span>
    </div>
  )
}
