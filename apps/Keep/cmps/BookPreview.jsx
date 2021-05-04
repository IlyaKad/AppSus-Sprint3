const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

  const { id, thumbnail, title, listPrice: { amount, currencyCode } } = book;

  let price;
  switch (currencyCode) {
    case 'ILS': price = `${amount}₪`;
      break;
    case 'USD': price = `$${amount}`;
      break;
    case 'EUR': price = `€${amount}`;
      break;
  }

  return (
    <Link to={`/book/${id}`}>
      <article className="book-preview">
        <h4>{title}</h4>
        <img src={thumbnail} alt={title} />
        <p>Price - {price}</p>
      </article >
    </Link>
  )

}
