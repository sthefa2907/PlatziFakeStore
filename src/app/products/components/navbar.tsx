import React from 'react'
import Logo from '../../../assets/Logo.png'

const Navbar: React.FC = () => {
  return (
    <nav className='bg-secondary dark:bg-secondary '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src={Logo}
            className='h-8'
            alt='Flowbite Logo'
          />
        </a>
        <button
          data-collapse-toggle='navbar-hamburger'
          type='button'
          className='inline-flex items-center bg-primary justify-center p-2 w-10 h-10 text-sm text-white rounded-lg hover:bg-primary focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 '
          aria-controls='navbar-hamburger'
          aria-expanded='false'
          onClick={() => {
            const menu = document.getElementById('navbar-hamburger')
            if (menu) {
              menu.classList.toggle('hidden')
            }
          }}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>

        <div
          className='hidden w-full'
          id='navbar-hamburger'
        >
          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <li>
              <a
                href='/'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                All our products
              </a>
            </li>
            <li>
              <a
                href='/categories'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Search categories
              </a>
            </li>
            {/* <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Search an specific product
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
