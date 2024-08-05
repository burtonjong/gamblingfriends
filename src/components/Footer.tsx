export default function Footer() {
  return (
    <footer className="m-4 gap-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between gap-4 p-4">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {" "}
          <p className="hover:underline">gamblingfriends</p>
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
          <li>
            <a
              href="https://github.com/burtonjong/gamblingfriends"
              className="me-4 hover:underline md:me-6"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/burton-jong-849b35209/"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
