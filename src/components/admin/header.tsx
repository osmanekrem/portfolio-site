const Header = () => {
  return (
    <header className="flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">Admin Panel</h2>
        <p className="text-base text-slate-500">
          Monitor all of your projects and posts here
        </p>
      </div>
    </header>
  );
};
export default Header;
