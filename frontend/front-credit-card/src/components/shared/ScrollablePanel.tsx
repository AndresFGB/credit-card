interface ScrollablePanelProps {
  children: React.ReactNode;
}

function ScrollablePanel({ children }: ScrollablePanelProps) {
  return (
    <div
      className="
        w-full
        h-full
        max-h-[60vh]
        overflow-y-auto
        border
        border-slate-200
        rounded-lg
        p-4
        bg-white
      "
    >
      {children}
    </div>
  );
}

export default ScrollablePanel;