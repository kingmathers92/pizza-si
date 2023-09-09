import PropTypes from 'prop-types';

export default function MenuItem({ image, name, price }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> DT{price} </p>
    </div>
  );
}

MenuItem.propTypes = {
  image: PropTypes.string.isrequired,
  name: PropTypes.string.isrequired,
  price: PropTypes.number.isrequired,
}
