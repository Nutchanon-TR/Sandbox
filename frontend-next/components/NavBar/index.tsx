import ThemeMode from "../ThemeMode";

export default function NavBar() {
  return (
<nav className="w-full">
      <div className="flex items-center justify-between p-4">
        <ThemeMode />
      </div>
    </nav>
  );
}
