import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <>
        <p>This site blah blah blah...</p>
        <Link to={routes.home()}>Return Home</Link>
      </>
    </>
  )
}

export default AboutPage
