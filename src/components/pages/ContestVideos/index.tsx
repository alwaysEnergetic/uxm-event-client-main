import Videos from "./Videos"
import ButtonModal from 'src/components/shared/ButtonModal'
import styles from './ContestVideos.module.scss'

export default function ContestVideos() {
  return (
    <>
      <div className="mb-12">
        <div className={styles.banner}>
          <div className="content">
            <h2>The UXM Battle of the Bands</h2>
            <p>Sponsored by The UXM</p>
          </div>
        </div>

        <div className={styles.musicShowcase}>
          <div className="container">
            <h3 className="text-center mb-4">Music Showcase and Competition</h3>
            <div className="row mb-4">
              <div className="col-md-5 offset-md-1 mb-3">
                <div className={styles.block}>
                  <h4 className="text-center">MUSIC FANS</h4>
                  <ul>
                    <li>Vote for your favorites!</li>
                    <li>You get 3 votes per day to use however you want</li>
                    <li>Scroll down and cast your votes</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5 mb-3">
                <div className={styles.block}>
                  <h4 className="text-center">ARTISTS</h4>
                  <ul>
                    <li>Top 3 vote-getters each get a free gear gift certificate</li>
                    <li>Top vote-getter also wins cash and claims title Winner of The UXM Battle of the Bands</li>
                    <li>Click the button below to submit your entries</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <ButtonModal buttonClassName="btn btn-warning me-3 btn-lg" dialogClassName="modal-80w" buttonTitle="Click Here to Submit Your Videos" dialogTitle="Submit Your Videos">
                <iframe src="https://info.theuxm.com/submit-video-track-botb/" className="w-100"></iframe>
                
              </ButtonModal>
              <ButtonModal buttonClassName="btn btn-warning btn-lg" dialogClassName="modal-80w" buttonTitle="Rules and Prizes" dialogTitle="RULES AND PRIZES">
              <p className="fw-bold mb-1">Who can enter?</p>
              <p>Any band, singer, or DJ can submit one or more video links featuring a music performance of their own. Submission URL links can be YouTube, Vimeo, MP4, Instagram Video, or most other video platforms. </p>

              <p className="fw-bold mb-1">How to enter?</p>
              <p>Be sure you are registered with the UXM Music Community (it’s free). Click the “Submit Your Videos” button and enter the link info. That’s it, you’re entered!</p>

              <p className="fw-bold mb-1">How many times can I enter?</p>
              <p>Each contestant can submit up to 5 entries.</p>

              <p className="fw-bold mb-1">How does it work?</p>
              <p>All submitted videos can be viewed by UXM Community Members. Each Member can cast up to three (3) votes per day. Voters can use all their votes for one performance or vote for more than one performance. The video with the most votes at the end of the competition will be the winner! Second and third place winners will also be recognized.</p>

              <p className="fw-bold mb-1">What do the winners get?</p>
              <p>The top 3 vote-getters each get a free gear gift certificate. The top vote-getter also wins US$100 and claims the official title of Winner of The UXM Battle of the Bands.</p>

              <p className="fw-bold mb-1">When does voting start?</p>
              <p>Voting will start when the first 20 entries have been reviewed and posted.</p>

              <p className="fw-bold mb-1">When will the competition end?</p>
              <p>The end date will be announced on the first day of voting.</p>
              </ButtonModal>
            </div>
          </div> 
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 pt-4 pb-5 fs-5 lead1">
              <p>Voting not open yet. To submit a video click the button above.</p>
              <div className="fst-italic text-primary">If videos do not load please refresh your screen</div>
            </div>
          </div>
        </div>

        <Videos />

      </div>
    </>
  );
}