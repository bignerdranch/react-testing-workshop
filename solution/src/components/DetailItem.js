import { memo } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { itemImages } from '../items';
import ItemType from '../types/item';
import './DetailItem.css';

function DetailItem({ addToCart, id, items }) {
  const detailItem = items.find((item) => item.itemId === id);

  const addItemToCart = () => {
    addToCart(detailItem.itemId);
  };

  return (
    <div className="detail-item-component">
      {detailItem ? (
        <>
          <img
            className="details-image"
            src={itemImages[detailItem.imageId]}
            alt={detailItem.title}
          />
          <h2>{detailItem.title}</h2>
          {detailItem.description && <h6>{detailItem.description}</h6>}
          <div>
            $
            {(detailItem.salePrice ?? detailItem.price).toFixed(2)}
          </div>
          <button
            type="button"
            onClick={addItemToCart}
          >
            Add to Cart
          </button>
        </>
      ) : <h2>Unknown Item</h2>}
    </div>
  );
}

const sharedProps = {
  addToCart: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

DetailItem.propTypes = {
  ...sharedProps,
  id: PropTypes.string.isRequired,
};

const DetailItemMemo = memo(DetailItem);

function DetailsOuter({ addToCart, items }) {
  const { id } = useParams();
  return (
    <DetailItemMemo
      addToCart={addToCart}
      id={id}
      items={items}
    />
  );
}

DetailsOuter.propTypes = sharedProps;

export default DetailsOuter;
