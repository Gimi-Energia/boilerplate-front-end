import Image from 'next/image'

const Footer = () => {
  return (
    <div className="footer flex w-full items-center justify-center text-[--primary-foreground]">
      <p className="text-center font-semibold">Developed by </p>
      <Image
        src="https://gimix-bucket.s3.us-east-1.amazonaws.com/static/helpers/logo-engenha-dev-white.svg"
        alt="Logo do Engenha Dev"
        width={150}
        height={50}
      />
    </div>
  )
}

export { Footer }
