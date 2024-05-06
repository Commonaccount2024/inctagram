
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import Link from 'next/link'

export default function TermsOfService() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.passwordRecoveryPage.title} />
      <Link href={'/signUp'}>Back to Sign Up</Link>
      <h1>Privacy Policy</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Tortor vitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur adipiscing. Massa enim nec dui nunc mattis enim ut tellus. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Tortor aliquam nulla facilisi cras. Elit pellentesque habitant morbi tristique senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus. Ut lectus arcu bibendum at varius vel pharetra. Etiam erat velit scelerisque in dictum non consectetur. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Id diam maecenas ultricies mi eget mauris pharetra. Tincidunt lobortis feugiat vivamus at augue. Non odio euismod lacinia at. Aliquet eget sit amet tellus. Auctor neque vitae tempus quam.</p>
      <p>Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Nisl pretium fusce id velit ut tortor pretium. Eget arcu dictum varius duis at consectetur. Est placerat in egestas erat imperdiet sed euismod nisi porta. Scelerisque felis imperdiet proin fermentum. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Proin nibh nisl condimentum id venenatis a condimentum vitae. Massa tincidunt dui ut ornare lectus sit amet est placerat. Vel turpis nunc eget lorem dolor sed viverra ipsum. Enim ut tellus elementum sagittis. At consectetur lorem donec massa sapien faucibus et molestie. Enim sit amet venenatis urna cursus. Id velit ut tortor pretium viverra suspendisse potenti.</p>
    </>
  )
}
