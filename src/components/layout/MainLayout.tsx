interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex justify-center bg-gray-50 overflow-hidden">
      <div className="flex ">{children}</div>
    </div>
  );
}
