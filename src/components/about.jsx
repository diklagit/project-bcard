import PageHeader from './common/pageHeader';

const About = () => {
  return (
    <PageHeader
      title={
        <>
          About Bcard<i className='bi bi-person-badge'></i>
        </>
      }
      description={
        <>
          <h4
            className='about-description lh-base'
            style={{ textAlign: 'center' }}
          >
            welcome to Bcard! In our app you can:
          </h4>
          <dl className='list-item hl-2 my-2'>
            <dd>
              <i className='bi bi-check-circle mx-2'></i>see business cards
            </dd>
            <dd>
              <i className='bi bi-check-circle mx-2'></i>sign up and select your
              favorite cards
            </dd>
            <dd>
              <i className='bi bi-check-circle mx-2'></i>make a search on the
              cards pages
            </dd>
            <dd>
              <i className='bi bi-check-circle mx-2'></i>if you have a business
              of your own, you can even create cards,
            </dd>
            <dd>share them on "All Cards" page board</dd>
            <dd> and get more exposure for your business</dd>
          </dl>
          <h4 className='mt-3'>good luck!</h4>
        </>
      }
    />
  );
};

export default About;
