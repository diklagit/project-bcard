import { useEffect, useState } from 'react';
import { getCard } from '../services/cardsService';
import { useParams } from 'react-router-dom';
import PageHeader from './common/pageHeader';
import MapComponent from './MapComponent';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(undefined);

  useEffect(() => {
    const getCardDetails = async () => {
      const { data } = await getCard(id);
      setCard(data);
    };
    getCardDetails();
  }, [id]);

  if (!card) {
    return null;
  }

  return (
    <>
      <PageHeader
        title='Business Details'
        description={'more about: ' + `${card.title}`}
      />

      <div className='d-flex justify-content-center'>
        <div className='table-responsive'>
          <table
            className='table table-primary table-hover'
            style={{ width: 'max-content' }}
          >
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{card.title}</td>
              </tr>

              <tr>
                <th>Title:</th>
                <td>{card.subtitle}</td>
              </tr>

              <tr>
                <th>Description:</th>
                <td>{card.description}</td>
              </tr>

              <tr>
                <th>Phone:</th>
                <td>{card.phone}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{card.email}</td>
              </tr>

              <tr>
                <th>Web:</th>
                <td>{card.web}</td>
              </tr>

              <tr>
                <th>Address:</th>
                <td>
                  {`${card.address.street} ${card.address.houseNumber} ${card.address.city} ${card.address.country}`}
                </td>
              </tr>

              <tr>
                <th>Map:</th>
                <td>
                  <MapComponent
                    address={`${card.address.street} ${card.address.houseNumber} ${card.address.city} ${card.address.country}`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
