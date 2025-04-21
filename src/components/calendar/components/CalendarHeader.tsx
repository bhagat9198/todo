import React from 'react'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { Select } from '../../ui/Select'
import { VIEW_OPTIONS } from '../constants'
import { CalendarView } from '../types'

interface CalendarHeaderProps {
  currentDate: Date
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-primary" />
          <h2 className="text-h3 font-heading">Calendar</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onToday}
            className="px-3 py-1.5 text-sm font-medium hover:bg-background-accent/50 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-background-accent/50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium ml-2">
            {format(currentDate, 'MMMM yyyy')}
          </span>
        </div>
      </div>

      <Select
        value={view}
        onValueChange={(v) => onViewChange(v as CalendarView)}
        options={VIEW_OPTIONS.map(opt => ({
          value: opt.value,
          label: opt.label
        }))}
        className="w-32"
      />
    </div>
  )
}