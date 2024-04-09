"use client"
import * as React from "react"

const StepIndexContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}])

export function Slides({ slides }: { slides: React.ReactNode[] }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <StepIndexContext.Provider value={[selectedIndex, setSelectedIndex]}>
      {slides[selectedIndex]}
    </StepIndexContext.Provider>
  )
}

export function Tabs({ tabNames }: { tabNames: String[] }) {
  const tabLength: number = tabNames.length;
  const [selectedIndex, setSelectedIndex] = React.useContext(StepIndexContext)
  const [isActive, setIsActive] = React.useState(true);
  function selectTab(i) {
    setSelectedIndex(i);
    setIsActive(false);
  }

  React.useEffect(() => {
    let interval:any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSelectedIndex(selectedIndex =>
          (selectedIndex === tabLength-1) 
            ? 0
            : selectedIndex + 1)
      }, 2618);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, selectedIndex]);

  return (
    <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
      {[...Array(tabLength)].map((_, i) => (
        <button
          key={i}
          className={`-mb-px py-3 px-4 flex-nowrap whitespace-nowrap items-center gap-2 text-md font-medium text-center rounded-t-lg hover:text-gray-200 disabled:opacity-50 disabled:pointer-events-none active cursor-pointer ${
            selectedIndex === i ? "text-white bg-zinc-900" : "text-gray-400 bg-zinc-800"
          }`}
          onClick={() =>selectTab(i)}
        >{tabNames[i]}</button>
        ))}
    </nav>
  )
}
