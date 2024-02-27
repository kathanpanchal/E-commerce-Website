import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Breadcrum } from '../component/Breadcrum/Breadcrum'
import { ProductDisplay } from '../component/ProductDisplay/ProductDisplay'
import { RelatedProducts } from '../component/RelatedProducts/RelatedProducts'


export const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product = {product} />
      <RelatedProducts/>
    </div>
  )
}
