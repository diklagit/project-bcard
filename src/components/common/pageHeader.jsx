const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className='row text-center'>
        <div className='col-12 mt-3'>
          <h1>{title}</h1>
        </div>
        {description && <div className='my-3 fs-5 hl-3'>{description}</div>}
      </div>
    </>
  );
};

export default PageHeader;
