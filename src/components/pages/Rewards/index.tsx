import { useRef, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Layout from "src/components/templates/Layout";
import ProfileContainer from "src/components/Profile/ProfileContainer";
import { Loading, LoadingElement } from "src/components/shared/Loading";
import { ProtectRoute } from "src/components/organisms/Auth/AuthContext";
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import LoginButton from 'src/components/organisms/LoginButton'
export default function Rewards() {
  const loadingEl = useRef<LoadingElement>(null);
  const loadedHandler = () => {
    // loadingEl.current?.hide();
  };

  useEffect(() => {
    // loadingEl.current?.show();
  }, []);

  const { isAuthenticated } = useAuth()

  return (
    <div className="p-5">
      {isAuthenticated ?
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-3">
                <div className="block">
              <h3 className="fs-16">Your Current Cash Rewards Total</h3>
              <div className="amount">$308.00</div>
              </div>
            </div>

            <div className="col-md-3 offset-md-1">
                <div className="block">
              <h3 className="fs-16">Your Current UXM Club Coins Total</h3>
              <div className="amount">325</div>
              </div>
            </div>

            <div className="col-md-3 offset-md-1">
                <div className="block">
              <h3 className="fs-16">Your Current UXM Bonus Points Total</h3>
              <div className="amount">564</div>
              </div>
            </div>

          </div>
        </div>
        :
        <div className="container text-center mb-5">
          <LoginButton redirect="/me/rewards" title='Login or Register to See Your Rewards' />
        </div>
      }

      <div className="container">
        <h5 className='mb-4 fw-bold'>How to Generate More Rewards</h5>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Invite Others</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Share UXM Content</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>Add Merchandise</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='3'>
            <Accordion.Header>Start a Club</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='4'>
            <Accordion.Header>Have Your Own Show</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='5'>
            <Accordion.Header>Shop The UXM</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='6'>
            <Accordion.Header>Personalize The UXM</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='7'>
            <Accordion.Header>Browse The UXM</Accordion.Header>
            <Accordion.Body>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}