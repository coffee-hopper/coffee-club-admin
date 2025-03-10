interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex justify-center w-[100vw] h-[100vh] p-2 bg-gray-50 overflow-hidden">
      <div className="flex lg:w-5xl md:w-3xl w-xs mx-auto">{children}</div>
    </div>
  );
}
