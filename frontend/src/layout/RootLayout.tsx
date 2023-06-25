interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className="flex">{children}</div>;
};
