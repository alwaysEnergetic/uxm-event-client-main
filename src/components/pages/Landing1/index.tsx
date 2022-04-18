import Head from "next/head";
import Link from "next/link";
import Register from "src/components/organisms/Event/Register";
import TextBox from "src/components/pages/Home/TextBox";
import { leftColumnBoxes, rightColumnBoxes } from "src/data/home";
import { useAuth } from "src/components/organisms/Auth/AuthContext";
import styles from "./Landing1.module.scss";

import NavList from "src/components/organisms/NavList";
import ShowMore from "src/components/organisms/ShowMore";
import ItemBlock from "src/components/organisms/ItemBlock";

const LoginButton = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Register wordings='Click Here to LOGIN or REGISTER FREE' btnClassName='btn btn-primary btn-lg' /> : null;
};

import { navList, items, videos } from "src/data/landing1";

export default function LandingPage1() {
  return (
    <div className='mb-12'>
      <Head>
        <title>Landing Page - The UXM</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles.Layout}>
          <div className={styles.Sidebar}>
            <ShowMore btnWrapClassName='def-mx'>
              <div className='section-title'>EVENTS</div>
              <NavList items={navList as any} className='test1' anchorClassName='black' />
            </ShowMore>

            <ShowMore btnWrapClassName='def-mx' className='mt-5'>
              <div className='section-title'>TAGS</div>
              <NavList items={navList as any} className='test1' anchorClassName='black' />
            </ShowMore>
          </div>

          <div className='mt-5'>
            <div className='row mb-5'>
              <div className='col-md-8'>
                <div className={"block " + styles.EventInfo}>
                  <div className={styles.EventDetail}>
                    <div className=''>
                      <img src='https://media.theuxm.com/media/a/void/a7a2ec66-d392-4795-b98a-04d126fa34ad/PStv-sqr-forum-81acfc75-737b-43fb-a5dd-1c7e254adc63.jpg' />
                    </div>
                    <div>
                      <h2>PStv Music & Funtertainment WEB Show Keep The Fun Going Forum</h2>
                      <div className='title'>WEB Show Keep The Fun Going Forum</div>
                      <div className='descr'>
                        PStv Hemp Drawstring (White Series) Bag. Versatile, trendy, and durable drawstring bag. Your purchase supports a non-profit animal organization in the Philippines
                      </div>
                    </div>
                  </div>

                  <div className={styles.OwnerInfoRow}>
                    <div className={styles.OwnerInfo}>
                      <img src='https://media.theuxm.com/media/a/void/fe6a8509-63b2-4037-b7e5-7b1bc1ea233e/pstv-3-dfc68267-038d-4be8-8782-c78f0e4ad794.jpg' />
                      <div>
                        <div>Pstv</div>
                        <div className=''>Music web shows</div>
                      </div>
                    </div>

                    <a href='#' className='btn btn-primary'>
                      View More
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <iframe className='deadframe' src={"https://deadsimplechat.com/Gd9VaVTSX"} width='100%' height='300px'></iframe>
              </div>
            </div>

            <div className={styles.Items}>
              {items &&
                items.map((item, i) => {
                  return <ItemBlock key={i} name={item.name} descr={item.descr} image={item.imageUrl} link={item.link} />;
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
