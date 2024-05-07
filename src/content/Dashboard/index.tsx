import HeaderPage from "@/components/HeaderPage";

export default function Dashboard() {
  return (
    <HeaderPage
      label="Dashboard"
      description="Pantau perkembanganan bisnismu di dashboard"
    >
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Welcome to the Dashboard!
        </p>
      </div>
    </HeaderPage>
  );
}
