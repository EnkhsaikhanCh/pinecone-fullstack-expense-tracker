import { Logo } from "./image/Logo";

export function Header() {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex flex-1 gap-2">
            <Logo />
            <a href="http://localhost:3001" className="btn btn-ghost text-lg">
              Dashboard
            </a>
            <a
              href="http://localhost:3001/records"
              className="btn btn-ghost text-lg"
            >
              Records
            </a>
          </div>
          <div className="flex gap-2">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
