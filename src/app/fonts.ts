import localFont from 'next/font/local'

export const sora = localFont({
  src: [
    {
      path: '../../public/fonts/sora-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sora-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sora-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sora-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sora',
  display: 'swap',
})