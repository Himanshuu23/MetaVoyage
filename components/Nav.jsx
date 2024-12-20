import LoginDialog from '../app/_components/Login';
import { useSession } from 'next-auth/react';
import { Pacifico } from 'next/font/google';
import { useEffect } from 'react';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
});



const Nav = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status === "authenticated") {
      addUserToDB(session.user.email)
    }
  }, [status])

  const addUserToDB = async (email) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <div>
      <header className=" text-white py-4 h-20 backdrop-blur-3xl bg-[#132E32] flex justify-center items-center">
        <nav className="flex justify-around items-center px-10 w-full">
          <div className="title-wrapper flex items-center gap-4">
            <div className={`text-2xl ${pacifico.className} text-yellow-300`}>METAVOYAGE</div>
          </div>
          {session ? (
            <ul className="flex gap-5 text-2xl">
              <li>
                <a href="#travel" className="hover:underline">
                  Travel
                </a>
              </li>
              <li>
                <a href="#shows" className="hover:underline">
                  Shows
                </a>
              </li>
              <li>
                <a href="#sell" className="hover:underline">
                  Sell Ticket
                </a>
              </li>
            </ul>
          ) : null}
          <LoginDialog />
        </nav>
      </header>
    </div>
  );
};

export default Nav;
