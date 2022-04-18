import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { getToken } from 'src/components/organisms/Auth/auth';
import { ToastContainer, toast } from 'react-toastify';

interface LiveEventProps {
  toUid: string;
}

const TipToken = (props: LiveEventProps) => {
  const { toUid } = props

  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const tokens = [
    {
      name: '1 USD',
      amount: 1,
    },
    {
      name: '2 USD',
      amount: 2,
    },
    {
      name: '3 USD',
      amount: 3,
    },
    {
      name: '5 USD',
      amount: 5,
    },
    {
      name: '10 USD',
      amount: 10,
    },
    {
      name: '20 USD',
      amount: 20,
    },
    {
      name: '50 USD',
      amount: 50,
    }
  ]

  const handleTipToken = (amount) => {
    setAmount(amount)
    setShow(true)
  }
  const handleSendUsd = () => {
    console.log("send")
    const host = String(process.env.NEXT_PUBLIC_UXM_MARKET_API_HOST) + '/p/wallet_transfer_usd'
    
    setLoading(true);
    fetch( host, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          toUid: toUid,
          amount: amount,
          internalRemarks: "tip token"
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'x-auth-token': getToken()
        } as any
      }
    )
    .then((res) => {
      setLoading(false);
      setShow(false);
      return res.json()
    })
    .then((result: any) => {
      if (result.error) {
        toast.error(result.error.message);
        return
      }
      // console.log('Success:', result);
      toast.success("Tip sent successfully.");
    })
    .catch((error) => {
      toast.error("Cannot send tip.");
      console.error('Error Custom:', error);
    });
  }

  return (
    <>
      <ToastContainer />
      <div>
        <div>
          {tokens.map((token, i) => {
            return (
              <button key={i} className="btn btn-success btn-sm me-3 mt-2" onClick={() => handleTipToken(token.amount)}>{token.name}</button>
            )
          })}
        </div>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h6 className="m-0">Click YES to Confirm</h6>
          </Modal.Header>
          <Modal.Body>
          <button 
            disabled={isLoading}
            className="btn btn-success w-100" 
            onClick={handleSendUsd}>
              Yes, TIP {amount} US Dollars
            </button>
            <div className="text-center">{isLoading ? 'Sending...' : ''}</div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default TipToken