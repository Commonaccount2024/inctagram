import bell from '@/shared/assets/icons/Bell.svg'
import { Typography } from '@commonaccount2024/inctagram-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './Header.module.scss'

import LangSelect from '../LangSelect/LangSelect'

export function Header() {
  return (
    <header className={s.header}>
      <Link href={'/'}>
        <Typography className={s.logo_text} variant={'h1'}>
          Inctagram
        </Typography>
      </Link>
      <div className={s.rightPart}>
        <Image alt={'bell'} height={24} src={bell} width={24} />
        <LangSelect />
      </div>
    </header>
  )
}
