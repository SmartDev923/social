export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Custom layout for candidate flow - minimal wrapper
  // The root layout will handle Providers and conditional Header/Footer
  return <div className="candidate-flow-layout">{children}</div>;
}
