import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const {
    fetchSingleProduct,
    single_product,
    single_product_error: error,
    single_product_loading: loading,
  } = useProductsContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(`${url + id}`);
    // const fetchddta = async () => {
    //   const res = await axios(
    //     "/.netlify/functions/single-product/?id=recLz73jWCv3kErqZ"
    //   );
    //   console.log(res);
    // };
    // fetchddta();
    // console.log(res);
  }, [id]);

  if (error) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
    return <Error></Error>;
  }
  if (loading) {
    return <Loading></Loading>;
  }
  const {
    name,
    price,
    description,
    stock,
    reviews,
    id: sku,
    company,
    images,
    stars,
  } = single_product;
  return (
    <Wrapper>
      <PageHero title={name} product></PageHero>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to product
        </Link>
        <div className="product-center">
          <ProductImages images={images}></ProductImages>
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews}></Stars>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "Out of Stock"}
            </p>
            <p className="info">
              <span title="Stock Keeping Unit">SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>BRAND : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={single_product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
