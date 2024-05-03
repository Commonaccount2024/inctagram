import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'

function LangSelect() {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value
    push({ pathname, query }, asPath, { locale })
  }

  return (
    <div>
      <select onChange={changeLangHandler} defaultValue={locale}>
        {locales?.map(l => {
          return (
            <option value={l} key={l}>
              {l}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default LangSelect
