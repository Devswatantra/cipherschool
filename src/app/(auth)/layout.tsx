import Logo from "@/components/Logo";
import TextAnimationHeading from "@/components/TextAnimationHeading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen max-h-screen h-full">
      <div className="hidden lg:flex flex-col p-10 bg-primary/10">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="h-full flex flex-col justify-center">
          <TextAnimationHeading className="flex-row mx-0 lg:gap-2" />
        </div>
      </div>
      <div className="h-full flex flex-col justify-center">{children}</div>
    </div>
  );
}
