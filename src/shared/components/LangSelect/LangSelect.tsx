import { ChangeEvent } from 'react'

import flagUK from '@/shared/assets/icons/flagUK.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './LangSelect.module.scss'

function LangSelect() {
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    <div className={s.langSelect}>
      <Image alt={'flag'} className={s.flag} height={24} src={flagUK} width={24} />
      <select className={s.select} defaultValue={locale} onChange={changeLangHandler}>
        {locales?.map(l => {
          return (
            <option className={s.option} key={l} value={l}>
              {l === 'en' ? 'English' : 'Русский'}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default LangSelect
