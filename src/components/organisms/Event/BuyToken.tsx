import { useState } from 'react'
import classnames from 'classnames'
import { Modal, Accordion, Card, useAccordionButton } from 'react-bootstrap'

function CustomToggle({ children, eventKey, onToggle }) {
  const decoratedOnClick = useAccordionButton("0", () => {
      console.log('totally custom!')
      onToggle()
    } 
  );
  return (
    <button
      type="button"
      className="btn btn-success w-100 mb-2"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function BuyTokenFrame(props: {cartUrl: string, title: string}) {
  const {cartUrl, title} = props
  const [url, setUrl] = useState<string>();
  return (
    <Accordion>
        <CustomToggle eventKey="0" onToggle={() => setUrl(cartUrl)}>{title}</CustomToggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {url ? <iframe src={url} width="100%" height="500px"></iframe>
             : null
            }
          </Card.Body>
        </Accordion.Collapse>
      
    </Accordion>
  );
}

// Buy $1 TipToken - https://www.theuxm.com/carts?add_to_cart=6b4e03c1-92a1-48d7-9102-5593ab054b84
// Buy $5 TipToken - https://www.theuxm.com/carts?add_to_cart=e996a385-e4e2-4576-9e23-37018a23b61e
const BuyToken = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBuyToken = () => {
    setShow(true)
  }

  return (
    <>
      <div>
        <button className="btn btn-success btn-sm mt-2" onClick={handleBuyToken}>Buy TipTokens</button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Support your favorite artists, performers, and presenters with TipTokens</h4>
          <p>
            Use TipTokens to support performers in any UXM Event. You can “tip” a performer any amount you wish starting at $1 (USD).  TipTokens purchased here are added to your wallet, then to Tip the Performer you must click on the Tip Buttons below the performance window.
          </p>
          <p>1. First, buy TipTokens below</p>
          <p>2. Second, click Tip Buttons below the performance window to tip the performer</p>

          <div className="my-3">
            <BuyTokenFrame cartUrl="https://www.theuxm.com/carts?add_to_cart=6b4e03c1-92a1-48d7-9102-5593ab054b84" title="Buy $1 TipToken" />
            <BuyTokenFrame cartUrl="https://www.theuxm.com/carts?add_to_cart=e996a385-e4e2-4576-9e23-37018a23b61e" title="Buy $5 TipToken" />
          </div>

          <p>TipTokens are sold in $1 and $5 units. The total amount purchased is stored in your UXM account. You can issue the TipTokens in any amount you want. So if you buy three $5 TipTokens you can issue the total $15 in any amounts you wish. For example, you could issue fifteen $1 tips to various performers in multiple UXM events.</p>  

        </Modal.Body>
        
      </Modal>
      </div>
    </>
  )
}

export default BuyToken