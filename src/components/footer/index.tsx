'use client'

import Image from 'next/image'

const Footer = () => {
  return (
    <div className="footer flex w-full flex-row items-center justify-center bg-zinc-300">
      <p className="text-center">Developed by </p>
      <Image
        src="/static/image/logo-prim.png"
        alt="Logo do Engenha Dev"
        width={150}
        height={50}
      />
    </div>
  )
}

export { Footer }
