import Image from 'next/image'
import Link from 'next/link'

import ROUTE from '@/constants/route'

const Home = () => {
  return (
    <main className='flex h-screen flex-col items-center justify-between px-8 py-12'>
      <div>
        <Image className='mb-4 rounded-full' src='/images/fire_logo.png' width={200} height={200} alt='logo' />
        <p className='text-center text-2xl font-bold'>Fire Planner</p>
      </div>
      <div className='flex w-full flex-col gap-4 '>
        <Link
          href={ROUTE.SIGN_UP}
          className='w-full rounded-lg bg-blue-500 py-4 text-center text-lg font-bold text-white'
        >
          <i className='ri-mail-line mr-1' />
          <span>이메일로 회원가입</span>
        </Link>
        <Link
          href={ROUTE.SIGN_IN}
          className='w-full rounded-lg border border-zinc-500 py-4 text-center text-lg font-bold text-black'
        >
          로그인
        </Link>
      </div>
    </main>
  )
}

export default Home
