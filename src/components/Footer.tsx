export default function Footer() {
  return (
    <footer className="m-4 gap-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl gap-4 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©2024{" "}
          <a href="https://www.google.ca/" className="hover:underline">
            The boys gambling addiction
          </a>
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
