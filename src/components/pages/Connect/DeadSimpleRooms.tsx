import Script from "next/script";
import Accordion from "react-bootstrap/Accordion";
import { getUserName } from "src/components/organisms/Auth/auth";

export default function DeadSimpleRooms() {
  const username = getUserName();
  return (
    <>
      <h5 className='mb-4 fw-bold'>PUBLIC AND PRIVATE CHAT ROOMS</h5>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Lobby: Open Meet and Chat Networking</Accordion.Header>
          <Accordion.Body>
            <iframe className='deadframe' width='100%' height='500px' src='https://deadsimplechat.com/XVk8FF25T'></iframe>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Who Are You Listening To Right Now?</Accordion.Header>
          <Accordion.Body>
            <iframe className='deadframe' width='100%' height='500px' src='https://deadsimplechat.com/N6BWG7FZ8'></iframe>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Classic Rock Trivia & Top 5</Accordion.Header>
          <Accordion.Body>
            <iframe className='deadframe' width='100%' height='500px' src='https://deadsimplechat.com/1YjhRqKGv'></iframe>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header>DJ Discussion</Accordion.Header>
          <Accordion.Body>
            <iframe className='deadframe' width='100%' height='500px' src='https://deadsimplechat.com/KJevlqm1g'></iframe>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4'>
          <Accordion.Header>Chat Room Help</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>To Enter a Room:</strong> Just click the room title and you will be placed in the room
            </p>

            <p>
              <strong>To Chat:</strong> Enter your message in message box at the bottom of the chat window
            </p>

            <p>
              <strong>Toggle Private Message Notification Bell On/Off:</strong> Click the menu icon in the top left corner, then click the bell.
            </p>

            <p>
              <strong>Start Private Chat:</strong> Click the menu icon in the top left corner, then click on the user you want to start a private chat with.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {username ? (
        <Script id='show-banner' strategy='lazyOnload'>
          {`
              var frames = document.getElementsByClassName("deadframe");
              for (var i =0; i < frames.length; i++) {
                frames[i].src = frames[i].src + "?username=${username}" ;
              }
            `}
        </Script>
      ) : null}
    </>
  );
}
