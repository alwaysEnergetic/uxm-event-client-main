import Head from "next/head";
import Link from "next/link";
import Register from "src/components/organisms/Event/Register";
import TextBox from "src/components/pages/Home/TextBox";
import { leftColumnBoxes, rightColumnBoxes } from "src/data/home";
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import styles from "./Home.module.scss";

const LoginButton = () => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <Register wordings='Click Here to LOGIN or REGISTER FREE' btnClassName='btn btn-primary btn-lg' /> : null;
};

export default function Home() {
  return (
    <div className='mb-12'>
      <Head>
        <title>Event Home - The UXM</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={["flex flex-col items-center justify-center w-full flex-1 pt-20 px-20 text-center"].join(" ")}>
        {/* <main className={styles.home}> */}
        <div className={styles.coverPicture}>
          <div className={styles.textbox}>
            <h2>Welcome to the UXM</h2>
            <h2 className={styles.focus}>Be a part of it</h2>
            <h2>Music community blast off</h2>
          </div>
          <div className={styles.leftWrap}>
            <div className={styles.musicHeading}>Music fans artists industry network engage monetize</div>
            <div>
              <LoginButton />
            </div>
          </div>
          {/* <img src="https://info.theuxm.com/wp-content/uploads/event1a-scaled.jpg" /> */}
        </div>

        <div className={"mb-5 container"}>
          <div className='row'>
            <div className={`${styles.indexContent} col-12 col-md-4 col-sm-12`}>
              {leftColumnBoxes.map((x, idx) => (
                <TextBox key={idx} data={x} />
              ))}
            </div>

            <div className={`${styles.indexContent} ${styles.middleBlock} block col-12 col-md-4 col-sm-12`}>
              <h3>Open now</h3>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  PStv Music & Funtertainment WEB Show Keep The Fun Going Forum&nbsp;
                  <Link href='https://music.theuxm.com/groups/pstv-music-funtertainment-web-show-discussion-forum/'>now open</Link>
                </li>
                <li className='list-group-item'>
                  The UXM Battle of the Bands entry is now open. Singers, bands, DJs&nbsp;
                  <Link href='/contest-videos'>enter your performances now</Link>
                </li>
                <li className='list-group-item'>
                  Classic Rock Top 10 is&nbsp;
                  <Link href='https://music.theuxm.com/groups/classic-rock-top-10/'>now open</Link>
                </li>
                <li className='list-group-item'>
                  Global DJ Report is&nbsp;
                  <Link href='https://music.theuxm.com/groups/global-dj-report/'>now open</Link>
                </li>
              </ul>
              <h3 className='mt-4'>LIVE NOW</h3>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <span>The UXM Radio is Live Now 24x7 </span>
                  <a href='https://music.theuxm.com/radio'>Listen Now</a>
                </li>
              </ul>
            </div>

            <div className={`${styles.indexContent} col-12 col-md-4 col-sm-12`}>
              {rightColumnBoxes.map((x, idx) => (
                <TextBox key={idx} data={x} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
