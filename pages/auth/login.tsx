import { useRouter } from 'next/router';
import {
  signIn, useSession,
} from 'next-auth/client';
import FingerprintIcon from '../../components/icons/Fingerprint';
import LogoVector from '../../components/LogoVector';

export default function Login(): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl">
        <div>
          <div className="py-10 px-6 md:px-12 justify-center">
            <div className="text-center mb-10">
              <div className="flex justify-center -ml-3 mb-10">
                <LogoVector width="128px" height="128px" />
              </div>
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Welcome! We&apos;re so glad you&apos;re back!</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  {loading && (
                    <div className="flex items-center justify-center w-full bg-indigo-500 transition duration-300 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  )}
                  {!session && !loading && (
                    <button
                      className="flex items-center justify-center w-full bg-gray-800 transition duration-300 hover:bg-gray-900 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold"
                      type="button"
                      onClick={() => signIn('github', { callbackUrl: '/' })}
                    >
                      <FingerprintIcon />
                      <span className="ml-3">Sign in with GitHub</span>
                    </button>
                  )}
                  {session && !loading && (
                    <div className="flex items-center justify-center w-full bg-gray-800 transition duration-300 hover:bg-gray-900 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold">
                      <span>
                        Signed in as
                        {' '}
                        {session.user.name}
                      </span>
                      <span className="hidden">
                        {setTimeout(() => { router.replace('/'); }, 1000)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
