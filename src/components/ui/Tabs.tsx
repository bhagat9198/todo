import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

interface TabsProps {
  defaultValue: string
  tabs: { value: string; label: string }[]
  children: React.ReactNode
}

export const Tabs = ({ defaultValue, tabs, children }: TabsProps) => {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue}>
      <TabsPrimitive.List className="flex gap-2 border-b border-border-light dark:border-border-dark">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className="group px-4 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark data-[state=active]:text-primary outline-none"
          >
            {tab.label}
            <motion.div
              className="h-0.5 w-full bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform"
              initial={false}
            />
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  )
}

export const TabsContent = TabsPrimitive.Content